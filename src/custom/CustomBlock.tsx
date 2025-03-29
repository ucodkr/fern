/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customBlock: {
      insertCustomBlock: (size: string) => ReturnType
    }
  }
}
const CustomBlockView = ({ node }) => {

  console.log(node.content);
  return (
    <NodeViewWrapper
      as="div"
      className="border p-2"
      style={{
        display: "inline-block",   // 블록 요소로 줄바꿈 없이 표시
        whiteSpace: "nowrap",      // 공백을 자동으로 줄바꿈하지 않도록 설정
      }}
    >
      {node.content?.content.map((con: any) => con)}

    </NodeViewWrapper>
  );
};

const CustomBlock = Node.create({
  name: "customBlock",
  group: "block",
  content: "inline*",  // 🔥 인라인 요소 허용 (bold, italic 등)
  inline: false,
  atom: false,

  parseHTML () {
    return [{ tag: "div[data-type='customBlock']" }];
  },

  renderHTML ({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, {
      "data-type": "customBlock",
      class: "border rounded-lg  flex"
    }), 0];
  },
  // addNodeView () {
  //   return ReactNodeViewRenderer(CustomBlockView);  // CustomBlockView와 연결
  // },
  addCommands () {
    return {
      insertCustomBlock:
        () =>
          ({ commands }) => {
            return commands.insertContent({
              type: "customBlock",
              content: [{ type: "text", text: "이곳에 입력하세요." }],
            });
          },
    };
  },
});

export default CustomBlock;
