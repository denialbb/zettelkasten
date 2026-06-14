import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/animatedHeader.inline"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return (
    <div class="header-wrapper">
      <div class="header-image">
        <canvas id="header-canvas"></canvas>
      </div>
      {children.length > 0 ? <header>{children}</header> : null}
    </div>
  )
}

Header.css = `
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
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.header-image canvas {
  width: 100%;
  height: 100%;
  display: block;
}

@media only screen and (max-width: 800px) {
  .header-image {
    height: 100px;
  }
}
`

Header.afterDOMLoaded = script

const constructor = (() => Header) satisfies QuartzComponentConstructor
import { componentRegistry } from "./registry"
componentRegistry.register("Header", constructor, "Header.tsx")

export default constructor
