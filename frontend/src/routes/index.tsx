import { createFileRoute, redirect } from "@tanstack/react-router";
import { mockNotes } from "@/data/mock-notes";

export const Route = createFileRoute("/")({
  loader: () => {
    throw redirect({
      to: "/notes/$id",
      params: mockNotes[0],
    });
  },
});
