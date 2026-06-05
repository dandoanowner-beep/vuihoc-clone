"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, Heart } from "lucide-react";

const MAX_LIVES = 4;

const questions = [
  { q: "17 ÷ 5 bằng bao nhiêu, dư bao nhiêu?",  answers: ["3 dư 2", "3 dư 4", "4 dư 1", "2 dư 7"], correct: 0 },
  { q: "23 ÷ 4 bằng bao nhiêu, dư bao nhiêu?",  answers: ["6 dư 1", "5 dư 3", "5 dư 2", "6 dư 2"], correct: 1 },
  { q: "31 ÷ 7 bằng bao nhiêu, dư bao nhiêu?",  answers: ["4 dư 2", "5 dư 1", "4 dư 3", "3 dư 5"], correct: 2 },
  { q: "45 ÷ 8 bằng bao nhiêu, dư bao nhiêu?",  answers: ["6 dư 3", "5 dư 3", "4 dư 5", "5 dư 5"], correct: 3 },
  { q: "29 ÷ 6 bằng bao nhiêu, dư bao nhiêu?",  answers: ["4 dư 5", "4 dư 3", "5 dư 1", "3 dư 5"], correct: 0 },
  { q: "37 ÷ 9 bằng bao nhiêu, dư bao nhiêu?",  answers: ["3 dư 4", "4 dư 1", "4 dư 3", "5 dư 2"], correct: 1 },
  { q: "43 ÷ 5 bằng bao nhiêu, dư bao nhiêu?",  answers: ["9 dư 1", "7 dư 3", "8 dư 3", "8 dư 5"], correct: 2 },
  { q: "51 ÷ 7 bằng bao nhiêu, dư bao nhiêu?",  answers: ["8 dư 1", "6 dư 5", "7 dư 3", "7 dư 2"], correct: 3 },
  { q: "26 ÷ 3 bằng bao nhiêu, dư bao nhiêu?",  answers: ["8 dư 2", "9 dư 1", "8 dư 1", "7 dư 2"], correct: 0 },
  { q: "58 ÷ 9 bằng bao nhiêu, dư bao nhiêu?",  answers: ["7 dư 1", "6 dư 4", "6 dư 3", "5 dư 4"], correct: 1 },
];

type Status = "idle" | "correct" | "wrong" | "pass" | "fail";

export default function QuizPage() {
  const [qIndex, setQIndex]       = useState(0);
  const [lives, setLives]         = useState(MAX_LIVES);
  const [selected, setSelected]   = useState<number | null>(null);
  const [status, setStatus]       = useState<Status>("idle");
  const [correctCount, setCorrectCount] = useState(0);
  const [showZaloToast, setShowZaloToast] = useState(false);

  const q = questions[qIndex];

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) {
      setStatus("correct");
      setCorrectCount((c) => c + 1);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setStatus(newLives === 0 ? "fail" : "wrong");
      if (newLives === 0) {
        setTimeout(() => setShowZaloToast(true), 600);
      }
    }
  }, [selected, q.correct, lives]);

  // Auto-advance after answer
  useEffect(() => {
    if (status === "correct" || status === "wrong") {
      const t = setTimeout(() => {
        if (qIndex + 1 >= questions.length) {
          setStatus("pass");
        } else {
          setQIndex((i) => i + 1);
          setSelected(null);
          setStatus("idle");
        }
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [status, qIndex]);

  // ── PASS screen ──
  if (status === "pass") {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="min-h-screen bg-vh-bg flex flex-col items-center justify-center px-6 text-center" style={{ animation: "fade-up 0.4s ease-out both" }}>
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-black text-vh-text mb-1">Tuyệt vời!</h1>
        <p className="text-vh-sub text-sm mb-6">Con làm đúng {correctCount}/{questions.length} câu ({pct}%)</p>

        <div className="w-full max-w-xs bg-white rounded-2xl p-5 shadow-sm mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-vh-sub">Câu đúng</span>
            <span className="font-black text-vh-green">{correctCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-vh-sub">Câu sai</span>
            <span className="font-black text-vh-red">{questions.length - correctCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-vh-sub">Tim còn lại</span>
            <span className="font-black text-vh-orange">{"❤️".repeat(lives)}</span>
          </div>
        </div>

        <Link href="/so-lien-lac" className="w-full max-w-xs bg-vh-blue text-white font-black py-4 rounded-2xl text-base">
          Về Sổ Liên Lạc 🏠
        </Link>
        <Link href="/so-lien-lac/muoi-phut/quiz" className="mt-3 text-xs text-vh-sub underline underline-offset-2">
          Làm lại từ đầu
        </Link>
      </div>
    );
  }

  // ── FAIL screen ──
  if (status === "fail") {
    return (
      <div className="min-h-screen bg-vh-bg flex flex-col items-center justify-center px-6 text-center" style={{ animation: "fade-up 0.4s ease-out both" }}>
        <div className="text-6xl mb-4">😅</div>
        <h1 className="text-xl font-black text-vh-text mb-1">Cần ôn thêm một chút!</h1>
        <p className="text-vh-sub text-sm mb-6 leading-relaxed">
          Không sao, con xem lại bài rồi thử lại nhé.<br />Con làm được mà!
        </p>

        <div className="w-full max-w-xs bg-white rounded-2xl p-4 shadow-sm mb-6">
          <p className="text-sm text-vh-text leading-relaxed">
            💡 Gợi ý: Hãy nhớ kiểm tra <strong>số dư phải nhỏ hơn số chia</strong> sau mỗi phép tính nhé!
          </p>
        </div>

        <Link href="/so-lien-lac/muoi-phut" className="w-full max-w-xs bg-vh-orange text-white font-black py-4 rounded-2xl text-base mb-3">
          Xem lại bài 📚
        </Link>
        <Link href="/so-lien-lac" className="text-xs text-vh-sub underline underline-offset-2">
          Về Sổ Liên Lạc
        </Link>

        {/* Zalo toast */}
        {showZaloToast && (
          <div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl z-50 whitespace-nowrap"
            style={{ animation: "fade-up 0.3s ease-out both" }}
          >
            ✅ Đã gửi thông báo Zalo cho ba mẹ
          </div>
        )}
      </div>
    );
  }

  // ── Quiz screen ──
  const livesArr = Array.from({ length: MAX_LIVES });

  return (
    <div className="bg-vh-bg min-h-screen">

      {/* Header */}
      <div className="bg-vh-orange px-4 pt-10 pb-4">
        <div className="flex items-center justify-between mb-3">
          <Link href="/so-lien-lac/muoi-phut" className="p-1.5 bg-white/15 rounded-xl">
            <ChevronLeft size={20} className="text-white" />
          </Link>
          {/* Lives */}
          <div className="flex items-center gap-1">
            {livesArr.map((_, i) => (
              <Heart
                key={i}
                size={20}
                className={i < lives ? "text-vh-red fill-vh-red" : "text-white/20 fill-white/10"}
              />
            ))}
          </div>
          <span className="text-white text-sm font-bold">{qIndex + 1}/10</span>
        </div>

        {/* Progress bar */}
        <div className="bg-white/20 rounded-full h-2.5">
          <div
            className="bg-vh-orange h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((qIndex) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-4 py-6 flex flex-col gap-5">

        {/* Question card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <p className="text-xs text-vh-sub font-semibold uppercase tracking-wide mb-3">
            Phép chia có dư · Câu {qIndex + 1}
          </p>
          <p className="text-xl font-black text-vh-text leading-snug">{q.q}</p>
        </div>

        {/* Answer grid */}
        <div className="grid grid-cols-2 gap-3">
          {q.answers.map((ans, i) => {
            let cls = "bg-white border-2 border-gray-200 text-vh-text";
            if (selected !== null) {
              if (i === q.correct) cls = "bg-vh-green-light border-2 border-vh-green text-vh-green";
              else if (i === selected && i !== q.correct) cls = "bg-vh-red-light border-2 border-vh-red text-vh-red";
              else cls = "bg-white border-2 border-gray-100 text-gray-300";
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`rounded-2xl p-4 text-sm font-bold text-center transition-all duration-200 ${cls} ${
                  selected === null ? "active:scale-95" : ""
                }`}
                disabled={selected !== null}
              >
                {ans}
                {selected !== null && i === q.correct && (
                  <span className="block text-lg mt-1">✓</span>
                )}
                {selected !== null && i === selected && i !== q.correct && (
                  <span className="block text-lg mt-1">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback banner */}
        {selected !== null && (
          <div
            className={`rounded-2xl px-4 py-3 text-center font-bold text-sm ${
              selected === q.correct
                ? "bg-vh-green-light text-vh-green"
                : "bg-vh-red-light text-vh-red"
            }`}
            style={{ animation: "fade-up 0.25s ease-out both" }}
          >
            {selected === q.correct
              ? "🎉 Chính xác! Tuyệt vời!"
              : `❌ Đáp án đúng là: ${q.answers[q.correct]}`}
          </div>
        )}
      </div>
    </div>
  );
}
