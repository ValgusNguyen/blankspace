"use client";
import NoteEditor from "@/components/notes/NoteEditor";
import Sidebar from "@/components/notes/Sidebar";
import mockNotes from "@/data/mockNotes";
import { useNotes } from "@/hooks/useNote";
import { Note } from "@/types/note";
import { useEffect, useRef, useState } from "react";
import { useAutosave } from "react-autosave";
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

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<UUIDTypes | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [shouldFocus, setShouldFocus] = useState(false);
  const [noteContent, setNoteContent] = useState("");

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
    } else {
      setNoteContent("");
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
          textAreaRef={textAreaRef}
          noteContent={noteContent}
          onContentChange={setNoteContent}
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
