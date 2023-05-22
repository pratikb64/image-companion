import { usePort } from "@plasmohq/messaging/hook"
import { useEffect, useRef, useState } from "react"
import { useStore } from "zustand"
import windowState from "~states/windowState"
import Loading from "./Loading"

const ImageWindow = () => {
  const { src, setVisible } = useStore(windowState)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, oldX: 0, oldY: 0, isClicked: false })
  const position = useRef({ x: 0, y: 0 })
  const scaleRef = useRef(1)
  const downloadUrl = usePort("downloadUrl")
  const [isDownloading, setIsDownloading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (downloadUrl.data?.["message"] == "success") setIsDownloading(false)
  }, [downloadUrl.data])

  const repositionMenu = () => {
    const menu = menuRef.current
    const { top, left } = containerRef.current.getBoundingClientRect()
    if (top < 0) menu.style.top = Math.abs(top) + "px"
    if (left < 0) menu.style.left = Math.abs(left) + "px"
    if (top > 0) menu.style.top = "-36px"
    if (top < 36 && top > 0) menu.style.top = "-" + (36 - (36 - top)) + "px"
    if (left > 0) menu.style.left = "0px"
  }

  const scaleImage = ({
    amount,
    x,
    y
  }: {
    amount: number
    x: number
    y: number
  }) => {
    const scale = scaleRef.current
    const s = scale * amount
    scaleRef.current = s
    const container = containerRef.current
    const { width, height } = container.getBoundingClientRect()
    container.style.width = width * amount + "px"
    container.style.height = height * amount + "px"
    const xP = position.current.x + x
    const yP = position.current.y + y
    container.style.left = xP + "px"
    container.style.top = yP + "px"
    position.current = { x: xP, y: yP }
  }

  const moveImage = ({ x, y }: { x: number; y: number }) => {
    const xP = position.current.x + x
    const yP = position.current.y + y
    const container = containerRef.current
    container.style.left = xP + "px"
    container.style.top = yP + "px"
    position.current = { x: xP, y: yP }
  }

  function mouseEvent(event: MouseEvent) {
    const mouse = mouseRef.current
    if (event.type === "mousedown") {
      mouse.isClicked = true
    }
    if (event.type === "mouseup" || event.type === "mouseout") {
      mouse.isClicked = false
    }
    mouse.oldX = mouse.x
    mouse.oldY = mouse.y
    mouse.x = event.pageX
    mouse.y = event.pageY
    if (mouse.isClicked) {
      moveImage({ x: mouse.x - mouse.oldX, y: mouse.y - mouse.oldY })
      repositionMenu()
    }
    event.preventDefault()
  }

  function mouseWheelEvent(event: WheelEvent) {
    if (imageRef.current !== null) {
      if (event.deltaY < 0) {
        const offX = event.offsetX - event.offsetX * 1.1
        const offY = event.offsetY - event.offsetY * 1.1
        scaleImage({ amount: 1.1, x: offX, y: offY })
      }
      if (event.deltaY > 0) {
        const offX = event.offsetX - event.offsetX * (1 / 1.1)
        const offY = event.offsetY - event.offsetY * (1 / 1.1)
        scaleImage({ amount: 1 / 1.1, x: offX, y: offY })
      }
      repositionMenu()
      event.preventDefault()
    }
  }

  const resetPosition = () => {
    if (imageRef.current !== null) {
      const imgW = imageRef.current.width / 2
      let imgH = imageRef.current.height / 2
      imgH = imgH == 0 ? 250 / 2 : imgH
      const x = window.innerWidth / 2 - imgW + window.scrollX
      const y = window.innerHeight / 2 - imgH + window.scrollY
      position.current = { x, y }
      scaleRef.current = 1
      const container = containerRef.current
      container.style.left = x + "px"
      container.style.top = y + "px"
    }
    repositionMenu()
  }

  const addEventListeners = (element: HTMLDivElement) => {
    element.addEventListener("mousemove", mouseEvent)
    element.addEventListener("mousedown", mouseEvent)
    element.addEventListener("mouseup", mouseEvent)
    element.addEventListener("mouseout", mouseEvent)
    element.addEventListener("wheel", mouseWheelEvent)
  }
  const removeEventListeners = (element: HTMLDivElement) => {
    element.removeEventListener("mousemove", mouseEvent)
    element.removeEventListener("mousedown", mouseEvent)
    element.removeEventListener("mouseup", mouseEvent)
    element.removeEventListener("mouseout", mouseEvent)
    element.removeEventListener("wheel", mouseWheelEvent)
  }

  useEffect(() => {
    const container = containerRef.current
    setIsLoading(true)
    if (container !== null) addEventListeners(container)
    resetPosition()

    imageRef.current.onload = () => {
      setIsLoading((s) => !s)
      resetPosition()
    }
    return () => {
      if (container !== null) removeEventListeners(container)
    }
  }, [src])

  return (
    <div className="absolute w-[500px]" ref={containerRef}>
      <div
        className="flex w-max items-center justify-center rounded-md bg-white p-10"
        style={{
          display: isLoading ? "flex" : "none"
        }}>
        <Loading width="50px" height="50px" color="black" />
      </div>
      <img
        style={{
          width: "100%",
          opacity: isLoading ? 0 : 1
        }}
        src={src}
        alt=""
        draggable={false}
        ref={imageRef}
      />
      <div
        className="absolute -top-[36px] left-0 flex gap-4 rounded-md bg-white p-1 px-2 shadow-xl"
        ref={menuRef}>
        <button title="Close" onClick={() => setVisible(false)}>
          <svg
            className="w-[24px] text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        {isDownloading ? (
          <Loading width="24px" height="24px" color="black" />
        ) : (
          <button
            title="Download"
            onClick={() => {
              setIsDownloading(true)
              downloadUrl.send({
                url: src
              })
            }}>
            <svg
              className="w-[24px] text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default ImageWindow
