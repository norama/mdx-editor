// https://md-to-pdf.fly.dev/

const PDF_EXPORT_URL = 'https://md-to-pdf.fly.dev'

// https://www.regextester.com/103676
const IMG_REGEX = /<img.*?src="(.*?)"[^>]+>/g
const WIDTH_REGEX = /width="([0-9]*)"/i
const HEIGHT_REGEX = /height="([0-9]*)"/i

type TMatchResult = (RegExpMatchArray | null)[] | undefined

const toCss = (attrs: TMatchResult, name: string) =>
  attrs
    ?.filter((attr) => attr !== null)
    .map(
      (attr) => `
        img[${attr[0]}] {
          ${name}: ${attr[1]}px;
        }`,
    )
    .join('\n')

const toWidthCss = (attrs: TMatchResult) => toCss(attrs, 'width')
const toHeightCss = (attrs: TMatchResult) => toCss(attrs, 'height')

const imgCss = (markdown: string) => {
  const imgTags = markdown.match(IMG_REGEX)
  const widthAttrs = imgTags?.map((img) => img.match(WIDTH_REGEX))
  const heightAttrs = imgTags?.map((img) => img.match(HEIGHT_REGEX))
  const widthCss = toWidthCss(widthAttrs) ?? ''
  const heightCss = toHeightCss(heightAttrs) ?? ''
  return [widthCss, heightCss].join('\n').trim()
}

const pdfExport = async (markdown: string, css = '') => {
  console.log('markdown', markdown)
  console.log('css', css)

  css += imgCss(markdown)

  const data = new URLSearchParams()
  data.append('markdown', markdown)
  if (css) {
    data.append('css', css)
  }

  const response = await fetch(PDF_EXPORT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  })

  console.log('response', response)
  const blob = await response.blob()
  console.log('blob', blob)
  const pdfUrl = URL.createObjectURL(blob)
  window.open(pdfUrl, '_blank')?.focus()
}

export default pdfExport
