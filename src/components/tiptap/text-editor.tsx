"use client";

import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type React from "react";
import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  List,
  ListOrdered,
  Quote,
  Minus,
  CornerDownLeft,
  Undo,
  Redo,
  RemoveFormatting,
  Eye,
  EyeOff,
  Save,
  FileCode,
  Table,
  ChevronDown,
  Moon,
  Sun,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Loader from "../loader/LoaderComponent";

const extensions = [TextStyleKit, StarterKit];

interface ToolbarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({
  onClick,
  disabled,
  active,
  title,
  children,
}: ToolbarButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors",
        active && "bg-accent text-accent-foreground"
      )}
    >
      {children}
    </Button>
  );
}

function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <div className="flex items-center gap-1 flex-wrap p-2 border-b border-border bg-card">
      {/* Text Formatting Group */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          active={editorState.isBold}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          active={editorState.isItalic}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          active={editorState.isStrike}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          active={editorState.isCode}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Headings Group */}
      <div className="flex items-center gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Heading1 className="h-4 w-4 mr-1" />
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={cn(editorState.isParagraph && "bg-accent")}
            >
              Paragraph
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(editorState.isHeading1 && "bg-accent")}
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn(editorState.isHeading2 && "bg-accent")}
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={cn(editorState.isHeading3 && "bg-accent")}
            >
              Heading 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Lists & Blocks Group */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editorState.isBulletList}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editorState.isOrderedList}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editorState.isCodeBlock}
          title="Code Block"
        >
          <FileCode className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editorState.isBlockquote}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Advanced Group */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHardBreak().run()}
          title="Hard Break"
        >
          <CornerDownLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="Clear Formatting"
        >
          <RemoveFormatting className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* History Group */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>
    </div>
  );
}


interface ProblemEditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
}

export function ProblemEditor({
  onChange,
  initialContent,
}: ProblemEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const editor = useEditor({
    extensions,
    content:
      initialContent 
      ||
      `<p>Start writing your problem here...</p>`,
    immediatelyRender: false,
    onUpdate({ editor }) {
      if (onChange) onChange(editor.getHTML());
    },
  });

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      if (editor) editor.destroy();
    };
  }, [editor]);

  // Dark mode toggle
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  if (!editor) return <Loader/>;

  return (
    <div className="flex h-screen bg-background">
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            {" "}
            <h1 className="text-lg font-semibold">Problem Editor</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
            className="border-1"
            variant={"ghost"}
            //   className="flex items-center border-1 px-2 py-1 rounded-md hover:cursor-pointer dark:hover:bg-black/90 hover:bg-gray-100 transition-colors duration-100"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? (
                <>
                  {" "}
                  <EyeOff className="h-4 w-4 mr-2" /> Edit{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Eye className="h-4 w-4 mr-2" /> Preview{" "}
                </>
              )}
            </Button>{" "}
            <Button
              variant="ghost"
              size="sm"
              className="hover:cursor-pointer"
              onClick={() => setIsDark(!isDark)}
              title="Toggle Theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}{" "}
            </Button>{" "}
          </div>
        </div>
        {/* Toolbar */}
        {!isPreview && <MenuBar editor={editor} />}
        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-background">
          {" "}
          <div className="max-w-7xl mx-auto ">
            {isPreview ? (
              <div className="prose prose-invert max-w-none p-8">
                <div
                  className="ProseMirror"
                  dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                />{" "}
              </div>
            ) : (
              <EditorContent editor={editor} className="bg-white dark:bg-background"/>
            )}
          </div>
        </div>
        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-card text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+B</kbd>
            <span>Bold</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs ml-2">
              Ctrl+I
            </kbd>
            <span>Italic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
