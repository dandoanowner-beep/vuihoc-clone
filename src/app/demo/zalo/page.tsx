"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Zap, AlignJustify, UserPlus, Ban, MoreHorizontal } from "lucide-react";

export default function ZaloDemoPage() {
  const router = useRouter();
  const [giftSent, setGiftSent] = useState(false);

  const handleSendGift = () => {
    setGiftSent(true);
    setTimeout(() => router.push("/qua?gender=female"), 900);
  };

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto flex flex-col"
      style={{ background: "#DDE8F5" }}
    >
      {/* ── Fake Android status bar ── */}
      <div
        className="flex items-center justify-between px-4 pt-2.5 pb-1"
        style={{ background: "#0B6CF5" }}
      >
        <span className="text-white text-xs font-bold">20:47</span>
        <div className="flex items-center gap-2">
          {/* signal + wifi + battery */}
          <svg width="16" height="10" viewBox="0 0 16 10" fill="white" opacity="0.9">
            <rect x="0" y="6" width="2.5" height="4" rx="0.5"/>
            <rect x="3.5" y="4" width="2.5" height="6" rx="0.5"/>
            <rect x="7" y="2" width="2.5" height="8" rx="0.5"/>
            <rect x="10.5" y="0" width="2.5" height="10" rx="0.5"/>
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9">
            <path d="M0.5 3.5 Q7.5 -1 14.5 3.5"/>
            <path d="M2.5 6 Q7.5 2.5 12.5 6"/>
            <path d="M5 8.5 Q7.5 7 10 8.5"/>
            <circle cx="7.5" cy="10.5" r="0.8" fill="white" stroke="none"/>
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="bg-white/30 rounded-sm px-1 py-0.5">
              <span className="text-white text-[10px] font-black">53</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Zalo OA header ── */}
      <div
        className="flex items-center gap-3 px-3 py-3"
        style={{ background: "#0B6CF5" }}
      >
        <button onClick={() => router.back()} className="text-white p-0.5">
          <ArrowLeft size={22} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white text-[15px]">VuiHọc</span>
            {/* orange verified badge */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="#F97316" />
              <path
                d="M4.5 8l2.5 2.5 4.5-5"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-white/70 text-[11px]">Tài khoản OA</p>
        </div>

        <Zap size={21} className="text-white/85" />
        <AlignJustify size={21} className="text-white/85" />
      </div>

      {/* ── Quan tâm / Chặn bar ── */}
      <div className="flex bg-white border-b border-gray-200">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[13px] text-gray-700 font-medium border-r border-gray-200">
          <UserPlus size={15} className="text-blue-500" />
          Quan tâm
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[13px] text-gray-700 font-medium">
          <Ban size={15} className="text-gray-400" />
          Chặn
        </button>
      </div>

      {/* ── Chat area ── */}
      <div className="flex-1 px-3 py-5">

        {/* Timestamp pill */}
        <div className="flex justify-center mb-4">
          <span
            className="text-white text-[11px] font-medium px-3 py-0.5 rounded-full"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            20:47 Hôm nay
          </span>
        </div>

        {/* ── Message card ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Card top: logo + 3-dot */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            {/* VuiHoc logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base"
                style={{ background: "linear-gradient(135deg,#1469B4,#0B6CF5)" }}
              >
                V
              </div>
              <div>
                <p className="font-black text-[15px] leading-tight" style={{ color: "#0B6CF5" }}>
                  VuiHọc
                </p>
                <p className="text-[10px] text-gray-400 leading-tight">Official Account</p>
              </div>
            </div>

            {/* 3-dot button */}
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#EFF6FF" }}
            >
              <MoreHorizontal size={16} style={{ color: "#0B6CF5" }} />
            </button>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Card body */}
          <div className="px-4 py-3.5">
            <p className="font-black text-gray-900 text-[15px] mb-2.5">
              Báo cáo học tập hôm nay
            </p>
            <p className="text-[13px] text-gray-700 leading-relaxed mb-1">
              Xin chào <strong>Ba mẹ</strong>, bé{" "}
              <strong>Minh Anh</strong> đã hoàn thành bài tập tối
              ngày <strong>03/06/2026</strong>.
            </p>
            <p className="text-[13px] text-gray-700 leading-relaxed mb-1">
              Điểm số hôm nay: <strong>7,5 / 10</strong>
            </p>
            <p className="text-[13px] text-gray-700 leading-relaxed mb-1">
              Số câu đúng: <strong>18 / 24 câu (75%)</strong>
            </p>
            <p className="text-[13px] text-gray-700 leading-relaxed">
              Chuyên cần: <strong>Tốt</strong> — đã tham gia{" "}
              <strong>3/3 buổi học</strong> trong tuần.
            </p>
          </div>

          {/* Action buttons — divided by lines, no background */}
          <div className="border-t border-gray-200">
            <Link
              href="/so-lien-lac"
              className="block w-full text-center py-3.5 text-[14px] font-semibold text-gray-800 border-b border-gray-200 active:bg-gray-50 transition-colors"
            >
              Xem Kết quả
            </Link>
            <button
              onClick={handleSendGift}
              disabled={giftSent}
              className="w-full text-center py-3.5 text-[14px] font-semibold transition-colors"
              style={{ color: giftSent ? "#9CA3AF" : "#1F2937" }}
            >
              {giftSent
                ? "✅ Đã gửi hộp quà cho Minh Anh!"
                : "🎁 Gửi hộp quà động viên con"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick reply pills ── */}
      <div className="flex gap-2 px-3 py-2.5 bg-white border-t border-gray-200">
        <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-4 py-2 text-[12px] font-semibold text-gray-700 whitespace-nowrap">
          📊 Xem lịch học
        </button>
        <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-4 py-2 text-[12px] font-semibold text-gray-700 whitespace-nowrap">
          💬 Nhắn tin giáo viên
        </button>
      </div>

      {/* ── Input bar ── */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-t border-gray-100">
        <button className="text-xl text-gray-400">🗂️</button>
        <button className="text-xl text-gray-400">🙂</button>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-[13px] text-gray-400 select-none">
          Tin nhắn
        </div>
        <span className="text-gray-400 font-black text-base tracking-tight">···</span>
        <button className="text-xl text-gray-400">🎤</button>
        <button className="text-xl text-gray-400">🖼️</button>
      </div>
    </div>
  );
}
