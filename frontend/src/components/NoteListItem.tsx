import { Note } from "@/types/note";
import { DateTime } from "luxon";
import { memo } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

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
}: {
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
}) => {
  return (
    <li
      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
        isActive ? "bg-blue-50 border-l-4 border-l-blue-900" : ""
      }`}
      onClick={onSelect}
    >
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            onBlur={onSaveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSaveTitle();
              if (e.key === "Escape") onCancelEdit();
            }}
            className="flex-1 px-1 py-0.5 border border-gray-400 rounded outline-none text-sm"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : (
        <div className="flex justify-between items-center group">
          <h3 className="font-medium mb-2">{note.title}</h3>
          <div className="flex gap-2">
            <button
              aria-label={`Edit ${note.title}`}
              className="text-gray-400 hover:text-blue-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <LuPencil />
            </button>
            <button
              aria-label={`Delete ${note.title}`}
              className="text-gray-400 hover:text-red-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <LuTrash2 />
            </button>
          </div>
        </div>
      )}
      <p className="text-xs text-gray-600">
        {DateTime.fromJSDate(note.updatedAt).toLocaleString()}
      </p>
    </li>
  );
};

export default memo(NoteListItem);
