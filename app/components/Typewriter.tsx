"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      i++;

      if (i > text.length) {
        clearInterval(interval);
        return;
      }

      setDisplayed(text.slice(0, i)); 
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}