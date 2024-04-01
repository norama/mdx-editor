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
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './App.css'

function App() {
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
      className='dark-theme dark-editor'
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
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <CodeToggle />
              <CreateLink />
              <InsertTable />
              <InsertImage />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
    />
  )
}

export default App
