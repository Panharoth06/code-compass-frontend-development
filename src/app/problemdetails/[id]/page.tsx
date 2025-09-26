import Loader from "@/components/loader/LoaderComponent";
import ProblemDetailsComponents from "@/components/problemdetailComponents/ProblemDetailComponent";
import { Suspense } from "react";

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
      <Suspense fallback={<Loader />}>
        <ProblemDetailsComponents problemId={problemId} />
      </Suspense>
    </div>
  );
}