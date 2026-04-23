"use client";

import { useState } from "react";
import { getMockReply } from "@/app/chat/mock";
import FadeText from "@/app/components/FadeText";
import Typewriter from "@/app/components/Typewriter";

type Message = {
  role: "user" | "ai";
  text: string;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [hasTyped, setHasTyped] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const userMsg = input;

    setChat((prev) => [...prev, {role: "user", text: userMsg}]);
    setInput("");

    setLoading(true);

    // mock 사용
    // setTimeout(() => {
    //   const reply = getMockReply();
    //   setLoading(false)

    //   setLoading(false)
    //   // const res = await fetch("/api/chat", ...)
    //   setChat((prev) => [...prev, {role: "ai", text: reply}]);
    // }, 500);

    // API 호출
    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      setLoading(false);
      setChat((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-16 px-[8%] md:px-[20%] w-full">
      <FadeText stopped={hasTyped} />

      <div>
        {chat.map((msg, i) => (
          <p
            key={i}
            className={
              msg.role === "user"
                ? "opacity-40 text-sm text-right font-light pt-2"
                : "opacity-90 text-base text-left font-light border-b border-white/10 pb-2"
            }
          >
            {msg.role === "ai" ? (
              <Typewriter text={msg.text} />
            ) : (
              msg.text
            )}
          </p>
        ))}

        {loading && (
          <div className="loading-dot"></div>
        )}
      </div>

      <div className="w-full flex justify-center items-center gap-2 pt-5">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          
            if (!hasTyped && e.target.value.length > 0) {
              setHasTyped(true);
            }
          }}
          className="border-b opacity-60"
        />
        <button onClick={sendMessage} className="p-2 opacity-50">전송</button>
      </div>
    </div>
  );
}