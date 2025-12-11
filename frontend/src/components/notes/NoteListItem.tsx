import { Note } from "@/types/note";
import { DateTime } from "luxon";
import { useState } from "react";
import { UUIDTypes } from "uuid";
import NoteListItemDisplay from "./NoteListItemDisplay";
import NoteListItemEditor from "./NoteListItemEditor";

interface NoteListItemProps {
  note: Note;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onUpdateNote: (id: UUIDTypes, updates: Partial<Omit<Note, "id">>) => void;
}

const NoteListItem = ({
  note,
  isActive,
  onSelect,
  onDelete,
  onUpdateNote,
}: NoteListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);

  const handleSaveTitle = () => {
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle) {
      alert("Please enter a note title!");
      return;
    }

    if (trimmedTitle !== note.title) {
      onUpdateNote(note.id, { title: trimmedTitle });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(note.title);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

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
          onTitleChange={setEditedTitle}
          onSaveTitle={handleSaveTitle}
          onCancelEdit={handleCancelEdit}
        />
      ) : (
        <NoteListItemDisplay
          note={note}
          onEdit={handleEdit}
          onDelete={onDelete}
        />
      )}
      <p className="text-xs text-gray-600">
        {DateTime.fromJSDate(note.updatedAt).toLocaleString()}
      </p>
    </li>
  );
};

export default NoteListItem;
