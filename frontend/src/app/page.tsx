"use client";
import mockNotes from "@/data/mockNotes";
import { DateTime } from "luxon";
import { useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { UUIDTypes, v7 as uuidv7 } from "uuid";

type Note = {
  id: UUIDTypes;
  title: string;
  date: Date;
  content: string;
};

const NotesApp = () => {
  const [notes, setNotes] = useState(mockNotes);

  const [selectedNoteTitle, setSelectedNoteTitle] = useState(notes[0].title);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [editedNoteId, setEditedNoteId] = useState<UUIDTypes | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const currentNote =
    notes.find((note) => note.title === selectedNoteTitle) || notes[0];

  const handleContentChange = (newContent: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.title === selectedNoteTitle
          ? { ...note, content: newContent }
          : note,
      ),
    );
  };

  const handleNewNote = () => {
    const newNote = {
      id: uuidv7(),
      title: "Untitiled",
      date: DateTime.now().toJSDate(),
      content: "",
    };

    setNotes([newNote, ...notes]);
    setSelectedNoteTitle(newNote.title);

    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleDeleteNote = () => {
    if (notes.length === 1) {
      alert("Cannot delete the last note!");
      return;
    }

    const updatedNotes = notes.filter(
      (note) => note.title !== selectedNoteTitle,
    );
    setNotes(updatedNotes);
    setSelectedNoteTitle(updatedNotes[0].title);
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

    setSelectedNoteTitle(trimmedTitle);
    setEditedNoteId(null);
  };

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* New Note Button */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleNewNote}
            className="flex items-center cursor-pointer justify-center w-full bg-[#ca8f75] text-black py-2 px-4 rounded-lg hover:bg-[#9e664e] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CiCirclePlus className="text-xl" />
            <h2 className="pl-1.5">Create New Note</h2>
          </button>
        </div>

        {/* Selected Note Actions */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="text-xs font-medium text-gray-500 mb-2">
            Selected Note
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteNote}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-red-600 bg-white border border-red-300 rounded hover:bg-red-50 cursor-pointer"
            >
              <MdDelete />
              <span>Delete</span>
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Last edited:
            {DateTime.fromJSDate(currentNote.date).toLocaleString()}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedNoteTitle === note.title
                  ? "bg-blue-50 border-l-4 border-l-blue-900"
                  : ""
              }`}
              onClick={() => setSelectedNoteTitle(note.title)}
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
                <div className="flex justify-between items-center">
                  <h3 className="font-medium mb-2">{note.title}</h3>
                  <FiEdit2
                    className="text-gray-400 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTitle(note);
                    }}
                  />
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
