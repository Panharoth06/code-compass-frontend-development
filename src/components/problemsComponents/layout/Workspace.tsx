"use client";

import React, { useState } from "react";
import ReactResize from "../layout/ReactResize";
import ProblemList from "../problems/ProblemList";
import CodeEditor from "../editor/CodeEditor";
import LanguageSelector from "../editor/LanguageSelector";
import TestPanel from "../tests/TestPanel";

export default function Workspace() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding...");

  return (
    <div className="h-screen flex overflow-hidden">
      <ReactResize
        // LEFT PANEL: ProblemList
        left={
          <div className="flex flex-col h-full overflow-y-auto border-r border-neutral-800 flex-shrink-0">
            <ProblemList />
          </div>
        }
        // RIGHT PANEL: Editor + Language + TestPanel
        right={
          <div className="flex-1 flex flex-col h-full">
            {/* Language Selector */}
            <div className="p-2 flex justify-between items-center border-b dark:border-gray-700">
              <LanguageSelector
                languages={["javascript", "python", "cpp"]}
                onChange={setLanguage}
              />
            </div>

            {/* Code Editor */}
            <div className="flex-1">
              <CodeEditor
                language={language}
                value={code}
                onChange={(val) => setCode(val ?? "")}
              />
            </div>

            {/* Test Panel */}
            <div className="h-1/3 border-t dark:border-gray-700">
              <TestPanel code={code} language={language} />
            </div>
          </div>
        }
        leftMinWidth={220} // minimum width
        leftMaxWidth={400} // max width before it becomes fixed
      />
    </div>
  );
}
