import { useUIStore } from "../../../state/uiStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SidebarToggle() {
  const sidebarOpen = useUIStore(s => s.sidebarOpen);
  const toggleSidebar = useUIStore(s => s.toggleSidebar);

  return(
    <div 
      className="h-full border-l border-white/10"
      style={{ width: "var(--sidebar-toggle-w)" }}
    >
      <button
        onClick={toggleSidebar}
        className="w-full h-full flex items-center justify-center hover:bg-white/10 cursor-pointer"
      >
        {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>
    </div>
  );
}