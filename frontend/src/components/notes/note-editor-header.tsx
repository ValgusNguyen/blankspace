import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-toggle";
import type { Note } from "@/types/note";

export const NoteEditorHeader = ({ note }: { note: Note }) => {
  return (
    <div className="flex">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 data-:h-4" />
        <span>{note.title}</span>
      </div>
      <ModeToggle />
    </div>
  );
};
