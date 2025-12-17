import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/notes/app-sidebar";
import { mockNotes } from "@/data/mock-notes";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notes = mockNotes;

  return (
    <SidebarProvider>
      <AppSidebar notes={notes} />
      {children}
    </SidebarProvider>
  );
}
