import { Note } from "@/types/note";
import { UUIDTypes } from "uuid";
import NoteList from "./NoteList";
import SidebarHeader from "./SidebarHeader";

interface SidebarProps {
  notes: Note[];
  currentNoteId: UUIDTypes | null;
  editingNoteId: UUIDTypes | null;
  editedTitle: string;
  onNewNote: () => void;
  onSelectNote: (id: UUIDTypes) => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: UUIDTypes) => void;
  onTitleChange: (title: string) => void;
  onSaveTitle: () => void;
  onCancelEdit: () => void;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <aside className="w-80 border-r border-gray-200 flex flex-col">
      <SidebarHeader onNewNote={props.onNewNote} />
      <NoteList
        notes={props.notes}
        currentNoteId={props.currentNoteId}
        editingNoteId={props.editingNoteId}
        editedTitle={props.editedTitle}
        onSelectNote={props.onSelectNote}
        onEditNote={props.onEditNote}
        onDeleteNote={props.onDeleteNote}
        onTitleChange={props.onTitleChange}
        onSaveTitle={props.onSaveTitle}
        onCancelEdit={props.onCancelEdit}
      />
    </aside>
  );
};

export default Sidebar;
