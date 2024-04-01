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
import './themes/custom.css'
import cssString from './themes/custom.css?raw'
import PdfExportButton from './components/PdfExportButton'
import { useRef } from 'react'

function App() {
  const ref = useRef<MDXEditorMethods>(null)

  const markdown = `
  # Items

  * Item 1
  * Item 2
  * Item 3
    * nested item
  
  ---

  1. Item 1
  2. Item 2
`

  return (
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
          imageUploadHandler: () => {
            return Promise.resolve('https://picsum.photos/200/300')
          },
          imageAutocompleteSuggestions: [
            'https://picsum.photos/200/300',
            'https://picsum.photos/200',
          ],
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
              <PdfExportButton
                getMarkdown={() => ref.current?.getMarkdown() ?? ''}
                css={cssString}
              />
            </>
          ),
        }),
      ]}
    />
  )
}

export default App
