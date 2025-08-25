import Judge0Display from "@/components/Judge0Display";
import ProblemDisplay from "@/components/ProblemDisplay";

export default function Home() {
  return (
    <div>
      <div>
        <h2 className="text-center dark:text-background bg-primary">This is font barlow</h2>
        <Judge0Display/>
        <ProblemDisplay/>
      </div>
    </div>
  );
}
