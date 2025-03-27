import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    inlineInput: {
      insertInlineInput: (size: string) => ReturnType
    }
  }
}
const InlineInput = Node.create({
  name: "inlineInput",
  group: "inline", // 🔥 인라인 요소 (줄바꿈 없음)
  inline: true,
  atom: true,

  parseHTML () {
    return [{ tag: "div[data-type='inlineInput']" }];
  },

  renderHTML () {
    return ["div", { "data-type": "inlineInput" }, 0];
  },

  addCommands () {
    return {
      insertInlineInput:
        () =>
          ({ chain }) => {
            return chain().insertContent({ type: "inlineInput" }).focus().run();
          },
    };
  },

  addNodeView () {
    return ReactNodeViewRenderer(InlineInputView);
  },
});

const InlineInputView = () => {
  const [value, setValue] = useState("");

  return (
    <NodeViewWrapper>
      <input
        type="text"
        className="border px-2 text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </NodeViewWrapper>
  );
};

export default InlineInput;
