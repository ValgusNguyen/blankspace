import React from "react";
import { SquarePen, Trash } from "lucide-react";

interface NoteActionsProps {
  noteTitle: string;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteActions = ({ noteTitle, onEdit, onDelete }: NoteActionsProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className="flex gap-2">
      <button
        aria-label={`Edit ${noteTitle}`}
        className="text-gray-400 hover:text-blue-600 cursor-pointer"
        onClick={handleEdit}
      >
        <SquarePen />
      </button>
      <button
        aria-label={`Delete ${noteTitle}`}
        className="text-gray-400 hover:text-red-600 cursor-pointer"
        onClick={handleDelete}
      >
        <Trash />
      </button>
    </div>
  );
};

export default NoteActions;
