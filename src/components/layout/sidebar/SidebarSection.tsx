import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ALGORITHM_SECTIONS } from "../../../features/algorithms/registry";
import { useUIStore } from "../../../state/uiStore";

export default function SidebarSection() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const selectedAlgoId = useUIStore((s) => s.selectedAlgoId);
  const setSelectedAlgo = useUIStore((s) => s.setSelectedAlgo);

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return(
    <div className="h-full w-full min-h-0">
      <div className="h-full w-full bg-white/[0.03] overflow-auto">
        <div className="divide-y divide-white/10">
          {ALGORITHM_SECTIONS.map((section) => {
            const isOpen = openSections.has(section.id);

            return (
              <div key={section.id}>
                {/* section header */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left bg-white/[0.05] hover:bg-white/[0.08]"
                >
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <span className="text-sm font-semibold text-white/90">
                    {section.title}
                  </span>
                </button>

                {/* animated panel */}
                <div
                  id={`section-panel-${section.id}`}
                  className={[
                    "grid transition-[grid-template-rows] duration-200 ease-out bg-white/[0.02]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "overflow-hidden transition-opacity duration-200 ease-out",
                      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                    ].join(" ")}
                  >
                    <div className="py-2 pl-8 pr-3 space-y-1">
                      {section.items.map((item) => {
                        const isSelected = item.id === selectedAlgoId;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedAlgo(item.id)}
                            className={[
                              "w-full text-left text-sm px-2 py-1",
                              isSelected
                                ? "bg-white/[0.10] text-white"
                                : "text-white/70 hover:text-white hover:bg-white/[0.06]",
                            ].join(" ")}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}