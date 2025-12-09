import React from "react";

interface NoteListItemEditorProps {
  editedTitle: string;
  onTitleChange: (title: string) => void;
  onSaveTitle: () => void;
  onCancelEdit: () => void;
}

const NoteListItemEditor = ({
  editedTitle,
  onTitleChange,
  onSaveTitle,
  onCancelEdit,
}: NoteListItemEditorProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSaveTitle();
    if (e.key === "Escape") onCancelEdit();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        onBlur={onSaveTitle}
        onKeyDown={handleKeyDown}
        className="flex-1 px-1 py-0.5 border border-gray-400 rounded outline-none text-sm"
        autoFocus
        onClick={handleClick}
      />
    </div>
  );
};

export default NoteListItemEditor;
