import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  codeBlockPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  diffSourcePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  DiffSourceToggleWrapper,
  MDXEditorMethods,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './App.css'
import defCssString from './themes/custom.css?raw'
import PdfExportButton from './components/PdfExportButton'
import { useRef, useState } from 'react'
import CssEditor from 'components/CssEditor'
import { uploadImage } from 'api/supabase'

function App() {
  const ref = useRef<MDXEditorMethods>(null)
  const [cssString, setCssString] = useState(defCssString)
  const [cssEditorOpen, setCssEditorOpen] = useState(false)

  const markdown = `
  # Items

  * Item 1
  * Item 2
  * Item 3
    * nested item
  
  ---

  ## More Items

  1. Item 1
  2. Item 2
`

  return (
    <>
      <style>{cssString}</style>
      <MDXEditor
        ref={ref}
        contentEditableClassName='awesome-editor'
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          codeBlockPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          thematicBreakPlugin(),
          tablePlugin(),
          imagePlugin({
            imageUploadHandler: uploadImage,
          }),
          diffSourcePlugin({ diffMarkdown: 'An older version', viewMode: 'rich-text' }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <CodeToggle />
                  <CreateLink />
                  <InsertTable />
                  <InsertImage />
                </DiffSourceToggleWrapper>
                <button onClick={() => setCssEditorOpen(true)}>CSS</button>
                <PdfExportButton
                  getMarkdown={() => ref.current?.getMarkdown() ?? ''}
                  css={cssString}
                />
              </>
            ),
          }),
        ]}
      />
      <CssEditor
        key={cssString}
        open={cssEditorOpen}
        css={cssString}
        onCssChange={(newCssString) => {
          // workaround to override MDX richtext editor predefined styles
          setCssString(
            newCssString.replaceAll('body {', 'body, body .mdxeditor-rich-text-editor {'),
          )
          setCssEditorOpen(false)
        }}
      />
    </>
  )
}

export default App
