import { mockNotes } from "@/data/mock-notes";
import { redirect } from "next/navigation";

export default function NotesPage() {
  const notes = mockNotes;

  if (notes.length > 0) {
    redirect(`/notes/${notes[0].id}`);
  }

  return <main className="flex-1 p-6 text-gray-500">No notes yet</main>;
}
