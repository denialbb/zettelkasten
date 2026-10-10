// Animation effect (WebGL metaballs)
//
// Lifecycle/perf notes (fixes for mobile slowdown + renderer crash):
// - Installs exactly once per document (globalThis guard). Quartz re-appends
//   afterDOMLoaded scripts on SPA navigations and the serve-mode monolithic
//   IIFE bundle re-executes them; previously that duplicated the rAF loop,
//   listeners and observers on every navigation until the tab died.
// - Per-frame canvas.offsetWidth reads and the duplicated listeners are gone:
//   sizes are only re-read on resize events (no forced layout every frame).
// - devicePixelRatio is capped at 1.5. Phones report dpr up to 3.5, which
//   rendered this shader at far more fragments than a mobile GPU sustains —
//   that is the slowdown → GPU-process crash on mobile.
// - WebGL context loss is handled instead of drawing into a dead context.
const FRAME_INTERVAL = 33 // ~30fps

// ponytail: u_time wraps at ~72min (one-frame clock jump the shader will
// visibly hiccup on once); without the wrap mediump fp16 GPUs NaN out.
// If the hiccup matters, wrap the animation phases in the shader instead.
const TIME_WRAP_S = 4300

const vsSource = `
  attribute vec2 a_position;
  varying vec2 v_position;
  void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_position = a_position;
  }
`

const fsSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
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
  let parts = hex.replace(/^#/, "")
  if (parts.length === 3)
    parts = parts
      .split("")
      .map((c) => c + c)
      .join("")
  const int = parseInt(parts, 16) || 0
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
}

function getCssVarRgb(name: string, fallback: number[]): number[] {
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!val) return fallback
  if (val.startsWith("#")) return hexToRgb(val)
  if (val.startsWith("rgba")) {
    const nums = val
      .substring(5, val.length - 1)
      .split(",")
      .map((s) => parseFloat(s.trim()))
    if (nums.length >= 3) return [nums[0] / 255, nums[1] / 255, nums[2] / 255]
  }
  return fallback
}

interface EffectConfig {
  canvas: HTMLCanvasElement
  gl: WebGLRenderingContext
  program: WebGLProgram
  vertexShader: WebGLShader
  fragmentShader: WebGLShader
  posBuffer: WebGLBuffer | null
  resolutionLoc: WebGLUniformLocation | null
  timeLoc: WebGLUniformLocation | null
  dprLoc: WebGLUniformLocation | null
  hoverLoc: WebGLUniformLocation | null
  fadeTopLoc: WebGLUniformLocation | null
  colorBrightLoc: WebGLUniformLocation | null
  colorDarkLoc: WebGLUniformLocation | null
  colorPageBgLoc: WebGLUniformLocation | null
  colorAccentLoc: WebGLUniformLocation | null
  fadeTop: boolean
  hoverTarget: number
  hoverValue: number
  needsResize: boolean
  needsColorUpdate: boolean
  cssWidth: number
  cssHeight: number
}

// Single active effect per page. Rebuilt on SPA navigation instead of
// accumulating new contexts/programs.
let active: EffectConfig | null = null
let running = false
let rafId = 0
let headerVisible = true
let contextLost = false
let lastFrameTime = 0
let isPageVisible = !document.hidden
let savedDpr = window.devicePixelRatio
const startTime = performance.now()

function getEffectiveDpr() {
  // Cap render resolution: phones report dpr up to 3.5 and the fragment
  // shader cannot sustain 30fps at that size — the mobile slowdown/crash.
  return Math.min(window.devicePixelRatio || 1, 1.5)
}

function buildPipeline(canvas: HTMLCanvasElement, fadeTop: boolean): EffectConfig | null {
  const gl = canvas.getContext("webgl", {
    antialias: false, // full-screen shader quad: MSAA costs 4x tile memory on mobile for nothing
    alpha: false, // output is fully opaque anyway
    powerPreference: "low-power",
  }) as WebGLRenderingContext | null
  if (!gl) return null
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs)
    if (fs) gl.deleteShader(fs)
    return null
  }
  const program = gl.createProgram()
  if (!program) {
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    return null
  }
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

  return {
    canvas,
    gl,
    program,
    vertexShader: vs,
    fragmentShader: fs,
    posBuffer,
    resolutionLoc: gl.getUniformLocation(program, "u_resolution"),
    timeLoc: gl.getUniformLocation(program, "u_time"),
    dprLoc: gl.getUniformLocation(program, "u_dpr"),
    hoverLoc: gl.getUniformLocation(program, "u_hover"),
    fadeTopLoc: gl.getUniformLocation(program, "u_fadeTop"),
    colorBrightLoc: gl.getUniformLocation(program, "u_colorBright"),
    colorDarkLoc: gl.getUniformLocation(program, "u_colorDark"),
    colorPageBgLoc: gl.getUniformLocation(program, "u_colorPageBg"),
    colorAccentLoc: gl.getUniformLocation(program, "u_colorAccent"),
    fadeTop,
    hoverTarget: 0,
    hoverValue: 0,
    needsResize: true,
    needsColorUpdate: true,
    cssWidth: canvas.offsetWidth,
    cssHeight: canvas.offsetHeight,
  }
}

function disposePipeline(fully: boolean) {
  if (!active) return
  const { gl, program, vertexShader, fragmentShader, posBuffer } = active
  gl.deleteProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)
  if (posBuffer) gl.deleteBuffer(posBuffer)
  if (fully) {
    // Explicitly release the backing context (e.g. the canvas was replaced
    // during SPA navigation and its context would otherwise linger in GPU
    // memory until GC — on mobile that is the WebGL memory-leak symptom).
    gl.getExtension("WEBGL_lose_context")?.loseContext()
  }
  active = null
}

function updateColors(effect: EffectConfig) {
  const { gl } = effect
  const isDarkVal = getIsDark() > 0.5
  // Fetch default quartz colors depending on theme, or read custom CSS variables
  const bright = getCssVarRgb(
    "--shader-tertiary",
    isDarkVal ? [0.95, 0.54, 0.65] : [0.84, 0.5, 0.49],
  )
  const dark = getCssVarRgb(
    "--shader-secondary",
    isDarkVal ? [0.79, 0.65, 0.96] : [0.56, 0.47, 0.66],
  )
  const pageBg = getCssVarRgb("--light", isDarkVal ? [0.094, 0.082, 0.102] : [0.976, 0.965, 0.941])
  const accent = getCssVarRgb("--textHighlight", isDarkVal ? [0.95, 0.54, 0.65] : [0.84, 0.5, 0.49])

  gl.uniform3f(effect.colorBrightLoc, bright[0], bright[1], bright[2])
  gl.uniform3f(effect.colorDarkLoc, dark[0], dark[1], dark[2])
  gl.uniform3f(effect.colorPageBgLoc, pageBg[0], pageBg[1], pageBg[2])
  gl.uniform3f(effect.colorAccentLoc, accent[0], accent[1], accent[2])
  gl.uniform1f(effect.fadeTopLoc, effect.fadeTop ? 1.0 : 0.0)
}

function render(timestamp: number) {
  if (!running) return
  rafId = requestAnimationFrame(render)
  if (!isPageVisible || !active || contextLost || !headerVisible) return

  if (timestamp - lastFrameTime < FRAME_INTERVAL) return
  lastFrameTime = timestamp

  const effect = active
  const { canvas, gl, resolutionLoc, timeLoc, dprLoc, hoverLoc } = effect

  const newDpr = window.devicePixelRatio
  if (newDpr !== savedDpr) {
    savedDpr = newDpr
    effect.needsResize = true
  }

  const effectiveDpr = getEffectiveDpr()
  const targetWidth = Math.floor(effect.cssWidth * effectiveDpr)
  const targetHeight = Math.floor(effect.cssHeight * effectiveDpr)
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
    updateColors(effect)
    effect.needsColorUpdate = false
  }

  const hoverSpeed = 1.0 / 2.65
  const deltaTime = FRAME_INTERVAL / 1000.0
  if (effect.hoverTarget > effect.hoverValue) {
    effect.hoverValue = Math.min(effect.hoverTarget, effect.hoverValue + deltaTime * hoverSpeed)
  } else if (effect.hoverTarget < effect.hoverValue) {
    effect.hoverValue = Math.max(effect.hoverTarget, effect.hoverValue - deltaTime * hoverSpeed)
  }

  gl.uniform1f(timeLoc, ((performance.now() - startTime) / 1000.0) % TIME_WRAP_S)
  gl.uniform1f(dprLoc, effectiveDpr)
  gl.uniform1f(hoverLoc, effect.hoverValue)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

function startRenderLoop() {
  if (running || !active) return
  running = true
  rafId = requestAnimationFrame(render)
}

function stopRenderLoop() {
  running = false
  cancelAnimationFrame(rafId)
  rafId = 0
}

// Pause rendering while the header is scrolled out of view.
const visibilityObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (active && entry.target === active.canvas) {
      headerVisible = entry.isIntersecting
    }
  }
})

const onNav = () => {
  // Tear down the previous page's listeners, then rebuild for the new DOM.
  stopRenderLoop()
  for (const dispose of pageDisposers) dispose()
  pageDisposers.length = 0

  const canvas = document.getElementById("header-canvas") as HTMLCanvasElement | null
  if (active) {
    // If micromorph swapped the canvas element, release its GL context
    // explicitly; otherwise the same context object is reused when the page
    // reuses the canvas element.
    disposePipeline(active.canvas !== canvas)
  }
  if (!canvas) return

  const effect = buildPipeline(canvas, false)
  if (!effect) return
  active = effect
  contextLost = false
  headerVisible = true

  const container = canvas.parentElement
  if (container) {
    const enter = () => {
      if (active) active.hoverTarget = 1
    }
    const leave = () => {
      if (active) active.hoverTarget = 0
    }
    container.addEventListener("mouseenter", enter)
    container.addEventListener("mouseleave", leave)
    pageDisposers.push(() => {
      container.removeEventListener("mouseenter", enter)
      container.removeEventListener("mouseleave", leave)
    })
  }

  // Context loss handling: without this, Chrome/Android silently kills the
  // context and the loop keeps drawing into nothing at full fragment count.
  canvas.addEventListener("webglcontextlost", onContextLost, false)
  canvas.addEventListener("webglcontextrestored", onContextRestored, false)

  visibilityObserver.disconnect()
  visibilityObserver.observe(canvas)

  startRenderLoop()
}

const onContextLost = (event: Event) => {
  event.preventDefault()
  contextLost = true
}

const onContextRestored = () => {
  contextLost = false
  // Programs/buffers died with the context: rebuild the pipeline.
  disposePipeline(false)
  const canvas = document.getElementById("header-canvas") as HTMLCanvasElement | null
  const effect = canvas ? buildPipeline(canvas, false) : null
  if (!canvas || !effect) return
  effect.needsColorUpdate = true
  active = effect
  visibilityObserver.observe(canvas)
  startRenderLoop()
}

const pageDisposers: (() => void)[] = []

// Called before every nav by spa.inline (and on every prenav in serve mode),
// so the loop/objects never survive a page transition.
const cleanup = () => {
  stopRenderLoop()
  for (const dispose of pageDisposers) dispose()
  pageDisposers.length = 0
}
window.addCleanup?.(cleanup)

// Theme changes re-read CSS colors (no per-frame getComputedStyle churn).
const themeObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.attributeName === "saved-theme" && active) {
      active.needsColorUpdate = true
    }
  }
})
themeObserver.observe(document.documentElement, { attributes: true })

const onResize = () => {
  if (!active) return
  active.cssWidth = active.canvas.offsetWidth
  active.cssHeight = active.canvas.offsetHeight
  active.needsResize = true
}
window.addEventListener("resize", onResize)

const onVisibilityChange = () => {
  isPageVisible = !document.hidden
}
document.addEventListener("visibilitychange", onVisibilityChange)

document.addEventListener("nav", onNav)

// Scripts are re-appended to <head> (and, in serve mode, re-executed) on every
// SPA navigation: keep only one instance alive.
const instanceKey = "__quartzAnimatedHeaderReady"
// SAFETY: a string-keyed flag on globalThis is the only storage that survives
// IIFE re-execution (serve-mode bundle) and does not typecheck a custom index
// signature, hence the double cast.
// SAFETY: a string-keyed marker on globalThis is the only storage that
// survives IIFE re-execution (serve-mode bundle re-runs the script); cast
// through unknown because globalThis has no index signature to check against.
const existing = globalThis as unknown as Record<string, unknown>
if (!existing[instanceKey]) {
  existing[instanceKey] = true
}
