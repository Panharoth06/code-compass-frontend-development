"use client";

// components/typing-animation.tsx
import { useState, useEffect, useRef } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number; 
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
  pauseDuration?: number;
}

export default function TypingAnimation({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = "",
  onComplete = () => {},
  loop = false,
  pauseDuration = 2000
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasCalledOnComplete = useRef(false);

  useEffect(() => {
    let currentIndex = 0;
    
    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
          timeoutRef.current = setTimeout(typeNextChar, speed);
        } else {
          // Typing complete
          setIsComplete(true);
          setIsClearing(false);
          
          // Call onComplete only once
          if (!hasCalledOnComplete.current) {
            hasCalledOnComplete.current = true;
            onComplete();
          }
          
          if (loop) {
            // Wait, then start clearing character by character
            timeoutRef.current = setTimeout(() => {
              setIsClearing(true);
              currentIndex = text.length;
              clearNextChar();
            }, pauseDuration);
          }
        }
      };

      const clearNextChar = () => {
        if (currentIndex > 0) {
          currentIndex--;
          setDisplayText(text.substring(0, currentIndex));
          timeoutRef.current = setTimeout(clearNextChar, speed);
        } else {
          // Clearing complete, restart typing
          setIsComplete(false);
          setIsClearing(false);
          currentIndex = 0;
          timeoutRef.current = setTimeout(typeNextChar, 250); // Small pause before retyping
        }
      };

      timeoutRef.current = setTimeout(typeNextChar, delay);
    };

    startTyping();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, loop, pauseDuration]);

  const showCursor = !isComplete || loop;

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className="animate-pulse text-[#CCF301] ml-1">|</span>
      )}
    </span>
  );
}