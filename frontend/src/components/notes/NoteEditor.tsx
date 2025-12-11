import { Note } from "@/types/note";
import { useEffect, useState } from "react";
import { useAutosave } from "react-autosave";
import { UUIDTypes } from "uuid";

const NoteEditor = ({
  currentContent,
  currentNoteId,
  updateNote,
}: {
  currentContent: string;
  currentNoteId: UUIDTypes | null;
  updateNote: (id: UUIDTypes, updates: Partial<Omit<Note, "id">>) => void;
}) => {
  const [noteContent, setNoteContent] = useState(currentContent);

  useEffect(() => {
    setNoteContent(currentContent);
  }, [currentContent]);

  useAutosave({
    data: noteContent,
    onSave: () => {
      if (currentNoteId) {
        updateNote(currentNoteId, { content: noteContent });
      }
    },
  });

  return (
    <main className="flex-1 p-6">
      <textarea
        value={noteContent}
        onChange={(e) => {
          setNoteContent(e.target.value);
        }}
        onBlur={() => {
          if (currentNoteId) {
            updateNote(currentNoteId, { content: noteContent });
          }
        }}
        className="w-full h-full outline-none resize-none text-sm leading-relaxed"
        placeholder="Start typing your note..."
        aria-label="Note content"
      />
    </main>
  );
};

export default NoteEditor;
