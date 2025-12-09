"use client";
import NoteListItem from "@/components/NoteListItem";
import mockNotes from "@/data/mockNotes";
import { useNotes } from "@/hooks/useNote";
import { Note } from "@/types/note";
import { useEffect, useRef, useState } from "react";
import { useAutosave } from "react-autosave";
import { LuFilePlus } from "react-icons/lu";
import { UUIDTypes } from "uuid";

const NotesApp = () => {
  const {
    notes,
    currentNote,
    currentNoteId,
    setCurrentNoteId,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes(mockNotes);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [editingNoteId, setEditingNoteId] = useState<UUIDTypes | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [shouldFocus, setShouldFocus] = useState(false);
  const [noteContent, setNoteContent] = useState(currentNote?.content ?? "");

  useAutosave({
    data: noteContent,
    onSave: (newContent) => {
      if (currentNoteId && newContent !== currentNote?.content) {
        updateNote(currentNoteId, { content: newContent });
      }
    },
  });

  useEffect(() => {
    if (currentNote) {
      setNoteContent(currentNote.content);
    }
  }, [currentNote]);

  useEffect(() => {
    if (shouldFocus && textAreaRef.current) {
      textAreaRef.current.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus, currentNoteId]);

  const handleNewNote = () => {
    createNote();
    setShouldFocus(true);
  };

  const handleEditTitle = (note: Note) => {
    setEditingNoteId(note.id);
    setEditedTitle(note.title);
  };

  const handleSaveTitle = () => {
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle) {
      alert("Please enter a note title!");
      return;
    }

    if (editingNoteId) {
      updateNote(editingNoteId, { title: trimmedTitle });
      setEditingNoteId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
  };

  if (!currentNote) {
    return (
      <div className="flex h-screen items-center justify-center">
        No notes available
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-200 flex flex-col">
        {/* New Note Button */}
        <header className="p-4 border-b border-gray-200">
          <button
            onClick={handleNewNote}
            className="flex items-center cursor-pointer justify-center w-full bg-green-400 text-black p-4 rounded-lg hover:bg-green-500 transition"
            aria-label="Create new note"
          >
            <LuFilePlus className="text-xl" />
            <span className="pl-1.5">Note</span>
          </button>
        </header>

        {/* Notes List */}
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {notes.map((note) => (
              <NoteListItem
                key={note.id}
                note={note}
                isActive={currentNoteId === note.id}
                isEditing={editingNoteId === note.id}
                editedTitle={editedTitle}
                onSelect={() => setCurrentNoteId(note.id)}
                onEdit={() => handleEditTitle(note)}
                onDelete={() => deleteNote(note.id)}
                onTitleChange={setEditedTitle}
                onSaveTitle={handleSaveTitle}
                onCancelEdit={handleCancelEdit}
              />
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <textarea
          ref={textAreaRef}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full h-full outline-none resize-none text-sm leading-relaxed"
          placeholder="Start typing your note..."
          aria-label="Note content"
        />
      </main>
    </div>
  );
};

export default NotesApp;
