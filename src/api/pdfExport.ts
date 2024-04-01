// https://md-to-pdf.fly.dev/

const PDF_EXPORT_URL = 'https://md-to-pdf.fly.dev'

const pdfExport = async (markdown: string, css?: string) => {
  console.log('markdown', markdown)
  console.log('css', css)

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
}

export default pdfExport
