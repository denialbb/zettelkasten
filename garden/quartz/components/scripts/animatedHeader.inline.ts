// Animation effect (WebGL metaballs)
const FRAME_INTERVAL = 33 // ~30fps
let initialized = false
let isPageVisible = true
let visibleCanvases = new Set<Element>()

const vsSource = `
  attribute vec2 a_position;
  varying vec2 v_position;
  void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_position = a_position;
  }
`

const fsSource = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_isDark;
  uniform float u_fadeTop;
  uniform float u_dpr;
  uniform float u_hover;
  varying vec2 v_position;

  // Cheap hash
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  // Simple value noise
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    ) * 2.0 - 1.0;
  }

  vec2 metaball(vec2 p, float time) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float sum = 0.0;
    float accentSum = 0.0;

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 cellId = i + neighbor;
        vec2 point = hash2(cellId);
        point = 0.5 + 0.4 * sin(time * 0.3 + 6.28 * point);
        vec2 diff = neighbor + point - f;
        float r2 = dot(diff, diff);

        float influence = max(0.0, 1.0 - r2);
        float contrib = influence * influence * influence;
        sum += contrib;

        float isAccent = step(0.92, hash(cellId + 0.5));
        float blobDelay = hash(cellId + 0.7) * 0.75;
        float blobVisible = smoothstep(blobDelay, blobDelay + 0.25, u_hover);
        accentSum += contrib * isAccent * blobVisible;
      }
    }

    float accentWeight = sum > 0.0 ? accentSum / sum : 0.0;
    return vec2(sum, accentWeight);
  }

  vec2 warpCoords(vec2 p, float time) {
    float warp1 = vnoise(p * 0.5 + time * 0.05);
    float warp2 = vnoise(p * 0.3 - time * 0.03 + 100.0);
    return p + vec2(warp1, warp2) * 0.4;
  }

  uniform vec3 u_colorBright;
  uniform vec3 u_colorDark;
  uniform vec3 u_colorPageBg;
  uniform vec3 u_colorAccent;

  void main() {
    float scale = 0.0133;
    vec2 p = gl_FragCoord.xy * scale;

    vec3 bright = u_colorBright;
    vec3 dark = u_colorDark;
    vec3 pageBg = u_colorPageBg;
    vec3 accent = u_colorAccent;

    float baseHeight = 50.0 * u_dpr;
    float waveAmplitude = 25.0 * u_dpr;
    float xCoord = gl_FragCoord.x / u_dpr;
    float boundary = baseHeight;
    boundary += vnoise(vec2(xCoord * 0.008, u_time * 0.08)) * waveAmplitude;
    boundary += vnoise(vec2(xCoord * 0.02, u_time * 0.04 + 50.0)) * waveAmplitude * 0.4;

    float pixelY = mix(gl_FragCoord.y, u_resolution.y - gl_FragCoord.y, u_fadeTop);
    float distToBoundary = pixelY - boundary;

    float wallRange = 40.0 * u_dpr;
    float wallInfluence = smoothstep(wallRange, 0.0, distToBoundary) * 0.25;

    vec2 p1 = p * 0.7 + vec2(u_time * 0.02, u_time * 0.015);
    vec2 meta1 = metaball(warpCoords(p1, u_time * 0.6), u_time * 0.6);
    float field1 = meta1.x + wallInfluence;
    float accent1 = meta1.y;

    vec2 p2 = p + vec2(u_time * 0.06, -u_time * 0.02);
    vec2 meta2 = metaball(warpCoords(p2 + 100.0, u_time), u_time);
    float field2 = meta2.x + wallInfluence;
    float accent2 = meta2.y;

    float taperRange = 30.0 * u_dpr;
    float taper = smoothstep(-taperRange, 0.0, distToBoundary);
    field1 *= taper;
    field2 *= taper;

    float aaWidth = 0.005 / max(u_dpr, 1.0);
    float blend1 = smoothstep(0.92 - aaWidth, 0.92 + aaWidth, field1);
    float blend2 = smoothstep(0.95 - aaWidth, 0.95 + aaWidth, field2);

    float isAccent1 = step(0.5, accent1);
    float isAccent2 = step(0.5, accent2);

    vec3 dark1 = mix(dark, accent, isAccent1 * u_hover);
    vec3 bright2 = mix(bright, accent, isAccent2 * u_hover);

    vec3 color = mix(pageBg, dark1, blend1);
    color = mix(color, bright2, blend2);

    gl_FragColor = vec4(color, 1.0);
  }
`

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
  }
  return shader
}

function getIsDark() {
  const theme = document.documentElement.getAttribute("saved-theme")
  if (theme === "dark") return 1.0
  if (theme === "light") return 0.0
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? 1.0 : 0.0
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace(/^#/, "")
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("")
  const int = parseInt(hex, 16) || 0
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
}

function getCssVarRgb(name: string, fallback: number[]): number[] {
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!val) return fallback
  if (val.startsWith("#")) return hexToRgb(val)
  if (val.startsWith("rgba")) {
    const parts = val.substring(5, val.length - 1).split(",").map(s => parseFloat(s.trim()));
    if (parts.length >= 3) return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
  }
  return fallback
}

interface EffectConfig {
  canvas: HTMLCanvasElement
  gl: WebGLRenderingContext
  resolutionLoc: WebGLUniformLocation | null
  timeLoc: WebGLUniformLocation | null
  isDarkLoc: WebGLUniformLocation | null
  dprLoc: WebGLUniformLocation | null
  hoverLoc: WebGLUniformLocation | null
  colorBrightLoc: WebGLUniformLocation | null
  colorDarkLoc: WebGLUniformLocation | null
  colorPageBgLoc: WebGLUniformLocation | null
  colorAccentLoc: WebGLUniformLocation | null
  hoverTarget: number
  hoverValue: number
  needsResize: boolean
  needsColorUpdate: boolean
}

function initWaterEffect(canvasId: string, fadeTop: boolean): EffectConfig | null {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement
  if (!canvas) return null
  const gl = canvas.getContext("webgl", { antialias: true })
  if (!gl) return null

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.useProgram(program)

  const posBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const posLoc = gl.getAttribLocation(program, "a_position")
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  const resolutionLoc = gl.getUniformLocation(program, "u_resolution")
  const timeLoc = gl.getUniformLocation(program, "u_time")
  const isDarkLoc = gl.getUniformLocation(program, "u_isDark")
  const fadeTopLoc = gl.getUniformLocation(program, "u_fadeTop")
  const dprLoc = gl.getUniformLocation(program, "u_dpr")
  const hoverLoc = gl.getUniformLocation(program, "u_hover")
  
  const colorBrightLoc = gl.getUniformLocation(program, "u_colorBright")
  const colorDarkLoc = gl.getUniformLocation(program, "u_colorDark")
  const colorPageBgLoc = gl.getUniformLocation(program, "u_colorPageBg")
  const colorAccentLoc = gl.getUniformLocation(program, "u_colorAccent")

  gl.uniform1f(fadeTopLoc, fadeTop ? 1.0 : 0.0)

  return {
    canvas,
    gl,
    resolutionLoc,
    timeLoc,
    isDarkLoc,
    dprLoc,
    hoverLoc,
    colorBrightLoc,
    colorDarkLoc,
    colorPageBgLoc,
    colorAccentLoc,
    hoverTarget: 0,
    hoverValue: 0,
    needsResize: true,
    needsColorUpdate: true,
  }
}

let effects: EffectConfig[] = []
let startTime = performance.now()
let lastFrameTime = 0
let currentDpr = window.devicePixelRatio

function getEffectiveDpr() {
  const dpr = window.devicePixelRatio
  return dpr <= 1 ? 1.5 : dpr
}

function render(timestamp: number) {
  if (!isPageVisible || visibleCanvases.size === 0) {
    requestAnimationFrame(render)
    return
  }

  if (timestamp - lastFrameTime < FRAME_INTERVAL) {
    requestAnimationFrame(render)
    return
  }
  lastFrameTime = timestamp

  const elapsed = (performance.now() - startTime) / 1000.0
  const isDark = getIsDark()

  const newDpr = window.devicePixelRatio
  if (newDpr !== currentDpr) {
    currentDpr = newDpr
    for (const effect of effects) {
      effect.needsResize = true
    }
  }

  const effectiveDpr = getEffectiveDpr()
  const deltaTime = FRAME_INTERVAL / 1000.0

  for (const effect of effects) {
    const { canvas, gl, resolutionLoc, timeLoc, isDarkLoc, dprLoc, hoverLoc } = effect

    if (!visibleCanvases.has(canvas)) continue

    const targetWidth = Math.floor(canvas.offsetWidth * effectiveDpr)
    const targetHeight = Math.floor(canvas.offsetHeight * effectiveDpr)
    
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      effect.needsResize = true
    }

    if (effect.needsResize) {
      canvas.width = targetWidth
      canvas.height = targetHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height)
      effect.needsResize = false
    }

    if (effect.needsColorUpdate) {
      const isDarkVal = getIsDark() > 0.5
      // Fetch default quartz colors depending on theme, or read custom CSS variables
      const bright = getCssVarRgb("--shader-tertiary", isDarkVal ? [0.95, 0.54, 0.65] : [0.84, 0.5, 0.49])
      const dark = getCssVarRgb("--shader-secondary", isDarkVal ? [0.79, 0.65, 0.96] : [0.56, 0.47, 0.66])
      const pageBg = getCssVarRgb("--light", isDarkVal ? [0.094, 0.082, 0.102] : [0.976, 0.965, 0.941])
      const accent = getCssVarRgb("--textHighlight", isDarkVal ? [0.95, 0.54, 0.65] : [0.84, 0.5, 0.49])

      gl.uniform3f(effect.colorBrightLoc, bright[0], bright[1], bright[2])
      gl.uniform3f(effect.colorDarkLoc, dark[0], dark[1], dark[2])
      gl.uniform3f(effect.colorPageBgLoc, pageBg[0], pageBg[1], pageBg[2])
      gl.uniform3f(effect.colorAccentLoc, accent[0], accent[1], accent[2])
      effect.needsColorUpdate = false
    }

    const hoverSpeed = 1.0 / 2.65
    if (effect.hoverTarget > effect.hoverValue) {
      effect.hoverValue = Math.min(effect.hoverTarget, effect.hoverValue + deltaTime * hoverSpeed)
    } else if (effect.hoverTarget < effect.hoverValue) {
      effect.hoverValue = Math.max(effect.hoverTarget, effect.hoverValue - deltaTime * hoverSpeed)
    }

    gl.uniform1f(timeLoc, elapsed)
    gl.uniform1f(isDarkLoc, isDark)
    gl.uniform1f(dprLoc, effectiveDpr)
    gl.uniform1f(hoverLoc, effect.hoverValue)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  requestAnimationFrame(render)
}

function init() {
  if (initialized) return
  initialized = true

  const effect = initWaterEffect("header-canvas", false)
  if (effect) {
    effects = [effect]
  }

  if (effects.length === 0) return

  effects.forEach(function (effect) {
    const container = effect.canvas.parentElement
    if (container) {
      container.addEventListener("mouseenter", function () {
        effect.hoverTarget = 1
      })
      container.addEventListener("mouseleave", function () {
        effect.hoverTarget = 0
      })
    }
  })

  document.addEventListener("visibilitychange", function () {
    isPageVisible = !document.hidden
  })

  const observer = new IntersectionObserver(
    function (entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleCanvases.add(entry.target)
        } else {
          visibleCanvases.delete(entry.target)
        }
      }
    },
    { threshold: 0 },
  )

  for (const effect of effects) {
    observer.observe(effect.canvas)
  }

  window.addEventListener("resize", function () {
    for (const effect of effects) {
      effect.needsResize = true
    }
  })

  // Watch for theme changes specifically in Quartz
  const html = document.documentElement
  const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "saved-theme") {
        for (const effect of effects) {
          effect.needsColorUpdate = true
        }
      }
    })
  })
  themeObserver.observe(html, { attributes: true })

  render(performance.now())
}

document.addEventListener("nav", () => {
  // Re-init or check element when quartz does SPA navigation
  if (!initialized) {
    init()
  } else {
    // If element was replaced, re-attach observer
    const canvas = document.getElementById("header-canvas") as HTMLCanvasElement
    if (canvas && effects.length > 0 && effects[0].canvas !== canvas) {
      visibleCanvases.delete(effects[0].canvas)

      const newEffect = initWaterEffect("header-canvas", false)
      if (newEffect) {
        effects = [newEffect]
        visibleCanvases.add(newEffect.canvas)
        const container = newEffect.canvas.parentElement
        if (container) {
          container.addEventListener("mouseenter", function () {
            newEffect.hoverTarget = 1
          })
          container.addEventListener("mouseleave", function () {
            newEffect.hoverTarget = 0
          })
        }
      }
    }
  }
})
