import { useUIStore } from "../../../state/uiStore";
import SidebarSection from "./SidebarSection";

const OPEN_CONTENT_W = "calc(var(--sidebar-open-w) - var(--sidebar-toggle-w))";

export default function SidebarContent() {  
  const sidebarOpen = useUIStore(s => s.sidebarOpen);
  
  return(
    <div
      className={[
        "relative min-w-0 flex-1 basis-0 overflow-hidden",
        "transition-[opacity] duration-200 ease-out",
        sidebarOpen
          ? "opacity-100 pointer-events-auto overflow-auto"
          : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: OPEN_CONTENT_W }}
      >
        <SidebarSection />
      </div>
    </div>
  );
}