import type { Note } from "@/types/note";
import { NoteEditorHeader } from "./note-editor-header";
import { NoteEditorContent } from "./note-editor-content";

const NoteEditor = ({ note }: { note: Note }) => {
  return (
    <main className="m-4 flex-1">
      <div className="flex h-full flex-col gap-4">
        <NoteEditorHeader note={note} />
        <NoteEditorContent content={note.content} />
      </div>
    </main>
  );
};

export default NoteEditor;
