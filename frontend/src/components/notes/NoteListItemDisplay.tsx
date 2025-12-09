import { Note } from "@/types/note";
import NoteActions from "./NoteActions";

interface NoteListItemDisplayProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteListItemDisplay = ({
  note,
  onEdit,
  onDelete,
}: NoteListItemDisplayProps) => {
  return (
    <div className="flex justify-between items-center group">
      <h3 className="font-medium mb-2">{note.title}</h3>
      <NoteActions noteTitle={note.title} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default NoteListItemDisplay;
