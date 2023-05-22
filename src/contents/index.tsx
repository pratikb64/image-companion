import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useStore } from "zustand"
import ImageWindow from "~components/ImageWindow"
import windowState from "~states/windowState"

const Main = () => {
  const { isVisible } = useStore(windowState)
  return <>{isVisible && <ImageWindow />}</>
}

export default Main

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  all_frames: true,
  run_at: "document_start"
}
