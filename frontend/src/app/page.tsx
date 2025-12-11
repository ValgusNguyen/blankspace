"use client";
import NoteEditor from "@/components/notes/NoteEditor";
import Sidebar from "@/components/notes/Sidebar";
import mockNotes from "@/data/mockNotes";
import { useNotes } from "@/hooks/useNote";

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

  const handleNewNote = () => {
    createNote();
  };

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar
        notes={notes}
        currentNoteId={currentNoteId}
        onNewNote={handleNewNote}
        onSelectNote={setCurrentNoteId}
        onDeleteNote={deleteNote}
        onUpdateNote={updateNote}
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
