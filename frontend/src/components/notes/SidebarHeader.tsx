import { LuFilePlus } from "react-icons/lu";

interface SidebarHeaderProps {
  onNewNote: () => void;
}

const SidebarHeader = ({ onNewNote }: SidebarHeaderProps) => {
  return (
    <header className="p-4 border-b border-gray-200">
      <button
        onClick={onNewNote}
        className="flex items-center cursor-pointer justify-center w-full bg-green-400 text-black p-4 rounded-lg hover:bg-green-500 transition"
        aria-label="Create new note"
      >
        <LuFilePlus className="text-xl" />
        <span className="pl-1.5">Note</span>
      </button>
    </header>
  );
};

export default SidebarHeader;
