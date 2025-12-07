"use client";
import { TextareaHTMLAttributes, useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

const NotesApp = () => {
  const [notes, setNotes] = useState([
    {
      title: "Japan Travel",
      date: "28 Oct 2025",
      content: "Planning trip to Japan will happen for sure 🙃",
    },
    {
      title: "Project Alpha Kickoff Meeting Summary 🚀",
      date: "05 Dec 2025",
      content:
        "Key takeaways: MVP features finalized. Deadline is end of Q1. Need to schedule follow-up with backend team on API design.",
    },
    {
      title: "Grocery List for the Week 🍎",
      date: "07 Dec 2025",
      content:
        "Milk, eggs, whole-wheat bread, spinach, chicken breast, tomatoes, pasta. Don't forget the dark chocolate!",
    },
    {
      title: "React Hooks Memo: useEffect vs useLayoutEffect",
      date: "28 Nov 2025",
      content:
        "useEffect runs asynchronously after render and paint. useLayoutEffect runs synchronously after render but before paint. Use the latter for DOM measurements.",
    },
    {
      title: "Ideas for Next Vacation Destination 🏝️",
      date: "10 Oct 2025",
      content:
        "Considering Iceland (Northern Lights) or Thailand (beaches and food). Need to check flight prices for February.",
    },
    {
      title: "Book Recommendation: The Martian",
      date: "01 Dec 2025",
      content:
        "Andy Weir's book is a fantastic blend of science and survival. Highly recommend for a thrilling read.",
    },
  ]);

  const [selectedNoteTitle, setSelectedNoteTitle] = useState("Japan Travel");
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleCreateNote = () => {
    setIsCreatingNote(true);
    setNewNoteTitle("");
  };

  const handleSaveNewNote = () => {
    const trimmedTitle = newNoteTitle.trim();

    if (!trimmedTitle) {
      alert("Please enter a note title!");
      return;
    }

    if (notes.some((note) => note.title === trimmedTitle)) {
      alert("A note with this title already exists!");
      return;
    }

    const newNote = {
      title: trimmedTitle,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      content: "",
    };

    setNotes([newNote, ...notes]);
    setSelectedNoteTitle(newNote.title);
    setIsCreatingNote(false);
    setNewNoteTitle("");

    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleCancelNewNote = () => {
    setIsCreatingNote(false);
    setNewNoteTitle("");
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

  const handleEditTitle = () => {
    setIsEditingTitle(true);
    setEditedTitle(currentNote.title);
  };

  const handleSaveTitle = () => {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      alert("Please enter a note title!");
      return;
    }

    if (
      trimmedTitle !== currentNote.title &&
      notes.some((note) => note.title === trimmedTitle)
    ) {
      alert("A note with this title already exists!");
      return;
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.title === selectedNoteTitle
          ? { ...note, title: trimmedTitle }
          : note,
      ),
    );
    setSelectedNoteTitle(trimmedTitle);
    setIsEditingTitle(false);
  };

  const handleCancelEditTitle = () => {
    setIsEditingTitle(false);
    setEditedTitle("");
  };

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Create Note Button */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleCreateNote}
            disabled={isCreatingNote}
            className="flex items-center cursor-pointer justify-center w-full bg-[#ca8f75] text-black py-2 px-4 rounded-lg hover:bg-[#9e664e] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CiCirclePlus className="text-xl" />
            <h2 className="pl-1.5">Create New Note</h2>
          </button>
        </div>

        {/* Create Note Form */}
        {isCreatingNote && (
          <div className="p-4 border-b border-gray-200 bg-blue-50">
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveNewNote();
                if (e.key === "Escape") handleCancelNewNote();
              }}
              placeholder="Enter note title..."
              className="w-full px-3 py-2 border border-gray-300 rounded mb-2 outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveNewNote}
                className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={handleCancelNewNote}
                className="flex-1 px-3 py-1 text-sm bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Edit Title Form */}
        {isEditingTitle && (
          <div className="p-4 border-b border-gray-200 bg-green-50">
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Edit Title
            </label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTitle();
                if (e.key === "Escape") handleCancelEditTitle();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-2 outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveTitle}
                className="flex-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={handleCancelEditTitle}
                className="flex-1 px-3 py-1 text-sm bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Selected Note Actions */}
        {!isCreatingNote && !isEditingTitle && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="text-xs font-medium text-gray-500 mb-2">
              Selected Note
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditTitle}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                title="Edit title"
              >
                <FiEdit2 />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDeleteNote}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-red-600 bg-white border border-red-300 rounded hover:bg-red-50 cursor-pointer"
              >
                <MdDelete />
                <span>Delete</span>
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Last edited: {currentNote.date}
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.title}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedNoteTitle === note.title
                  ? "bg-blue-50 border-l-4 border-l-blue-900"
                  : ""
              }`}
              onClick={() => setSelectedNoteTitle(note.title)}
            >
              <h3 className="font-medium mb-2">{note.title}</h3>
              <p className="text-xs text-gray-600">{note.date}</p>
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
