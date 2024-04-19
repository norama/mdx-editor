// @ts-expect-error no type declarations
import domToPdf from 'dom-to-pdf'

const OPTIONS = {
  filename: 'report.pdf',
}

const createStyledPdfDom = (
  target: HTMLElement,
  computedStyle: CSSStyleDeclaration,
  css: string,
) => {
  const root = document.createElement('html')
  const head = document.createElement('head')
  const body = document.createElement('body')

  Array.from(computedStyle).forEach((key) => {
    if (key.startsWith('font')) {
      body.style.setProperty(
        key,
        computedStyle.getPropertyValue(key),
        computedStyle.getPropertyPriority(key),
      )
    }
  })
  body.style.padding = '10px 20px'

  root.appendChild(head)
  root.appendChild(body)

  const style = document.createElement('style')
  style.innerHTML = css

  head.appendChild(style)
  body.appendChild(target)

  return root
}

interface IDomToPdfButton {
  domNodeSelector: () => HTMLElement | null
  css: string
}

const DomToPdfButton = ({ domNodeSelector, css }: IDomToPdfButton) => {
  const handleClick = () => {
    const element = domNodeSelector()

    if (element) {
      const computedStyle = getComputedStyle(element)
      const target = element.cloneNode(true) as HTMLElement

      const root = createStyledPdfDom(target, computedStyle, css)

      domToPdf(root, OPTIONS, function () {
        console.log('done')
      })
    }
  }

  return <button onClick={handleClick}>DOM to PDF</button>
}

export default DomToPdfButton
