import { Note } from "@/types/note";
import { UUIDTypes } from "uuid";
import NoteList from "./NoteList";
import SidebarHeader from "./SidebarHeader";

interface SidebarProps {
  notes: Note[];
  currentNoteId: UUIDTypes | null;
  onNewNote: () => void;
  onSelectNote: (id: UUIDTypes) => void;
  onDeleteNote: (id: UUIDTypes) => void;
  onUpdateNote: (id: UUIDTypes, updates: Partial<Omit<Note, "id">>) => void;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <aside className="w-80 border-r border-gray-200 flex flex-col">
      <SidebarHeader onNewNote={props.onNewNote} />
      <NoteList
        notes={props.notes}
        currentNoteId={props.currentNoteId}
        onSelectNote={props.onSelectNote}
        onDeleteNote={props.onDeleteNote}
        onUpdateNote={props.onUpdateNote}
      />
    </aside>
  );
};

export default Sidebar;
