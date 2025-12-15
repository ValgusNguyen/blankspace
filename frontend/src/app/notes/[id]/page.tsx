import { mockNotes } from "@/data/mock-notes";
import NoteEditor from "@/components/notes/note-editor";
import { Note } from "@/types/note";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = mockNotes.find((n) => n.id === id) as Note;

  return <NoteEditor note={note} />;
}
