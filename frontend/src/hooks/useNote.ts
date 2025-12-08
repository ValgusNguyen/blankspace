import { Note } from "@/types/note";
import { DateTime } from "luxon";
import { useState, useCallback } from "react";
import { UUIDTypes, v7 as uuidv7 } from "uuid";

export const useNotes = (initialNotes: Note[]) => {
  const [notes, setNotes] = useState(initialNotes);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(
    initialNotes[0]?.id,
  );

  const currentNote = notes.find((note) => note.id === currentNoteId);

  const createNote = () => {
    const newNote: Note = {
      id: uuidv7(),
      title: "Untitled",
      updatedAt: DateTime.now().toJSDate(),
      content: "",
    };

    setNotes((prev) => [newNote, ...prev]);
    setCurrentNoteId(newNote.id);
    return newNote.id;
  };

  const updateNote = (id: UUIDTypes, updates: Partial<Omit<Note, "id">>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: DateTime.now().toJSDate() }
          : note,
  const deleteNote = useCallback(
    (id: UUIDTypes) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      
      setCurrentNoteId((prevId) => {
        if (prevId === id) {
          return null;
        }
        return prevId;
      });
    },
    [],
  );
  };

  return {
    notes,
    currentNote,
    currentNoteId,
    setCurrentNoteId,
    createNote,
    updateNote,
    deleteNote,
  };
};
