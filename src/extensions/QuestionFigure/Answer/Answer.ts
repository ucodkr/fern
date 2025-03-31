import { mergeAttributes, Node } from '@tiptap/core'

const NAME = "answer"
export const Answer = Node.create({
  name: NAME,

  group: 'block',

  content: 'text*',

  defining: true,

  isolating: true,

  parseHTML () {
    return [
      {
        tag: `div[data-type='${NAME}']`
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [NAME, mergeAttributes(HTMLAttributes, { class: "bord", "data-type": NAME }), 0]
  },

  addKeyboardShortcuts () {
    return {
      // On Enter at the end of line, create new paragraph and focus
      Enter: ({ editor }) => {
        const {
          state: {
            selection: { $from, empty },
          },
        } = editor

        if (!empty || $from.parent.type !== this.type) {
          return false
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2

        if (!isAtEnd) {
          return false
        }

        const pos = editor.state.selection.$from.end()

        return editor.chain().focus(pos).insertContentAt(pos, { type: 'paragraph' }).run()
      },
    }
  },
})

export default Answer
