"use client";
import { motion } from "framer-motion";

export default function LabelSection() {
  const labels = [
    "정상적인", "비정상적인", "가치 있는", "무가치한",
     "여성", "남성","고학력자", "저학력자", "명문대생", "재수생", "중퇴자",  "성공한 사람", "실패한 사람",
    "평범한", "특별한", "이성적인", "본능적인", "안정된", "불안정한", 
    "소속된", "고립된", "투명한", "불투명한", "유능한", "무능한", 
    "우월한", "열등한", "온전한", "결핍된", "선택된", "버려진",
    "착한", "나쁜", "성실한", "게으른",
    "친절한", "차가운", "다정한", "무심한",
    "밝은", "어두운", "긍정적인", "부정적인",
    "책임감 있는", "무책임한", "믿을 수 있는", "의심스러운",
    "똑똑한", "어리석은", "현명한", "무지한",
    "성공한", "실패한", "잘난", "못난",
    "매력적인", "매력 없는", "호감 가는", "불편한",
    "사랑받는", "외면받는", "인기 있는", "외로운",
    "강한", "약한", "당당한", "위축된",
    "자신감 있는", "자신 없는", "확신하는", "망설이는",
    "주도적인", "수동적인", "적극적인", "소극적인",
    "독립적인", "의존적인", "자유로운", "구속된",
    "순응적인", "반항적인", "순종적인", "거부하는",
    "정직한", "불성실한", "성숙한", "미숙한",
    "어른스러운", "유치한", "차분한", "충동적인",
    "이해심 있는", "이기적인", "배려하는", "무례한",
    "정상", "문제 있는", "괜찮은", "이상한"
  ];

  const displayLabels = labels;

  return (
    <section className="h-screen snap-start flex flex-col justify-center items-center p-10 overflow-hidden bg-black">
      <p className="text-center max-w-2xl leading-loose font-semibold text-[var(--main-color)] mb-8 transition-opacity duration-1000">
        타인을 정의할 때 썼던 편리한 단어들 ㅡ
      </p>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-4xl text-center">
        {displayLabels.map((label, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            transition={{ 
              duration: 0.1, 
              delay: i * 0.02
            }}
            viewport={{ once: true }}
            className="text-gray-300 text-[1rem] md:text-[1.5rem]"
          >
            {label}
          </motion.span>
        ))}
      </div>

      <motion.p 
        initial={{ opacity: 0}}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center font-light text-[var(--main-color)] font-semibold"
      >
        어쩌면, 당신 자신을 덮어버리고 있는 수식어일 수도 있지요.
      </motion.p>
    </section>
  );
}