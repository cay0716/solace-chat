"use client";

import { useEffect, useState } from "react";

const lines = [
  "무엇이 보이나요?",
  "어떤 감정이 느껴지나요?",
  "시선이 멈춘 지점은 어디인가요?",
  "지금 보고 있는 것은 무엇인가요?",
];

export default function FadeText({ stopped }: { stopped: boolean }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showSolace, setShowSolace] = useState(false);

  // 질문 순환
  useEffect(() => {
    if (stopped) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % lines.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [stopped]);

  // solace 전환
  useEffect(() => {
    if (!stopped) return;

    const timeout = setTimeout(() => {
      setFade(false);
      
      setTimeout(() => {
        setShowSolace(true);
        setFade(true);
      }, 500);
    }, 0);

    return () => clearTimeout(timeout);
  }, [stopped]);

  return (
    <h1
      className={`text-2xl font-bold transition-all duration-500 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {showSolace ? "지금 떠오른 것을 적어 보세요." : lines[index]}
    </h1>
  );
}