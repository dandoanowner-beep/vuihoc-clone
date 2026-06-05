"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Play } from "lucide-react";

const skill = { name: "Phép chia có dư", subject: "Toán lớp 4", chapter: "Chương 2" };

const rule = {
  formula: "Số bị chia = Số chia × Thương + Số dư",
  note: "Số dư luôn nhỏ hơn số chia!",
};

const steps = [
  { n: 1, text: "Ước lượng thương (kết quả chia)" },
  { n: 2, text: "Nhân thương với số chia" },
  { n: 3, text: "Lấy số bị chia trừ kết quả vừa tính" },
  { n: 4, text: "Số còn lại chính là số dư" },
  { n: 5, text: "Kiểm tra: số dư < số chia ✓" },
];

const example = {
  problem: "17 ÷ 5 = ?",
  steps: [
    "Ước lượng: 5 × 3 = 15 (gần 17 nhất)",
    "Thương = 3",
    "17 – 15 = 2",
    "Số dư = 2",
    "Kiểm tra: 2 < 5 ✓",
  ],
  answer: "17 ÷ 5 = 3 (dư 2)",
};

export default function MuoiPhutPage() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-vh-bg min-h-screen" style={{ animation: "slide-up-enter 0.3s ease-out both" }}>

      {/* Header */}
      <div className="bg-vh-orange px-4 pt-10 pb-4 flex items-center gap-3">
        <Link href="/so-lien-lac" className="p-1.5 bg-white/15 rounded-xl">
          <ChevronLeft size={20} className="text-white" />
        </Link>
        <div>
          <h1 className="text-white font-black text-base">⏱ 10 phút cùng con</h1>
          <p className="text-white/70 text-xs">{skill.name} · {skill.subject}</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* Intro card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-vh-orange">
          <p className="text-sm text-vh-text leading-relaxed">
            Ba mẹ và con cùng đọc lại phần này nhé 📖 — chỉ vài phút thôi, rồi làm bài kiểm tra nhỏ cùng nhau!
          </p>
        </div>

        {/* Rule card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-black text-vh-text text-base mb-3">📐 Công thức cần nhớ</h2>
          <div className="bg-vh-blue-bg border border-vh-blue-light rounded-xl p-3 text-center mb-3">
            <p className="font-black text-vh-blue text-sm leading-relaxed">{rule.formula}</p>
          </div>
          <div className="bg-vh-red-light rounded-xl p-2.5 text-center">
            <p className="text-vh-red font-bold text-sm">⚠ {rule.note}</p>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-black text-vh-text text-base mb-3">🪜 Các bước thực hiện</h2>
          <div className="space-y-2">
            {steps.map((s) => (
              <div key={s.n} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-vh-blue flex items-center justify-center text-white text-xs font-black flex-shrink-0 mt-0.5">
                  {s.n}
                </div>
                <p className="text-sm text-vh-text leading-snug">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-black text-vh-text text-base mb-3">✏️ Ví dụ minh hoạ</h2>
          <div className="bg-gray-50 rounded-xl p-3 text-center mb-3">
            <p className="font-black text-vh-text text-lg">{example.problem}</p>
          </div>
          <div className="space-y-1.5 mb-3">
            {example.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-vh-text">
                <span className="text-vh-sub">→</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div className="bg-vh-green-light rounded-xl p-2.5 text-center">
            <p className="text-vh-green font-black text-sm">✅ Đáp án: {example.answer}</p>
          </div>
        </div>

        {/* Mock video */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-black text-vh-text text-base mb-3">🎬 Video giải thích ngắn</h2>
          <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-vh-blue-dark to-gray-900 opacity-80" />
            <div className="relative text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-white/40">
                <Play size={22} className="text-white" fill="white" />
              </div>
              <p className="text-white text-xs font-semibold">Cô Minh Anh giảng bài</p>
              <p className="text-blue-200 text-[10px]">3:24 phút</p>
            </div>
          </div>
        </div>

        {/* Start button — appears after delay to encourage reading */}
        <div
          style={{
            animation: showButton ? "fade-up 0.4s ease-out both" : "none",
            opacity: showButton ? undefined : 0,
            pointerEvents: showButton ? "auto" : "none",
          }}
        >
          <Link
            href="/so-lien-lac/muoi-phut/quiz"
            className="flex items-center justify-center gap-2 w-full bg-vh-orange text-white font-black text-base py-4 rounded-2xl shadow-lg"
          >
            Bắt đầu kiểm tra 🚀
          </Link>
          <p className="text-center text-xs text-vh-sub mt-2">10 câu hỏi · ~5 phút</p>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}
