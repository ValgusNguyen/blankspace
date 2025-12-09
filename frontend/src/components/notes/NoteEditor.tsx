import React from "react";

interface NoteEditorProps {
  noteContent: string;
  onContentChange: (content: string) => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const NoteEditor = ({
  noteContent,
  onContentChange,
  textAreaRef,
}: NoteEditorProps) => {
  return (
    <main className="flex-1 p-6">
      <textarea
        ref={textAreaRef}
        value={noteContent}
        onChange={(e) => onContentChange(e.target.value)}
        className="w-full h-full outline-none resize-none text-sm leading-relaxed"
        placeholder="Start typing your note..."
        aria-label="Note content"
      />
    </main>
  );
};

export default NoteEditor;
