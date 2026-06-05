"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown, TrendingUp, BookOpen, Sparkles, CheckCircle2, AlertCircle, BarChart2, Activity } from "lucide-react";

type Period = "ngay" | "tuan" | "thang";
const PERIODS: { key: Period; label: string; sublabel: string }[] = [
  { key: "ngay",  label: "Ngày",  sublabel: "03/06" },
  { key: "tuan",  label: "Tuần",  sublabel: "2–8/6" },
  { key: "thang", label: "Tháng", sublabel: "T6/2026" },
];

const subjects = [
  { name: "Toán lớp 4",       emoji: "🔢", chapter: "Chương 2 · Phép chia", completed: 8,  total: 16, pct: 50 },
  { name: "Tiếng Việt lớp 4", emoji: "📖", chapter: "Unit 5 · Chính tả",    completed: 10, total: 18, pct: 56 },
  { name: "Tiếng Anh lớp 4",  emoji: "🌍", chapter: "Unit 3 · My Family",   completed: 6,  total: 14, pct: 43 },
];

const skills = [
  { name: "Phép nhân",         subject: "Toán",          score: 92, status: "great" as const },
  { name: "Đọc hiểu",          subject: "Tiếng Việt",    score: 85, status: "good"  as const },
  { name: "Từ vựng TA",        subject: "Tiếng Anh",     score: 70, status: "ok"    as const },
  { name: "Chính tả",          subject: "Tiếng Việt",    score: 62, status: "ok"    as const },
  { name: "Phép chia có dư",   subject: "Toán",          score: 45, status: "weak"  as const },
];

const weekStats = [
  { label: "Buổi live",      value: "3/3" },
  { label: "Luyện tập",      value: "45 phút" },
  { label: "Điểm TB",        value: "7.5/10" },
];

const scoreDetail = [
  { subject: "Toán lớp 4",       emoji: "🔢", score: 7.5, max: 10, correct: 18, total: 24 },
  { subject: "Tiếng Việt lớp 4", emoji: "📖", score: 8.2, max: 10, correct: 15, total: 18 },
  { subject: "Tiếng Anh lớp 4",  emoji: "🌍", score: 6.8, max: 10, correct: 10, total: 14 },
];

const indicators = [
  { key: "effort",      label: "Nỗ lực & Kiên trì", emoji: "💪", value: 82, color: "#16A34A", bg: "bg-green-50",  bar: "bg-green-500",  note: "Hoàn thành bài đúng hạn" },
  { key: "focus",       label: "Tập trung",          emoji: "🎯", value: 58, color: "#DC2626", bg: "bg-red-50",    bar: "bg-red-500",    note: "Hay làm vội, đoán mò" },
  { key: "resilience",  label: "Sửa lỗi",            emoji: "🔄", value: 70, color: "#D97706", bg: "bg-amber-50",  bar: "bg-amber-500",  note: "Tự sửa được phần lớn lỗi" },
  { key: "consistency", label: "Đều đặn",            emoji: "📅", value: 88, color: "#7C3AED", bg: "bg-purple-50", bar: "bg-purple-500", note: "Học đều 5/7 ngày trong tuần" },
];

const statusCfg = {
  great: { label: "GIỎI",    bar: "bg-vh-green", badge: "bg-vh-green-light text-vh-green",    emoji: "🟢" },
  good:  { label: "TỐT",     bar: "bg-vh-blue",  badge: "bg-vh-blue-light text-vh-blue",       emoji: "🔵" },
  ok:    { label: "ỔN",      bar: "bg-vh-yellow", badge: "bg-vh-yellow-light text-vh-yellow",  emoji: "🟡" },
  weak:  { label: "CẦN ÔN",  bar: "bg-vh-red",   badge: "bg-vh-red-light text-vh-red",         emoji: "🔴" },
};

export default function ChiTietPage() {
  const [entered, setEntered] = useState(false);
  const [barsLoaded, setBarsLoaded] = useState(false);
  const [period, setPeriod] = useState<Period>("tuan");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setEntered(true);
      setTimeout(() => setBarsLoaded(true), 200);
    });
  }, []);

  const weakSkill = skills.find((s) => s.status === "weak")!;

  return (
    <div
      className="bg-vh-bg min-h-screen"
      style={{ animation: "slide-up-enter 0.35s cubic-bezier(0.2,0.8,0.2,1) both" }}
    >
      {/* Header */}
      <div className="bg-vh-orange px-4 pt-10 pb-4 flex items-center gap-3">
        <Link href="/so-lien-lac" className="p-1.5 bg-white/15 rounded-xl">
          <ChevronLeft size={20} className="text-white" />
        </Link>
        <div>
          <h1 className="text-white font-black text-base">Báo cáo chi tiết</h1>
          <p className="text-blue-200 text-xs">Minh Anh · Tuần 8 · 2–8/6/2026</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* ── Period picker ── */}
        <div className="flex justify-center">
          <div className="relative">
            <button
              onClick={() => setShowPicker(v => !v)}
              className="inline-flex items-center gap-0.5 text-sm font-black text-vh-text focus:outline-none"
            >
              {(() => { const p = PERIODS.find(p => p.key === period)!; return `${p.label} — ${p.sublabel}`; })()}
              <ChevronDown size={13} className="text-vh-text flex-shrink-0" />
            </button>
            {showPicker && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
                {PERIODS.map(({ key, label, sublabel }) => (
                  <button
                    key={key}
                    onClick={() => { setPeriod(key); setShowPicker(false); }}
                    className={`w-full text-left px-4 py-2 text-sm whitespace-nowrap ${period === key ? "font-black text-vh-text bg-orange-50" : "font-medium text-vh-sub hover:bg-gray-50"}`}
                  >
                    {label} — {sublabel}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Week stats ── */}
        <div className="grid grid-cols-3 gap-2">
          {weekStats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-3 text-center shadow-sm">
              <p className="font-black text-vh-text text-base">{s.value}</p>
              <p className="text-[10px] text-vh-sub mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Score detail ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-50 flex items-center gap-2">
            <BarChart2 size={14} className="text-vh-orange" />
            <h2 className="font-bold text-vh-text text-sm">Điểm số chi tiết</h2>
          </div>
          <div className="px-4 py-3 divide-y divide-gray-50">
            {scoreDetail.map((s) => (
              <div key={s.subject} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.emoji}</span>
                    <p className="text-sm font-semibold text-vh-text">{s.subject}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-vh-text">{s.score.toLocaleString("vi-VN")}</span>
                    <span className="text-xs text-vh-sub font-normal">/{s.max}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{
                        width: barsLoaded ? `${(s.score / s.max) * 100}%` : "0%",
                        backgroundColor: s.score >= 8 ? "#16A34A" : s.score >= 6.5 ? "#F97316" : "#DC2626",
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-vh-sub flex-shrink-0">{s.correct}/{s.total} câu đúng</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Subject progress ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-50 flex items-center gap-2">
            <BookOpen size={14} className="text-vh-blue" />
            <h2 className="font-bold text-vh-text text-sm">Con đang học đến đâu?</h2>
          </div>
          <div className="px-4 py-3 divide-y divide-gray-50">
            {subjects.map((s) => (
              <div key={s.name} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-vh-text">{s.name}</p>
                      <p className="text-[11px] text-vh-sub">{s.chapter}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-vh-blue">{s.pct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-vh-blue h-2 rounded-full transition-all duration-700"
                      style={{ width: barsLoaded ? `${s.pct}%` : "0%" }}
                    />
                  </div>
                  <span className="text-[10px] text-vh-sub flex-shrink-0">{s.completed}/{s.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4 learning indicators ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-50 flex items-center gap-2">
            <Activity size={14} className="text-vh-blue" />
            <h2 className="font-bold text-vh-text text-sm">4 chỉ số học tập</h2>
          </div>
          <div className="px-4 py-3 space-y-3">
            {indicators.map((ind) => (
              <div key={ind.key} className={`rounded-xl p-3 ${ind.bg}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{ind.emoji}</span>
                    <p className="text-sm font-bold text-vh-text">{ind.label}</p>
                  </div>
                  <span className="text-sm font-black" style={{ color: ind.color }}>{ind.value}%</span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex-1 bg-white/70 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${ind.bar}`}
                      style={{ width: barsLoaded ? `${ind.value}%` : "0%" }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-vh-sub">{ind.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Skill map ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-50 flex items-center gap-2">
            <TrendingUp size={14} className="text-vh-green" />
            <h2 className="font-bold text-vh-text text-sm">Con mạnh / yếu ở đâu?</h2>
          </div>
          <div className="px-4 py-3 space-y-3">
            {skills.map((sk) => {
              const cfg = statusCfg[sk.status];
              return (
                <div key={sk.name} className="flex items-center gap-3">
                  <span className="text-sm flex-shrink-0">{cfg.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-vh-text">
                        {sk.name}
                        <span className="text-vh-sub font-normal ml-1">· {sk.subject}</span>
                      </p>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${cfg.badge}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-700 ${cfg.bar}`}
                          style={{ width: barsLoaded ? `${sk.score}%` : "0%" }}
                        />
                      </div>
                      <span className="text-[10px] text-vh-sub font-semibold w-8 text-right">{sk.score}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex items-start gap-2 bg-vh-red-light rounded-xl px-3 py-2.5 mt-1">
              <AlertCircle size={13} className="text-vh-red flex-shrink-0 mt-0.5" />
              <p className="text-xs text-vh-red leading-relaxed">
                <strong>Cần chú ý:</strong> {weakSkill.name} ({weakSkill.score}%) — con trả lời sai 3/5 câu trong bài kiểm tra gần nhất.
              </p>
            </div>
          </div>
        </div>

        {/* ── AI next step ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-50 flex items-center gap-2">
            <Sparkles size={14} className="text-vh-orange" />
            <h2 className="font-bold text-vh-text text-sm">Gợi ý AI cho tuần tới</h2>
          </div>
          <div className="px-4 py-4">
            <div className="border-2 border-vh-orange rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-vh-orange-light rounded-xl flex items-center justify-center text-xl flex-shrink-0">🔢</div>
                <div>
                  <p className="font-black text-vh-text text-sm">Ôn bài "{weakSkill.name}"</p>
                  <p className="text-xs text-vh-sub mt-0.5">Toán lớp 4 · Chương 2 · 15 phút</p>
                </div>
              </div>
              <p className="text-xs text-vh-blue bg-vh-blue-bg rounded-xl px-3 py-2 leading-relaxed mb-3">
                💡 Con có buổi Toán tối nay lúc 20:00. Ôn trước 15 phút giúp con hiểu bài nhanh hơn và tự tin phát biểu.
              </p>
              <Link
                href="/so-lien-lac/muoi-phut"
                className="w-full bg-vh-orange text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                ⏱ 10 phút cùng con
              </Link>
            </div>
          </div>
        </div>

        {/* ── Weekly AI summary ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-50 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-vh-green" />
            <h2 className="font-bold text-vh-text text-sm">Tóm tắt tuần AI</h2>
          </div>
          <div className="px-4 py-4">
            <div className="bg-vh-blue-bg border border-vh-blue-light rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles size={11} className="text-vh-blue" />
                <span className="text-[10px] font-bold text-vh-blue uppercase tracking-wide">AI tóm tắt</span>
              </div>
              <p className="text-xs text-vh-text leading-relaxed">
                <strong>Minh Anh</strong> hoàn thành xuất sắc phần Phép nhân (9/10 câu đúng) và duy trì đều đặn 3 buổi live. Điểm yếu đang ở phần Phép chia có dư — con hay làm vội dẫn đến đoán mò. Nên ôn lại quy tắc kiểm tra số dư trước buổi học ngày mai để chuẩn bị tốt hơn.
              </p>
            </div>
          </div>
        </div>

        <Link href="/so-lien-lac" className="flex items-center justify-center gap-2 text-sm text-vh-sub py-2">
          <ChevronLeft size={14} />
          Quay về Sổ Liên Lạc
        </Link>

        <div className="h-2" />
      </div>
    </div>
  );
}
