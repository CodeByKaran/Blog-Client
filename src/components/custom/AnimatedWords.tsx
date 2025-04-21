"use client";

import { useState, useEffect, useRef } from "react";

interface WordsObject {
  words: string[];
}

interface AnimatedWordsProps {
  wordsObj: WordsObject[];
}

export default function AnimatedWords({ wordsObj }: AnimatedWordsProps) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [currentArrayIndex, setCurrentArrayIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset animation when wordsObj changes
  useEffect(() => {
    if (wordsObj.length === 0) return;
    setCurrentArrayIndex(0);
    setDisplayedWords([]);
    setIsAnimating(true);
    setFadeState("in");
  }, [wordsObj]);

  useEffect(() => {
    if (wordsObj.length === 0 || !isAnimating) return;

    const currentWordsArray = wordsObj[currentArrayIndex].words;

    // Function to handle displaying words
    const animateWords = () => {
      // Display all words from current array at once with fade in
      setDisplayedWords(currentWordsArray);
      setFadeState("in");

      // Schedule fade out
      timeoutRef.current = setTimeout(() => {
        setFadeState("out");

        // After fade out, move to next array
        timeoutRef.current = setTimeout(() => {
          setCurrentArrayIndex((prev) => (prev + 1) % wordsObj.length);
          setDisplayedWords([]);
        }, 500); // Time for fade out
      }, 2000); // Time to display words
    };

    // Start animation
    animateWords();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentArrayIndex, isAnimating, wordsObj]);

  return (
    <span
      className={`font-poppins text-xs font-thin text-gray-400/80 transition-opacity duration-500 ease-in-out ${
        fadeState === "in" ? "opacity-100" : "opacity-0"
      }`}
    >
      {displayedWords.join(" ")}
    </span>
  );
}
