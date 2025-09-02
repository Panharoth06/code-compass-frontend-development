export type Problem = {
  id: string;
  title: string;
  description?: string;
  examples?: string[];
};

export type ProblemEditorProps = {
  problemId: string;
};
