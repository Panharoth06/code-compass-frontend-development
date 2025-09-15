import ProblemDetailsComponents from "@/components/problemdetailComponents/ProblemDetailComponent";
import { Toaster } from "react-hot-toast";

interface ProblemDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProblemDetailsPage({ params }: ProblemDetailsPageProps) {
  // Await the params promise
  const { id } = await params;
  const problemId = Number(id);

  return (
    <div className="h-screen">
      <ProblemDetailsComponents problemId={problemId} />
      <Toaster />
    </div>
  );
}