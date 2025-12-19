import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

export const NoteEditorContent = ({ content }: { content: string }) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    editorProps: {
      attributes: {
        class: "prose flex-1 focus:outline-none",
      },
    },
    content,
    immediatelyRender: false,
  });

  return (
    <EditorContent className="flex-1 flex justify-center" editor={editor} />
  );
};
