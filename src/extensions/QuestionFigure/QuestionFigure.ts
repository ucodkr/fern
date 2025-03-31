import { mergeAttributes } from '@tiptap/core'
import { Figure } from '../Figure'
import { Question } from './Question'
import { Answer } from './Answer'

declare module '@tiptap/core' {
  // eslint-disable-next-line no-unused-vars
  interface Commands<ReturnType> {
    questionFigure: {
      setQuestion: () => ReturnType
    }
  }
}

export const QuestionFigure = Figure.extend({
  name: 'questionFigure',

  group: 'block',

  content: 'question answer',

  isolating: true,

  addExtensions () {
    return [Question, Answer]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['figure', mergeAttributes(HTMLAttributes, { 'data-type': this.name }), ['div', {}, 0]]
  },

  addKeyboardShortcuts () {
    return {
      Enter: () => false,
    }
  },

  addAttributes () {
    return {
      ...this.parent?.(),
    }
  },

  addCommands () {
    return {
      setQuestion:
        () =>
          ({ state, chain }) => {
            const position = state.selection.$from.start()
            const selectionContent = state.selection.content()

            return chain()
              .focus()
              .insertContent({
                type: this.name,
                content: [
                  {
                    type: 'question',
                    content: selectionContent.content.toJSON() || [
                      {
                        type: 'paragraph',
                        attrs: {
                          textAlign: 'left',
                          class: "p-2 border "
                        },
                      },
                    ],
                  },

                  {
                    type: 'answer',
                  },

                ],
              })
              .focus(position + 1)
              .run()
          },
    }
  },
})

export default QuestionFigure
