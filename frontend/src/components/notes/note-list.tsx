import { NoteListItem } from "@/components/notes/note-list-item";
import { Note } from "@/types/note";

export const NoteList = ({ notes }: { notes: Note[] }) => {
  return (
    <nav className="flex-1 overflow-y-auto">
      <ul>
        {notes.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </ul>
    </nav>
  );
};
