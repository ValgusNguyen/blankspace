import { Note } from "@/types/note";
import { DateTime } from "luxon";

export const NoteListItem = ({ note }: { note: Note }) => {
  return (
    <li className="p-4 border-b border-gray-100 cursor-pointer content-visibility-auto hover:bg-gray-50">
      <a href={`/notes/${note.id}`}>
        <h3 className="font-medium mb-2">{note.title}</h3>
        <p className="text-xs text-gray-600">
          {DateTime.fromJSDate(note.updatedAt).toLocaleString()}
        </p>
      </a>
    </li>
  );
};
