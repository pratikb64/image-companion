const regexReplace = (string: string, replace: string, reg: RegExp) => {
  return string.replace(reg, replace)
}

export default regexReplace
