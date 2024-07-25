// src/Tiptap.tsx
import PropTypes from "prop-types";
import { Toolbar } from "@/components/Toolbar";
import {
  useEditor,
  EditorContent,
  //FloatingMenu,
  //BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";

// define your extension array
const extensions = [
  StarterKit.configure(),
  Heading.configure({
    class: "text-2xl font-bold",
    levels: [2],
  }),
];

//const content = "<p>Hello World!</p>";

const Tiptap = ({ description, onChange }) => {
  const editor = useEditor({
    extensions,
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input bg-back",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      {/*<EditorContent editor={editor} /> */}
      {/*<FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
      {/*<BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

Tiptap.propTypes = {
  description: PropTypes.string, // Assuming description is expected to be a string
  onChange: PropTypes.func, // Assuming onChange is a function
};

export default Tiptap;
