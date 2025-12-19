import type { Note } from "@/types/note";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";

export const NoteListItem = ({ note }: { note: Note }) => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const isActive = pathname === `/notes/${note.id}`;

  return (
    <li>
      <Link
        to={`/notes/$id`}
        params={{ id: note.id }}
        className={cn(
          "block p-4 border-b cursor-pointer content-visibility-auto hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive && "bg-muted text-primary",
        )}
      >
        <span className="font-medium mb-3">{note.title}</span>
        <p className="text-xs text-muted-foreground">
          {DateTime.fromJSDate(note.updatedAt).toLocaleString()}
        </p>
      </Link>
    </li>
  );
};
