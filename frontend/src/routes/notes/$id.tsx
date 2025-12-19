import { mockNotes } from "@/data/mock-notes";
import NoteEditor from "@/components/notes/note-editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/$id")({
  component: NotePage,
  loader: ({ params: { id } }) => {
    return mockNotes.find((n) => n.id === id);
  },
});

function NotePage() {
  const note = Route.useLoaderData();
  if (!note) {
    return (
      <span>
        Bros why are you even here? Yeah it's the bug in the mocking just
        temporary
      </span>
    );
  }

  return <NoteEditor key={note.id} note={note} />;
}
