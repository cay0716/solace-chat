"use client";

import { useState } from "react";
import Typewriter from "@/app/components/Typewriter";
import LabelSection from "@/app/components/LabelSection";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;

    setChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      setLoading(false);
      setChat((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    // snap-y snap-mandatory: 스크롤이 섹션에 딱딱 붙게 함
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white">
      
      {/* [첫화면] */}
      <section className="h-screen snap-start flex flex-col justify-center items-center p-10">
        <h1 className="text-[11vw] font-black text-[var(--main-color)] text-left break-keep">
          당신은 <br />  이 인물이 <br /> 천사로 보이십니까?
        </h1>
      </section>

      {/* [스크롤 1] */}
      <section className="h-screen snap-start flex justify-center items-center p-10">
        <p className="text-[11vw] text-[var(--sub-color)] font-bold">왜요?</p>
      </section>

      {/* [스크롤 2] */}
      <section className="h-screen snap-start flex flex-col justify-center items-center p-10 gap-8">
        <p className="text-4xl md:text-[6vw] text-center leading-relaxed font-semibold text-[var(--sub-color)]">
          날개가 있다고 해서 천사입니까?
          무엇도 될 수 있는 이 모호한 뼈대 위에서
          당신은 굳이 무엇을 읽어내려 합니까?
        </p>
        {/* <p className="text-xl md:text-2xl text-center leading-relaxed font-light text-gray-400">
          저 또한 이것을 ‘인물’이라 칭했으니 <br /> 
          그 점은 사과드리겠습니다.
        </p> */}
      </section>

      {/* [스크롤 3] */}
      <section className="h-screen snap-start flex justify-center items-center p-10">
        <p className="text-4xl md:text-[4vw] md:text-3xl text-center leading-relaxed text-[var(--main-color)] font-light opacity-50">
          모호함을 <br /> 견디지 못한 이름표가 <br /> 존재를 지웁니다.
        </p>
      </section>

      {/* [스크롤 4] */}
      <section className="h-screen text-[1rem] md:text-[1.7vw] snap-start flex flex-col justify-center items-center p-10 gap-6">
        <LabelSection />
      </section>

      {/* [마지막 대화 섹션] */}
      <section className="h-screen snap-start flex flex-col justify-between py-20 px-[8%] md:px-[20%]">
        <div className="flex-1 overflow-y-auto pt-10">
          <h2 className="text-[1rem] md:text-[1.7vw] text-[var(--main-color)]  mb-12 text-center font-bold">
            이름표를 떼어낸 당신은, <br /> 무엇입니까?
          </h2>
          
          <div className="space-y-4">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? "opacity-40 text-sm text-right font-light pt-2"
                    : "opacity-90 text-base text-left font-light border-b border-white/10 pb-4"
                }
              >
                {msg.role === "ai" ? (
                  <Typewriter text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {loading && <div className="loading-dot"></div>}
          </div>
        </div>

        {/* 입력창 */}
        <div className="w-full flex justify-center items-center gap-4 border-t border-white/10 pt-10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="수식어를 걷어낸 당신을 적어주세요"
            className="bg-transparent border-b border-white/30 focus:border-white outline-none py-2 w-full max-w-md transition-all font-light opacity-60 focus:opacity-100"
          />
          <button 
            onClick={sendMessage} 
            className="p-2 opacity-50 hover:opacity-100 transition-opacity"
          >
            전송
          </button>
        </div>
      </section>
    </main>
  );
}