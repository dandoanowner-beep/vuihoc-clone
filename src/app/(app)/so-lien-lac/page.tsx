"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Bell, ChevronDown, ChevronRight, Sparkles, BookOpen, Calendar, Clock, Star } from "lucide-react";

/* ─── Mock data ─────────────────────────────── */
const child = { name: "Minh Anh", grade: "Lớp 4", lastActive: "20:30 · Hôm nay", avatar: "M" };

const statusByStars: Record<number, { label: string; bg: string; text: string }> = {
  5: { label: "Xuất sắc! 🌟",    bg: "bg-orange-100", text: "text-vh-orange" },
  4: { label: "Tốt lắm! 👍",     bg: "bg-green-100",  text: "text-vh-green"  },
  3: { label: "Tiềm năng 💪",    bg: "bg-blue-100",   text: "text-vh-blue"   },
  2: { label: "Cần cố gắng 📚",  bg: "bg-yellow-100", text: "text-vh-yellow" },
  1: { label: "Cần hỗ trợ 🤝",   bg: "bg-red-100",    text: "text-vh-red"    },
};

const weakSkill = { name: "Phép chia có dư", subject: "Toán" };

const indicators = [
  { key: "score",       label: "Điểm số",          emoji: "📊", value: 75, color: "#1469B4", bg: "#EFF6FF" },
  { key: "effort",      label: "Nỗ lực & Kiên trì", emoji: "💪", value: 82, color: "#16A34A", bg: "#DCFCE7" },
  { key: "focus",       label: "Tập trung",          emoji: "🎯", value: 58, color: "#DC2626", bg: "#FEE2E2" },
  { key: "resilience",  label: "Sửa lỗi",            emoji: "🔄", value: 70, color: "#D97706", bg: "#FEF3C7" },
  { key: "consistency", label: "Đều đặn",            emoji: "📅", value: 88, color: "#7C3AED", bg: "#EDE9FE" },
];

const aiCommentByPeriod: Record<string, string> = {
  ngay: "Minh Anh hôm nay hoàn thành 1 buổi luyện tập, nỗ lực tốt (82%) nhưng chỉ số tập trung còn thấp (58%) — bé hay làm vội. Điểm 7.5 là ổn, cần chú ý kiểm tra lại bước tính số dư.",
  tuan: "Minh Anh tuần này rất chăm chỉ — duy trì đều đặn 88% và nỗ lực đáng khen (82%). Điểm 7.5 là kết quả ổn, nhưng bé đang có xu hướng đoán mò ở phần Phép chia có dư (tập trung chỉ đạt 58%). Chỉ cần luyện thêm 10 phút là con sẽ vượt ngưỡng 8 điểm!",
  thang: "Tháng này Minh Anh duy trì học đều đặn (88%), điểm trung bình cả tháng đạt 7.5/10. Điểm mạnh: phép nhân và đọc hiểu. Cần cải thiện: phép chia có dư và chính tả. Xu hướng tập trung đang giảm nhẹ — ba mẹ chú ý nhắc con làm chậm lại và kiểm tra kết quả.",
};

const dandoItems = [
  "Nhắc con đọc kỹ đề bài trước khi tính — không cần vội.",
  'Sau mỗi phép chia, hỏi con: "Số dư có nhỏ hơn số chia không?"',
  "Khen ngợi con khi con tự sửa lỗi, không chỉ khi làm đúng.",
];

const schedule = [
  { day: "Thứ 3", time: "20:00", subject: "Toán lớp 4",       teacher: "Cô Minh Anh", emoji: "🔢", today: true },
  { day: "Thứ 5", time: "19:30", subject: "Tiếng Việt lớp 4", teacher: "Thầy Hoàng",  emoji: "📖" },
  { day: "Thứ 6", time: "20:00", subject: "Tiếng Anh lớp 4",  teacher: "Cô Thu Linh", emoji: "🌍" },
  { day: "Thứ 7", time: "09:00", subject: "Toán (ôn tập)",     teacher: "Cô Minh Anh", emoji: "🔢" },
];

type Period = "ngay" | "tuan" | "thang";
const PERIODS: { key: Period; label: string; sublabel: string }[] = [
  { key: "ngay",  label: "Ngày",  sublabel: "03/06" },
  { key: "tuan",  label: "Tuần",  sublabel: "2–8/6" },
  { key: "thang", label: "Tháng", sublabel: "T6/2026" },
];

/* ─── Page ──────────────────────────────────── */
export default function SoLienLacPage() {
  return (
    <Suspense>
      <SoLienLacContent />
    </Suspense>
  );
}

function SoLienLacContent() {
  const searchParams = useSearchParams();
  const SCORE = parseFloat(searchParams.get("score") ?? "7.5");
  const starCount = SCORE >= 9 ? 5 : SCORE >= 8 ? 4 : SCORE >= 7 ? 3 : SCORE >= 6 ? 2 : 1;

  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<Period>("tuan");
  const [showPicker, setShowPicker] = useState(false);
  const [showZaloModal, setShowZaloModal] = useState(false);
  const [zaloSent, setZaloSent] = useState(false);
  const status = statusByStars[starCount];

  const handleSendZalo = () => {
    setShowZaloModal(false);
    setZaloSent(true);
    setTimeout(() => setZaloSent(false), 3000);
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="bg-vh-bg min-h-screen">

      {/* ── Orange header ── */}
      <div className="bg-vh-orange px-4 pt-10 pb-3">
        <div className="flex items-center justify-between">
          <div className="w-9" />
          <h1 className="text-white font-bold text-base tracking-wide">Sổ Liên Lạc</h1>
          <button className="relative w-9 h-9 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-white/70 flex items-center justify-center">
              <Bell size={16} className="text-white" />
            </div>
            <span className="absolute top-1 right-0.5 w-2 h-2 bg-white rounded-full" />
          </button>
        </div>
      </div>

      {/* ── Child row only ── */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-vh-orange flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            {child.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-vh-text font-bold text-sm">{child.name}</p>
            <p className="text-vh-sub text-xs">{child.grade} · TH Đống Đa</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] text-vh-sub">Hoạt động cuối</p>
            <p className="text-vh-text text-xs font-semibold">{child.lastActive}</p>
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="px-4 py-4 space-y-4">

        {/* ── "Kết quả Học" title row ── */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-vh-text">Kết quả Học 🔥</h2>
          <button className="text-xs text-vh-orange font-semibold">Tất cả</button>
        </div>

        {/* ── Snapshot card ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">

          {/* Time period dropdown — centered at top of card */}
          <div className="flex justify-center mb-3">
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
                      onClick={() => { setPeriod(key as Period); setShowPicker(false); }}
                      className={`w-full text-left px-4 py-2 text-sm whitespace-nowrap ${period === key ? "font-black text-vh-text bg-orange-50" : "font-medium text-vh-sub hover:bg-gray-50"}`}
                    >
                      {label} — {sublabel}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status badge */}
          <div className="flex justify-center mb-3">
            <span className="bg-vh-green text-white text-sm font-bold px-5 py-1.5 rounded-full">
              {status.label}
            </span>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={32}
                className={i <= starCount ? "text-vh-blue fill-vh-blue" : "text-gray-200 fill-gray-200"}
                style={{
                  transition: `opacity 300ms ease ${i * 80}ms, transform 300ms ease ${i * 80}ms`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "scale(1)" : "scale(0.6)",
                }}
              />
            ))}
          </div>

          {/* Two metric cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Chuyên cần */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
              <div className="w-8 h-8 bg-vh-orange rounded-lg flex items-center justify-center mb-2">
                <Calendar size={16} className="text-white" />
              </div>
              <p className="text-xs text-vh-sub mb-0.5">Chuyên cần</p>
              <p className="text-xl font-black text-vh-text leading-tight">Tốt</p>
              <p className="text-xs text-vh-sub mt-1 mb-3">Tham gia: 3/3 buổi</p>
              <div className="bg-vh-orange text-white text-xs font-bold text-center py-1.5 rounded-full">
                45 phút
              </div>
            </div>

            {/* Subject score */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
              <div className="w-8 h-8 bg-vh-orange rounded-lg flex items-center justify-center mb-2">
                <BookOpen size={16} className="text-white" />
              </div>
              <p className="text-xs text-vh-sub mb-0.5">Toán học</p>
              <p className="text-xl font-black text-vh-text leading-tight">{SCORE.toLocaleString("vi-VN")} điểm</p>
              <p className="text-xs text-vh-sub mt-1 mb-3">Làm: 24 câu</p>
              <div className="bg-vh-orange text-white text-xs font-bold text-center py-1.5 rounded-full">
                {Math.round(SCORE * 10)}% đúng
              </div>
            </div>
          </div>

          {/* AI comment — green box with teacher */}
          <div className="bg-green-50 rounded-xl p-3 mb-4">
            <p className="text-sm text-vh-text leading-relaxed mb-3">
              {aiCommentByPeriod[period]}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-vh-orange flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                MA
              </div>
              <p className="text-xs text-vh-sub font-semibold">Cô Minh Anh – GV chủ nhiệm</p>
            </div>
          </div>

          {/* Xem chi tiết link */}
          <Link
            href="/so-lien-lac/chi-tiet"
            className="flex items-center justify-center gap-1 text-vh-orange font-semibold text-sm"
          >
            Xem chi tiết báo cáo tuần <ChevronRight size={15} />
          </Link>
        </div>

        {/* ── Ba mẹ cần làm gì ── */}
        <div
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
          style={{ animation: mounted ? "fade-up 0.4s ease-out 0.8s both" : "none", opacity: mounted ? undefined : 0 }}
        >
          <div className="bg-vh-orange px-4 py-3 flex items-center gap-2">
            <span className="text-white text-base">💡</span>
            <h2 className="text-white font-black text-sm">Ba mẹ cần làm gì?</h2>
          </div>
          <div className="px-4 py-4">
            {SCORE < 8 ? (
              <>
                <p className="text-sm text-vh-text leading-relaxed mb-3">
                  {child.name} đang vướng ở phần <strong>{weakSkill.name}</strong>. 10 phút luyện tập cùng con tối nay sẽ giúp bé tự tin hơn trước buổi học ngày mai.
                </p>
                <ul className="space-y-2 mb-3">
                  {dandoItems.slice(0, 2).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-vh-text leading-snug">
                      <span className="text-vh-orange font-black flex-shrink-0 mt-0.5">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/so-lien-lac/muoi-phut"
                  className="flex items-center justify-between bg-vh-orange text-white rounded-xl px-4 py-3 font-bold text-sm"
                >
                  <span>⏱ 10 phút cùng con</span>
                  <ChevronRight size={16} />
                </Link>
              </>
            ) : SCORE < 9 ? (
              <>
                <p className="text-sm text-vh-sub leading-relaxed mb-2">
                  💡 Con còn một vài lỗi nhỏ ở phần <strong>{weakSkill.name}</strong> — chủ yếu do làm hơi vội, chưa kiểm tra lại kết quả.
                </p>
                <p className="text-sm text-vh-text leading-relaxed mb-4">
                  {child.name} đang tiến bộ rất tốt! Nếu con muốn luyện thêm thì ba mẹ cùng con thử nhé — đừng ép, chỉ cần con cảm thấy vui là được.
                </p>
                <Link
                  href="/luyen-tap"
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-bold text-sm border border-slate-300 bg-slate-50 text-slate-600"
                >
                  <span>📖 Luyện tập thêm</span>
                  <ChevronRight size={16} />
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm text-vh-text leading-relaxed mb-2">
                  {child.name} đang học rất tốt tuần này! Hãy trò chuyện với con về những gì con học được hôm nay.
                </p>
                <p className="text-sm text-vh-sub leading-relaxed mb-3">
                  💡 Con nên kiểm tra lại bài sau khi làm xong — một vài lỗi nhỏ có thể tránh được nếu đọc lại đề một lần nữa.
                </p>
                <Link
                  href="/so-lien-lac/chu-de"
                  className="flex items-center justify-between bg-vh-green text-white rounded-xl px-4 py-3 font-bold text-sm"
                >
                  <span>💬 Chọn chủ đề trò chuyện tối nay</span>
                  <ChevronRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ── Dặn dò tuần tới ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={15} className="text-vh-blue flex-shrink-0" />
            <h2 className="font-bold text-vh-text text-sm">Dặn dò tuần tới</h2>
          </div>
          <ul className="space-y-2">
            {dandoItems.slice(2).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-vh-text leading-snug">
                <span className="text-vh-orange font-black flex-shrink-0 mt-0.5">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Lịch học tuần này ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={15} className="text-vh-orange flex-shrink-0" />
            <h2 className="font-bold text-vh-text text-sm">Lịch học tuần này</h2>
          </div>
          <div className="space-y-2">
            {schedule.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                  s.today ? "bg-orange-50 border border-orange-100" : "bg-gray-50"
                }`}
              >
                <span className="text-base flex-shrink-0">{s.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-vh-text truncate">{s.subject}</p>
                  <p className="text-xs text-vh-sub">{s.teacher}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {s.today && <p className="text-[10px] font-bold text-vh-orange mb-0.5">Hôm nay</p>}
                  <div className="flex items-center gap-1 text-xs text-vh-sub justify-end">
                    <Clock size={10} />
                    <span>{s.day} · {s.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-2 text-center">
          <p className="text-[10px] text-vh-sub">🐱 VuiHọc · Cập nhật sau mỗi buổi học</p>
        </div>
      </div>
    </div>
  );
}
