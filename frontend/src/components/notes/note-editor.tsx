"use client";

import { Note } from "@/types/note";
import { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";

const NoteEditor = ({ note }: { note: Note }) => {
  const [content, setContent] = useState(note.content);

  return (
    <main className="flex-1 p-6">
      <SidebarTrigger />
      <h1>{note.title}</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-full outline-none resize-none text-sm leading-relaxed"
        placeholder="Start typing your note..."
        aria-label="Note content"
      />
    </main>
  );
};

export default NoteEditor;
