"use client";

import { Note } from "@/types/note";
import { DateTime } from "luxon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const NoteListItem = ({ note }: { note: Note }) => {
  const pathname = usePathname();
  const isActive = pathname === `/notes/${note.id}`;

  return (
    <li>
      <Link
        href={`/notes/${note.id}`}
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
