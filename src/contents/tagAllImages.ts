import type { PlasmoCSConfig } from "plasmo"

import mouseOutHandler from "~utils/mouseOutHandler"
import type { HTMLElementEvent } from "~utils/mouseOverHandler"
import mouseOverHandler from "~utils/mouseOverHandler"

export const config: PlasmoCSConfig = {
  all_frames: true,
  run_at: "document_start"
}

document.addEventListener(
  "mouseover",
  (e: HTMLElementEvent) => mouseOverHandler(e),
  true
)

document.addEventListener(
  "mouseout",
  (e: HTMLElementEvent) => mouseOutHandler(e),
  true
)
