import { mergeAttributes, Node } from '@tiptap/core'

const NAME = "question"
export const Question = Node.create({
  name: NAME,

  content: 'paragraph+',

  defining: true,

  marks: '',

  parseHTML () {
    return [
      {
        tag: `div[data-type='${NAME}']`
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [NAME, mergeAttributes(HTMLAttributes, { class: "border1", "data-type": NAME }), 0]
  },

  addKeyboardShortcuts () {
    return {
      Backspace: () => false,
    }
  },
})

export default Question
