import imgIcon from "data-base64:~assets/image_icon.png"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import type { MouseEvent } from "react"
import { useStore } from "zustand"

import toolbarState from "~states/toolbarState"
import windowsState from "~states/windowState"

const Toolbar = () => {
  const { position, isVisible, outTimer, currentUrl } = useStore(toolbarState)
  const { setVisible, setSrc } = useStore(windowsState)
  const mouseOver = (e: MouseEvent<HTMLDivElement>) => {
    clearTimeout(outTimer)
  }
  const mouseOut = (e: MouseEvent<HTMLDivElement>) => {
    const timer = setTimeout(() => {
      toolbarState.setState({
        currentUrl: "",
        isVisible: false
      })
    }, 500)
    toolbarState.setState({ outTimer: timer })
  }
  const clickHandler = () => {
    if (currentUrl !== "") {
      setVisible(false)
      setSrc(currentUrl)
      setVisible(true)
    }
  }
  return (
    <div
      style={{
        transform: `translate(${position.x},${position.y})`
      }}
      className="absolute z-50">
      <div
        className={`${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        } transform transition-all ease-in-out`}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}>
        <div>
          <button type="button" className="w-[20px]" onClick={clickHandler}>
            <img
              src={imgIcon}
              className="w-full transition-opacity transform bg-white rounded-sm opacity-30 hover:opacity-100"
              alt="image-icon"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toolbar

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  run_at: "document_start"
}
