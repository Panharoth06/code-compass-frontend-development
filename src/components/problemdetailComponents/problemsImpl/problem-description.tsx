"use client";

import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProblemResponse } from "@/lib/types/problem/problemResponse";
import ExampleComponent from "./ExampleComponent";
import HintComponent from "./HintComponent";
import CommentComponent from "./CommentComponent";
import { useGetCurrentUserQuery } from "@/lib/services/user/userApi";
import CreateComment from "./CreateCommentComponent";
import SubmissionHistoryComponent from "./SubmissionHistory";

interface ProblemDescriptionProps {
  problem: ProblemResponse | undefined;
}

function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const { data: userData } = useGetCurrentUserQuery();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(problem?.description || "");
    }
  }, [editor, problem?.description]);

  const getDifficultyColor = (difficulty: string | undefined) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/15 border-green-500/20 text-green-600 dark:text-green-400 text-base";
      case "Medium":
        return "bg-orange-500/15 border-orange-500/20 text-orange-600 dark:text-orange-400 text-base";
      case "Hard":
        return "bg-red-500/15 border-red-500/20 dark:text-red-200 text-base";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 text-red-600 dark:text-red-400 text-base";
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <Tabs defaultValue="description" className="flex-1 flex flex-col min-h-0">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>

        <TabsContent
          value="description"
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h6 className="text-2xl font-semibold text-foreground text-balance">
                  {problem?.id}. {problem?.title}
                </h6>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getDifficultyColor(problem?.difficulty)}>
                  {problem?.difficulty}
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent text-base"
                >
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Topics
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent text-base"
                >
                  Hint
                </Badge>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {editor ? <EditorContent editor={editor} /> : null}
            </div>

            <hr />
            <section>
              <ExampleComponent problem={problem} />
              <HintComponent problemId={problem?.id} />
            </section>
          </div>
        </TabsContent>
        <TabsContent 
        value="submissions"
        className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            <SubmissionHistoryComponent problem_id={problem?.id} />
          </div>

        </TabsContent>
        <TabsContent
          value="discussions"
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            <div className="space-y-4">
              <h6 className="text-2xl font-semibold">
                Discussions for {problem?.title || 'No Problem Selected'}
              </h6>
            </div>
            <CreateComment username={userData?.username} problemId={problem?.id} />
            {problem?.id ? (
              <CommentComponent problemId={problem.id} username={userData?.username} />
            ) : (
              <p className="text-muted-foreground">No problem selected</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProblemDescription;