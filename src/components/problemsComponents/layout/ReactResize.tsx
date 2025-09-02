"use client";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

interface ReactResizeProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function ReactResize({ left, right }: ReactResizeProps) {
  return (
    <PanelGroup direction="horizontal" className="h-screen">
      <Panel defaultSize={35} minSize={25}>
        {left}
      </Panel>
      <PanelResizeHandle className="w-1 bg-gray-300 dark:bg-gray-700" />
      <Panel defaultSize={65} minSize={40}>
        {right}
      </Panel>
    </PanelGroup>
  );
}
