import { Button } from "../ui/button";
import { FilePlusCorner } from "lucide-react";

interface SidebarHeaderProps {
  onNewNote: () => void;
}

const SidebarHeader = ({ onNewNote }: SidebarHeaderProps) => {
  return (
    <header className="border-b border-primary">
      <Button
        onClick={onNewNote}
        size="icon-lg"
        variant="ghost"
        aria-label="New note"
      >
        <FilePlusCorner />
      </Button>
    </header>
  );
};

export default SidebarHeader;
