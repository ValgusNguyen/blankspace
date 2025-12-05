"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineSpaceBar, MdDelete } from "react-icons/md";
import { VscTelescope } from "react-icons/vsc";
import { PiNotePencil } from "react-icons/pi";
import { CiCirclePlus, CiTimer } from "react-icons/ci";
import { HiOutlineTag } from "react-icons/hi";
import { unknown } from "zod";

const NotesApp = () => {
  const [selectedNote, setSelectedNote] = useState(
    "React Performance Optimization",
  );
  const [isEditing, setIsEditing] = useState(false);

  const notes = [
    {
      title: "Japan Travel Planning",
      tags: ["Travel", "Personal"],
      date: "28 Oct 2025",
      content: "Planning trip to Japan...",
    },
    {
      title: "Japan Travel Planning",
      tags: ["Travel", "Personal"],
      date: "28 Oct 2025",
      content: "Planning trip to Japan...",
    },
    {
      title: "Japan Travel Planning",
      tags: ["Travel", "Personal"],
      date: "28 Oct 2025",
      content: "Planning trip to Japan...",
    },
    {
      title: "Japan Travel Planning",
      tags: ["Travel", "Personal"],
      date: "28 Oct 2025",
      content: "Planning trip to Japan...",
    },
  ];

  const [currentNote, setCurrentNote] = useState(
    notes.find((note) => note.title === selectedNote) || notes[0]
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-100 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <VscTelescope className="pt-0 mb-1.5 text-2xl rounded bg-blue-200" />
            <span className="font-semibold text-2xl text-gray-900 pt-0.3">
              BlankSpace
            </span>
          </div>
          <div className="items-center text-gray-700 mb-2 cursor-pointer">
            <div className="p-4 border-b border-gray-200">
              <div className="flex pt-2 mb-0 pb-0 mt-2 ">
                <PiNotePencil className="text-l" />
                <h1 className="text-center font-medium text-black text-l pl-2.5">
                  All Notes
                </h1>
              </div>
            </div>
            <div className="overflow-y-auto mt-0 pt-0 ">
              {notes.map((note) => (
                <div
                  key={note.title}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedNote === note.title
                      ? "bg-blue-50 border-l-4 border-l-blue-900"
                      : ""
                  }`}
                  onClick={() => setSelectedNote(note.title)}
                >
                  <h3 className="font-medium text-gray-900 mb-2">
                    {note.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{note.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by title, content, or tags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-3 ml-4">
              <button className="flex items-center bg-[#7c96c3] text-white py-2 px-4 rounded-lg hover:bg-[#592d2d] transition">
                <CiCirclePlus className="pb-0.5" />
                <h2 className="pl-1.5">Create New Note</h2>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="p-6 bg-white border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {currentNote.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <HiOutlineTag />
                  <span>Tags</span>
                  <div className="flex gap-1 ml-2">
                    {currentNote.tags.map((tag) => (
                      <span key={tag} className="text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <CiTimer />
                  <span>Last edited</span>
                  <span className="text-gray-700">{currentNote.date}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded border">
                  <span>sticker</span>
                  Archive Note
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded border">
                  <MdDelete />
                  Delete Note
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 bg-gray-50">
              <div className="bg-white rounded-lg p-6 h-full">
                <textarea
                  value={currentNote.content}
                  onChange={(e) =>
                    setCurrentNote({ ...currentNote, content: e.target.value })
                  }
                  className="w-full h-full outline-none resize-none text-gray-800 font-sans text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
