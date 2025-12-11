"use client";
import NoteEditor from "@/components/notes/NoteEditor";
import Sidebar from "@/components/notes/Sidebar";
import mockNotes from "@/data/mockNotes";
import { useNotes } from "@/hooks/useNote";
import { Note } from "@/types/note";
import { useState } from "react";
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

  const [editingNoteId, setEditingNoteId] = useState<UUIDTypes | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleNewNote = () => {
    createNote();
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

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar
        notes={notes}
        currentNoteId={currentNoteId}
        editingNoteId={editingNoteId}
        editedTitle={editedTitle}
        onNewNote={handleNewNote}
        onSelectNote={setCurrentNoteId}
        onEditNote={handleEditTitle}
        onDeleteNote={deleteNote}
        onTitleChange={setEditedTitle}
        onSaveTitle={handleSaveTitle}
        onCancelEdit={handleCancelEdit}
      />

      {currentNote ? (
        <NoteEditor
          currentContent={currentNote.content}
          currentNoteId={currentNoteId}
          updateNote={updateNote}
        />
      ) : (
        <main className="flex-1 p-6 flex items-center justify-center text-center text-gray-500">
          <div>
            <h1 className="text-2xl font-semibold">No note selected</h1>
            <p>
              Select a note from the list or create a new one to get started.
            </p>
          </div>
        </main>
      )}
    </div>
  );
};

export default NotesApp;
