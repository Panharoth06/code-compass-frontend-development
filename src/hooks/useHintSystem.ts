import { useUnlockHintMutation } from "@/lib/services/hint/hintApi";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useHintSystem = () => {
  const [unlockHintMutation, { isLoading: isUnlocking }] = useUnlockHintMutation();
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);

  const unlockHint = async (hintId: number) => {
    try {
      const response = await unlockHintMutation(hintId).unwrap();

      // Add to local unlocked hints
      setUnlockedHints((prev) => [...prev, hintId]);

      // Handle response safely
      const successMessage =
        typeof response === "string"
          ? response
          : response || "Hint unlocked successfully";

      toast.success(successMessage);
      return successMessage;
    } 
    /* eslint-disable */
    catch (error: any) {
      let errorMessage = "Failed to unlock hint";

      if (typeof error?.data === "string") {
        errorMessage = error.data;
      } else if (typeof error?.data === "object") {
        errorMessage =
          error.data?.message ||
          error.data?.error ||
          JSON.stringify(error.data);
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      // console.error("Unlock hint error:", error);
      return Promise.reject(errorMessage);
    }
  };

  /* eslint-enable */

  const isHintUnlocked = (hintId: number) => unlockedHints.includes(hintId);

  return {
    isUnlocking,
    unlockHint,
    isHintUnlocked,
    unlockedHints, // optional: expose local unlocked hints 
  };
};
