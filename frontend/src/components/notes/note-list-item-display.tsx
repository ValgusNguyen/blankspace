import { Note } from "@/types/note";
import NoteActions from "./note-actions";

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
  );
};

export default NoteListItemDisplay;
