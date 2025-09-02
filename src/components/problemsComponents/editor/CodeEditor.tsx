"use client";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (value: string) => void;
  language: string;
  value: string;
}

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value || "")}
    />
  );
}
