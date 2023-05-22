<p align="center">
  <a href="">
    <img alt="Image companion logo" width="75%" src="/assets/image-companion-bg-w.svg" />
  </a>
</p>

<p align="center">
  <a aria-label="License" href="/LICENSE">
    <img alt="See License" src="https://img.shields.io/github/license/pratikb64/image-companion"/>
  </a>
  <a aria-label="Twitter" href="https://www.twitter.com/pratikb64">
    <img alt="Follow Pratik Badhe on Twitter" src="https://img.shields.io/twitter/follow/pratikb64?logo=twitter"/>
  </a>
</p>
<h1 align="center"> Image Companion </h1>
<p align="center">
A Browser extension that lets you zoom, pan, and download svgs and images from any website in full resolution.
</p>

## Highlighted Features

- Supports 10k+ website to view svgs and full resolution images
- Zoom images and svgs
- Pan images and svgs

## Planned Features

- [ ] Add controls to manage on hover delay, etc
- [ ] Batch download all images
- [ ] Rotate image

## Supported Browsers

- Chrome
- Edge
- Should support all Chromium based browsers (Not tested)
- Firefox (Has bug where file does not download with it's extension)

## Add website support for full resolution

To add website support, create an object like this

```
{
	url:  RegExp
	regex:  boolean
	pattern:  RegExp						// Optional if "regex" is false
	replace:  string						// Optional  if "regex" is false
	getImage:  (arg:  string)  =>  string	// Optional  if "regex" is true
}
```

and add it to array `siteMetadata` in `src\utils\siteMetadata.ts`file

## Usage

Download extension directly from:
Chrome Web Store
Edge Add-ons
Firefox Add-ons
OR
From latest release

## Contributing

Feel free to send PRs against the [issues](https://github.com/pratikb64/image-companion/issues)!

# License

[MIT](https://github.com/pratikb64/image-companion/blob/main/LICENSE)
