import type { Note } from "@/types/note";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-toggle";

const NoteEditor = ({ note }: { note: Note }) => {
  const [content, setContent] = useState(note.content);

  return (
    <main className="m-4 flex-1">
      <div className="flex flex-col gap-4">
        <div className="flex">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span>{note.title}</span>
          </div>
          <ModeToggle />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 outline-none resize-none text-sm leading-relaxed"
          placeholder="Start typing your note..."
          aria-label="Note content"
        />
      </div>
    </main>
  );
};

export default NoteEditor;
