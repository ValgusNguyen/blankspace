import NoteListItem from "./NoteListItem";
import { Note } from "@/types/note";
import { UUIDTypes } from "uuid";

interface NoteListProps {
  notes: Note[];
  currentNoteId: UUIDTypes | null;
  editingNoteId: UUIDTypes | null;
  editedTitle: string;
  onSelectNote: (id: UUIDTypes) => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: UUIDTypes) => void;
  onTitleChange: (title: string) => void;
  onSaveTitle: () => void;
  onCancelEdit: () => void;
}

const NoteList = ({
  notes,
  currentNoteId,
  editingNoteId,
  editedTitle,
  onSelectNote,
  onEditNote,
  onDeleteNote,
  onTitleChange,
  onSaveTitle,
  onCancelEdit,
}: NoteListProps) => {
  return (
    <nav className="flex-1 overflow-y-auto">
      <ul>
        {notes.map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            isActive={currentNoteId === note.id}
            isEditing={editingNoteId === note.id}
            editedTitle={editedTitle}
            onSelect={() => onSelectNote(note.id)}
            onEdit={() => onEditNote(note)}
            onDelete={() => onDeleteNote(note.id)}
            onTitleChange={onTitleChange}
            onSaveTitle={onSaveTitle}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NoteList;
