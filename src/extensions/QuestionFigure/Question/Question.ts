import { Node } from '@tiptap/core'

export const Question = Node.create({
  name: 'question',

  content: 'paragraph+',

  defining: true,

  marks: '',

  parseHTML () {
    return [
      {
        tag: 'qestion',
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['question', HTMLAttributes, 0]
  },

  addKeyboardShortcuts () {
    return {
      Backspace: () => false,
    }
  },
})

export default Question
