import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/notes/app-sidebar";
import { mockNotes } from "@/data/mock-notes";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/notes")({
  component: Notes,
  loader: () => {
    return mockNotes;
  },
});

function Notes() {
  const notes = Route.useLoaderData();

  return (
    <SidebarProvider>
      <AppSidebar notes={notes} />
      <Outlet />
    </SidebarProvider>
  );
}
