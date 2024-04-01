import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
// @ts-expect-error no types for react-style-editor
import StyleEditor from 'react-style-editor'

interface ICssEditor {
  open: boolean
  css: string
  onCssChange: (newCss: string) => void
}

const CssEditor = ({ open, css, onCssChange }: ICssEditor) => {
  const [currentCss, setCurrentCss] = useState(css)

  return (
    <Drawer
      open={open}
      onClose={() => onCssChange(currentCss)}
      direction='bottom'
      style={{ overflowY: 'auto', padding: '10px' }}>
      <StyleEditor value={currentCss} onChange={(value: string) => setCurrentCss(value)} />
    </Drawer>
  )
}

export default CssEditor
