import regexReplace from "./regexReplace"
import removeSearchParams from "./removeSearchParams"

const siteMetadata: SiteMetadata = [
  {
    url: /avatars\.githubusercontent\.com/,
    regex: false,
    getImage: (url) => removeSearchParams(url)
  },
  {
    url: /cdn\.discordapp\.com/,
    regex: false,
    getImage: (url) => removeSearchParams(url)
  },
  {
    url: /media\.discordapp\.net/,
    regex: false,
    getImage: (url) => removeSearchParams(url)
  },
  {
    url: /yt3\.ggpht\.com/i,
    regex: true,
    pattern: /=s\d+.*/i,
    replace: "=s9999"
  },
  {
    url: /yt3\.googleusercontent\.com/i,
    regex: true,
    pattern: /=s\d+.*/i,
    replace: "=s9999"
  },
  {
    url: /imgur\.com/i,
    regex: true,
    pattern: /\?.+/i,
    replace: ""
  },
  {
    url: /gravatar\.com/i,
    regex: true,
    pattern: /\?.+/i,
    replace: "?=s999"
  },
  {
    url: /i\.ytimg\.com/i,
    regex: true,
    pattern: /\?.+/i,
    replace: ""
  },
  {
    url: /miro\.medium\.com/i,
    regex: true,
    pattern: /\/resize.*\//i,
    replace: "/"
  },
  {
    url: /cdn\.hashnode\.com/i,
    regex: true,
    pattern: /\?.+/i,
    replace: ""
  },
  {
    url: /pbs\.twimg\.com/i,
    regex: true,
    pattern: /&name.*/i,
    replace: "&name=large"
  },
  {
    // This is a general solution for cloudinary CDN which may or may not work for all it's clients websites, that's why this should be at the bottom of this array and any exception that may arise should be added before this object
    url: /res\.cloudinary\.com/i,
    regex: false,
    getImage: (URL) => {
      let url = URL
      const regex =
        /\/(ar|bo|c|co|cs|d|dn|dpr|e|f|fl|fn|g|h|l|o|p|q|r|t|w|x|y|z)_(\w|\.|,|:)*/
      while (regex.test(url)) {
        url = regexReplace(decodeURIComponent(url), "", regex)
      }
      return url
    }
  }
]

export default siteMetadata

type SiteMetadata = Array<{
  url: RegExp
  regex: boolean
  pattern?: RegExp
  replace?: string
  getImage?: (arg: string) => string
}>
