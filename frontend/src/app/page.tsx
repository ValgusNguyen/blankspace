"use client";
import mockNotes from "@/data/mockNotes";
import { DateTime } from "luxon";
import { useRef, useState } from "react";
import { LuFilePlus, LuPencil, LuTrash2 } from "react-icons/lu";
import { UUIDTypes, v7 as uuidv7 } from "uuid";

type Note = {
  id: UUIDTypes;
  title: string;
  date: Date;
  content: string;
};

const NotesApp = () => {
  const [notes, setNotes] = useState(mockNotes);

  const [currentNote, setCurrentNote] = useState(notes[0]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [editedNoteId, setEditedNoteId] = useState<UUIDTypes | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleContentChange = (newContent: string) => {
    const updatedNote = { ...currentNote, content: newContent };

    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        return note.id === currentNote.id ? updatedNote : note;
      }),
    );

    setCurrentNote(updatedNote);
  };

  const handleNewNote = () => {
    const newNote = {
      id: uuidv7(),
      title: "Untitiled",
      date: DateTime.now().toJSDate(),
      content: "",
    };

    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);

    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleEditTitle = (note: Note) => {
    setEditedNoteId(note.id);
    setEditedTitle(note.title);
  };

  const handleSaveTitle = () => {
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle) {
      alert("Please enter a note title!");
      return;
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editedNoteId ? { ...note, title: trimmedTitle } : note,
      ),
    );

    setEditedNoteId(null);
  };

  const handleDeleteNote = (noteId: UUIDTypes) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

    if (currentNote.id === noteId && notes.length > 1) {
      const remainingNotes = notes.filter((note) => note.id !== noteId);
      setCurrentNote(remainingNotes[0]);
    }
  };

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* New Note Button */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleNewNote}
            className="flex items-center cursor-pointer justify-center w-full bg-green-400 text-black p-4 rounded-lg hover:bg-green-500 transition"
          >
            <LuFilePlus className="text-xl" />
            <h2 className="pl-1.5">Note</h2>
          </button>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                currentNote.id === note.id
                  ? "bg-blue-50 border-l-4 border-l-blue-900"
                  : ""
              }`}
              onClick={() => setCurrentNote(note)}
            >
              {editedNoteId === note.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveTitle();
                      if (e.key === "Escape") setEditedNoteId(null);
                    }}
                    className="flex-1 px-1 py-0.5 border border-gray-400 rounded outline-none text-sm"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ) : (
                <div className="flex justify-between items-center group">
                  <h3 className="font-medium mb-2">{note.title}</h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <LuPencil
                      className="text-gray-400 hover:text-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTitle(note);
                      }}
                    />
                    <LuTrash2
                      className="text-gray-400 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                    />
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-600">
                {DateTime.fromJSDate(note.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Just the textarea */}
      <div className="flex-1 p-6">
        <textarea
          ref={textAreaRef}
          value={currentNote.content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full h-full outline-none resize-none text-sm leading-relaxed"
          placeholder="Start typing your note..."
        />
      </div>
    </div>
  );
};

export default NotesApp;
