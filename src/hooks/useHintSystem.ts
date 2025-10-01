import { useUnlockHintMutation } from "@/lib/services/hint/hintApi";
import { useState } from "react";

export const useHintSystem = () => {
  const [unlockHintMutation, { isLoading: isUnlocking }] = useUnlockHintMutation();
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);

  const unlockHint = async (hintId: number) => {
    try {
      // 1. The response is now guaranteed to be { message: string }
      const response: string = await unlockHintMutation(hintId).unwrap(); 

      // Add to local unlocked hints (Optimistic UI update)
      setUnlockedHints((prev) => [...prev, hintId]);

      // 2. Extract the string message directly from the consistent key 'message'
      const successMessage = response || "Hint unlocked successfully";

      return successMessage;
    } 
    /* eslint-disable */
    catch (error: any) {
      let errorMessage = "Failed to unlock hint";
      const errorData = error?.data;

      // 3. Since the proxy wraps the error string, we check for the 'message' key
      if (typeof errorData === "object" && errorData !== null && errorData.message) {
        errorMessage = errorData.message;
      
      // 4. Fallback for network or unknown errors
      } else if (error?.message) {
        errorMessage = error.message;
      }

      return Promise.reject(errorMessage);
    }
  };

  /* eslint-enable */

  const isHintUnlocked = (hintId: number) => unlockedHints.includes(hintId);

  return {
    isUnlocking,
    unlockHint,
    isHintUnlocked,
    unlockedHints,
  };
};