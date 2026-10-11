import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types"
// @ts-ignore
import script from "./scripts/animatedHeader.inline"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return (
    <div class="header-wrapper">
      <div class="header-image">
        <canvas id="header-canvas"></canvas>
      </div>
      <nav class="header-links">
        <a class="header-cv-link" href="/cv">Curriculum Vitae</a>
        <div class="header-social-links">
          <a href="https://hardcover.app/@denial">hardcover</a>
          <a href="https://x.com/denialbb">X</a>
          <a href="https://github.com/denialbb">GitHub</a>
        </div>
      </nav>
      {children.length > 0 ? <header>{children}</header> : null}
    </div>
  )
}

Header.css = `
.header-wrapper {
  padding-top: 20px;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  flex: auto;
}

.header-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  overflow: hidden;
  margin-bottom: 0;
  border-radius: 0;
  z-index: 999;
  pointer-events: none; /* so users can click links underneath */
}

.header-image canvas {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: auto; /* re-enable pointer events for hover effect */
}

@media only screen and (max-width: 800px) {
  .header-image {
    height: 100px;
  }
  .header-wrapper {
    padding-top: 100px;
  }
}
`

Header.afterDOMLoaded = script

const constructor = (() => Header) satisfies QuartzComponentConstructor
import { componentRegistry } from "./registry"
componentRegistry.register("Header", constructor, "Header.tsx")

export default constructor
