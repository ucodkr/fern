/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyExtension, EditorContent, useEditor } from '@tiptap/react'
import { useRef } from 'react'

import { LinkMenu } from '@/components/menus'

import '@/styles/index.css'

import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu'
import { ColumnsMenu } from '@/extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'
import { TextMenu } from '../menus/TextMenu'
import { ContentItemMenu } from '../menus/ContentItemMenu'

import { ExtensionKit } from '@/extensions/extension-kit'
import { cn } from '@/lib/utils'
import CustomBlock from '@/custom/CustomBlock'
import InlineInput from '@/custom/InlineInput'
export const BlockEditor = ({
  initialContent,
  className
}: {
  initialContent?: any
  className?: string
}) => {
  const menuContainerRef = useRef(null)

  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: ctx => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(initialContent)
          ctx.editor.commands.focus('start', { scrollIntoView: true })
        }
      },
      extensions: [
        ...ExtensionKit({}),
        CustomBlock,
        InlineInput,


      ].filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [],
  )

  return (

    <div className={cn("ucodkr-fern border border-cyan-600 relative flex flex-col flex-1 h-full overflow-hidden", className)} ref={menuContainerRef}>
      <button onClick={() => editor.commands.insertCustomBlock()}>
        블록 추가
      </button>

      <button onClick={() => {
        console.log("input...")
        editor.commands.insertInlineInput()
      }}>
        인라인 입력 추가
      </button>

      <EditorContent editor={editor} className="border flex-1 overflow-y-auto" />
      <ContentItemMenu editor={editor} />
      <LinkMenu editor={editor} appendTo={menuContainerRef} />
      <TextMenu editor={editor} />
      <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
      <TableRowMenu editor={editor} appendTo={menuContainerRef} />
      <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
    </div>
  )
}

export default BlockEditor
