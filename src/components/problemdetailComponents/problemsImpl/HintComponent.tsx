import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useHintSystem } from "@/hooks/useHintSystem";
import { useGetCurrentUserQuery } from "@/lib/services/user/userApi";
import { useGetProblemQuery } from "@/lib/services/problem/problemApi"; // Assuming this exists
import { Coins, Lock, Unlock } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { skipToken } from '@reduxjs/toolkit/query/react';


interface HintComponentProps {
  problemId: number | undefined;
}

const HintComponent: React.FC<HintComponentProps> = ({ problemId }) => {
  const { isUnlocking, unlockHint, isHintUnlocked } = useHintSystem();

  // Fetch current user
  const { data: userData, refetch: refetchUser } = useGetCurrentUserQuery();

  // Fetch problem data safely
  const { data: problem, isLoading: problemLoading, refetch: refetchProblem } =
    useGetProblemQuery(problemId ?? skipToken);

    /* eslint-disable */
  const handleUnlockHint = async (hintId: number) => {
    try {
      await unlockHint(hintId);
      toast.success("Hint unlocked successfully");

      await refetchUser();
      await refetchProblem();
    } catch (err: any) {
      const message = err?.data?.error || err?.error || err?.message || "Failed to unlock hint";
      toast.error(message);
      console.error("Unlock error:", err);
    }
  };
  /* eslint-enable */
  const defaultAccordion = React.useMemo(() => {
    if (!problem?.hints) return undefined;
    const unlockedIndex = problem.hints.findIndex((hint) => !hint.is_locked);
    console.log(problem.hints.map(h => h.is_locked));
    return unlockedIndex !== -1 ? `item-${unlockedIndex + 1}` : undefined;
  }, [problem?.hints]);

  if (problemLoading) return <p>Loading hints...</p>;

console.log(defaultAccordion);


  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={defaultAccordion}
    >
      {problem?.hints.map((hint, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className={!hint.is_locked ? "border-muted opacity-80" : ""}
          disabled={false}
        >
          <AccordionTrigger className="text-base flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  !hint.is_locked
                    ? "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {index + 1}
              </div>
              <span>Hint {index + 1}</span>

              {hint.is_locked ? (
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                >
                  <Lock className="w-3 h-3 mr-1" />
                  Locked
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                >
                  <Unlock className="w-3 h-3 mr-1" />
                  Unlocked
                </Badge>
              )}
            </div>

            {hint.is_locked && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Coins className="w-3 h-3 text-amber-500" />
                <span>10 coins</span>
              </div>
            )}
          </AccordionTrigger>

          <AccordionContent className="p-4 flex flex-col gap-4 text-balance">
            {!hint.is_locked ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                    <Unlock className="w-4 h-4" />
                    Hint Unlocked
                  </h4>
                  <p className="text-sm">{hint.description}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Hint Locked
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Unlock this hint to get guidance on solving the problem.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Unlock cost:</span>
                    <div className="flex items-center gap-1 font-medium">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span>10 coins</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Your coins:</span>
                    <div className="flex items-center gap-1 font-medium">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span>{userData?.coin ?? 0} coins</span>
                    </div>
                  </div>

                  {userData?.coin ?? 0 >= 10 ? (
                    <Button
                      onClick={() => handleUnlockHint(hint.id)}
                      disabled={isUnlocking || isHintUnlocked(hint.id)}
                      className="w-full mt-2 bg-amber-500 hover:bg-amber-600"
                    >
                      {isUnlocking ? (
                        <>
                          <div className="animate-spin mr-2">⟳</div>
                          Unlocking...
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 mr-2" />
                          Unlock Hint for 10 coins
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button disabled variant="outline" className="w-full mt-2">
                        Not enough coins
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Solve more problems to earn coins
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default HintComponent;
