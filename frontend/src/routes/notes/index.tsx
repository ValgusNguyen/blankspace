import { mockNotes } from "@/data/mock-notes";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/")({
  loader: () => {
    throw redirect({
      to: "/notes/$id",
      params: mockNotes[0],
    });
  },
});
