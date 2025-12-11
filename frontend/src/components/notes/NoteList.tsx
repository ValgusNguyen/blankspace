import NoteListItem from "./NoteListItem";
import { Note } from "@/types/note";
import { UUIDTypes } from "uuid";

const NoteList = ({
  notes,
  currentNoteId,
  onSelectNote,
  onDeleteNote,
  onUpdateNote,
}: {
  notes: Note[];
  currentNoteId: UUIDTypes | null;
  onSelectNote: (id: UUIDTypes) => void;
  onDeleteNote: (id: UUIDTypes) => void;
  onUpdateNote: (id: UUIDTypes, updates: Partial<Omit<Note, "id">>) => void;
}) => {
  return (
    <nav className="flex-1 overflow-y-auto">
      <ul>
        {notes.map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            isActive={currentNoteId === note.id}
            onSelect={() => onSelectNote(note.id)}
            onDelete={() => onDeleteNote(note.id)}
            onUpdateNote={onUpdateNote}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NoteList;
