import SidebarContent from "./SidebarContent";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar() {

  return(
    <div className="h-full w-full flex">

      {/* content */}
      <SidebarContent />

      {/* toggle */}
      <SidebarToggle />

    </div>
  );
}