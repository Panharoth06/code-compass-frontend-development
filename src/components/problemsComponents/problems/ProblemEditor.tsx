"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ProblemEditorProps {
  problemId: string;
}

export default function ProblemEditor({ problemId }: ProblemEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h4>Problem ${problemId}</h4>
      <p>
        Example description goes here. You can load real problem data
        dynamically from your API.
      </p>
    `,
    immediatelyRender: false, // ✅ prevents hydration mismatch
    editable: false, // read-only mode like LeetCode
  });

  if (!editor) {
    // optional loading fallback
    return <div className="p-4 text-gray-500">Loading problem...</div>;
  }

  return (
    <div className="h-full p-4 overflow-auto prose dark:prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
}
