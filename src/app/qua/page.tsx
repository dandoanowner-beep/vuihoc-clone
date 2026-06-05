"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const CONFETTI_COLORS = [
  "#F97316", "#1469B4", "#16A34A", "#FBBF24",
  "#EC4899", "#A855F7", "#EF4444", "#14B8A6",
];

/* Deterministic spread so SSR & client match */
const PIECES = Array.from({ length: 28 }, (_, i) => ({
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: Math.round(((i * 3.7) % 95) + 2),
  delay: parseFloat(((i % 7) * 0.09).toFixed(2)),
  duration: parseFloat((1.1 + (i % 5) * 0.18).toFixed(2)),
  size: 8 + (i % 3) * 4,
}));

function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PIECES.map((p, i) => (
        <div
          key={i}
          className="absolute top-4 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `confetti-drop ${p.duration}s ${p.delay}s ease-in both`,
          }}
        />
      ))}
    </div>
  );
}

export default function QuaPage() {
  return (
    <Suspense>
      <QuaContent />
    </Suspense>
  );
}

function QuaContent() {
  const searchParams = useSearchParams();
  const isFemale = searchParams.get("gender") !== "male";
  const [phase, setPhase] = useState<"idle" | "shaking" | "opened">("idle");

  const prize = isFemale
    ? { emoji: "👑", label: "Vương miện công chúa", color: "#F59E0B" }
    : { emoji: "🥇", label: "Huy chương vàng", color: "#EAB308" };

  const handleTap = () => {
    if (phase === "opened") return;
    if (phase === "idle") {
      setPhase("shaking");
      setTimeout(() => setPhase("opened"), 600);
    }
  };

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto flex flex-col items-center justify-center relative overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(160deg, #FFF7ED 0%, #EFF6FF 55%, #F0FDF4 100%)",
      }}
    >
      {phase === "opened" && <Confetti />}

      <div className="text-center px-6 relative z-10">
        {/* Message card from parent */}
        <div className="bg-white rounded-2xl px-5 py-4 shadow-md mb-10 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">
              🐱
            </div>
            <p className="text-[11px] text-gray-400">Ba mẹ · vừa xong</p>
          </div>
          <p className="text-sm text-gray-700 leading-snug">
            💛 Ba mẹ rất tự hào về{" "}
            <strong>{isFemale ? "Minh Anh" : "con"}</strong> hôm nay!
            Mở quà nhé!
          </p>
        </div>

        {/* Gift box or prize */}
        {phase !== "opened" ? (
          <>
            <button
              onClick={handleTap}
              className="text-[104px] leading-none mb-6 block mx-auto active:scale-95 transition-transform"
              style={{
                animation:
                  phase === "shaking"
                    ? "gift-shake 0.55s ease-in-out both"
                    : "float 2.4s ease-in-out infinite",
                filter:
                  "drop-shadow(0 10px 24px rgba(249,115,22,0.28))",
              }}
              aria-label="Chạm để mở hộp quà"
            >
              🎁
            </button>

            <p className="text-vh-text font-black text-xl mb-2">
              Chạm để mở! 🎀
            </p>
            <p className="text-vh-sub text-sm">
              Ba mẹ gửi tặng con một hộp quà đặc biệt
            </p>
          </>
        ) : (
          <>
            <div
              className="text-[104px] leading-none mb-6 block"
              style={{
                animation: "prize-pop 0.65s cubic-bezier(0.34,1.56,0.64,1) both",
                filter: `drop-shadow(0 10px 28px ${prize.color}55)`,
              }}
            >
              {prize.emoji}
            </div>

            <p
              className="font-black text-2xl mb-3"
              style={{
                color: prize.color,
                animation: "celebrate-text 1.2s ease-in-out infinite",
              }}
            >
              {prize.label}!
            </p>

            <p className="text-vh-text font-bold text-base mb-1.5">
              Tuyệt vời{isFemale ? ", Minh Anh" : ""}! 🌟
            </p>
            <p className="text-vh-sub text-sm leading-snug">
              Ba mẹ tự hào về con. Tiếp tục cố gắng nhé!
            </p>
          </>
        )}
      </div>
    </div>
  );
}
