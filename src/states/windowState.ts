import { createStore } from "zustand"

const windowState = createStore<WindowState>((set) => ({
  src: "",
  isVisible: false,
  setVisible: (v) => set({ isVisible: v }),
  setSrc: (src) => set({ src })
}))

interface WindowState {
  src: string
  isVisible: boolean
  setVisible: (v: boolean) => void
  setSrc: (v: string) => void
}

export default windowState
