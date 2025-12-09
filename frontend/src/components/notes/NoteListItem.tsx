import { Note } from "@/types/note";
import { DateTime } from "luxon";
import NoteListItemDisplay from "./NoteListItemDisplay";
import NoteListItemEditor from "./NoteListItemEditor";

interface NoteListItemProps {
  note: Note;
  isActive: boolean;
  isEditing: boolean;
  editedTitle: string;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onTitleChange: (title: string) => void;
  onSaveTitle: () => void;
  onCancelEdit: () => void;
}

const NoteListItem = ({
  note,
  isActive,
  isEditing,
  editedTitle,
  onSelect,
  onEdit,
  onDelete,
  onTitleChange,
  onSaveTitle,
  onCancelEdit,
}: NoteListItemProps) => {
  return (
    <li
      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
        isActive ? "bg-blue-50 border-l-4 border-l-blue-900" : ""
      }`}
      onClick={onSelect}
    >
      {isEditing ? (
        <NoteListItemEditor
          editedTitle={editedTitle}
          onTitleChange={onTitleChange}
          onSaveTitle={onSaveTitle}
          onCancelEdit={onCancelEdit}
        />
      ) : (
        <NoteListItemDisplay note={note} onEdit={onEdit} onDelete={onDelete} />
      )}
      <p className="text-xs text-gray-600">
        {DateTime.fromJSDate(note.updatedAt).toLocaleString()}
      </p>
    </li>
  );
};

export default NoteListItem;
