import { LAYOUT_VARS } from "../components/layout/constants";
import { useUIStore } from "../state/uiStore";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/sidebar/Sidebar";
import { DescriptionPanePlaceholder } from "../components/panels/DescriptionPanePlaceholder";
import { LogsPanePlaceholder } from "../components/panels/LogsPanePlaceholder";
import VisualizerPane from "../components/panels/VisualizerPane";

export default function Shell() {
  const sidebarOpen = useUIStore(s => s.sidebarOpen);

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white">

      {/* header */}
      <div className="flex-[1]">
        <Header />
      </div>
      
      {/* body */}
      <div 
        className="flex-[9] flex min-h-0"
        style={{
          "--sidebar-open-w": LAYOUT_VARS.sidebarOpenW,
          "--sidebar-toggle-w": LAYOUT_VARS.sidebarToggleW,
        }}  
      >

        {/* left */}
        <div
          className="shrink-0 overflow-hidden transition-[width] duration-300 ease-out border-r border-white/10"
          style={{ width: sidebarOpen ? "var(--sidebar-open-w)" : "var(--sidebar-toggle-w)" }}
        >
          <Sidebar />
        </div>

        <div className="flex-[8] flex gap-3 p-3 min-h-0">

          {/* main */}
          <main className="flex-[6] flex flex-col gap-3 min-h-0">

            {/* visualizer */}
            <div className="flex-[7] border border-white/10 rounded-xl">
              <VisualizerPane />
            </div>

            {/* logger */}
            <LogsPanePlaceholder />
          </main>

          {/* right */}
          <DescriptionPanePlaceholder />
          
        </div>

      </div>
    </div>
  );
}
