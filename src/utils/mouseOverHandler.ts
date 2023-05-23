import toolbarState from "~states/toolbarState"
import regexReplace from "./regexReplace"
import siteMetadata from "./siteMetadata"

export default function mouseOverHandler(e: HTMLElementEvent) {
  const tag = e.target.nodeName
  if (tag === "IMG") {
    let src = e.target.getAttribute("src")
    if (src == "" || src == null)
      src = handleSrcSet(e.target.getAttribute("srcset"))
    let metadata = siteMetadata.find((sm) => sm.url.test(src))

    const isRelativeUrl = /^\//
    if (isRelativeUrl.test(src)) src = `${window.location.origin}${src}`

    let url
    if (metadata) {
      if (metadata.regex)
        url = regexReplace(src, metadata.replace, metadata.pattern)

      if (!metadata.regex) url = metadata.getImage(src)
    }
    setData(e, url || src)
  }

  if (tag === "svg") {
    const serializer = new XMLSerializer()
    const svgInString = serializer.serializeToString(e.target)
    const url = "data:image/svg+xml," + encodeURIComponent(svgInString)
    setData(e, url)
  }

  if (tag === "path") {
    let parent = e.target.parentElement
    while (parent && parent.nodeName !== "svg") {
      parent = parent.parentElement
    }
    if (parent) {
      const serializer = new XMLSerializer()
      const svgInString = serializer.serializeToString(parent)
      const url = "data:image/svg+xml," + encodeURIComponent(svgInString)
      setData(e, url)
    }
  }
}

const setData = (e: HTMLElementEvent, url: string) => {
  const { x, y } = e.target.getBoundingClientRect()

  const timer = setTimeout(() => {
    toolbarState.setState({
      position: {
        x: `${x + window.scrollX - 10}px`,
        y: `${y + window.scrollY - 14}px`
      },
      currentUrl: url,
      ctrlKey: e.ctrlKey,
      isVisible: true
    })
  }, 500)

  toolbarState.setState({ inTimer: timer })
}

const handleSrcSet = (srcSet: string) => {
  const srcsetArray = srcSet.split(",")
  const src = srcsetArray.at(-1).trim()
  return src.split(" ")[0]
}

export interface HTMLElementEvent extends MouseEvent {
  target: HTMLElement
}
