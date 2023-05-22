import toolbarState from "~states/toolbarState"

export default function mouseOutHandler(e: HTMLElementEvent) {
  const tag = e.target.nodeName
  if (tag === "IMG" || tag === "svg" || tag === "path") {
    clearTimeout(toolbarState.getState()?.inTimer)
    const timer = setTimeout(() => {
      toolbarState.setState({
        currentUrl: "",
        isVisible: false
      })
    }, 500)
    toolbarState.setState({ outTimer: timer })
  }
}

export interface HTMLElementEvent extends MouseEvent {
  target: HTMLElement
}
