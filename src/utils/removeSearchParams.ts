const removeSearchParams = (url: string) => {
  return url.split("?")[0]
}

export default removeSearchParams
