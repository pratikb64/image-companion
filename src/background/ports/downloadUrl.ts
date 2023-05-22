import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  const { url } = req.body

  try {
    await chrome.downloads.download({
      url: url
    })
    res.send({
      message: "success",
      url
    })
  } catch (error) {
    res.send("error")
  }
}

export default handler
