import pdfExport from 'api/pdfExport'

interface IPdfExportButton {
  getMarkdown: () => string
  css?: string
}

const PdfExportButton = ({ getMarkdown, css }: IPdfExportButton) => (
  <button onClick={() => pdfExport(getMarkdown(), css)}>PDF</button>
)

export default PdfExportButton
