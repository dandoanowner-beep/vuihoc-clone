import AppHeader from "@/components/AppHeader";
import { Zap, Clock, Target, ChevronRight, Star } from "lucide-react";

const dailyMissions = [
  {
    id: 1,
    title: "Ôn lại Phép chia có dư",
    subject: "Toán lớp 4",
    duration: "15 phút",
    questions: 10,
    difficulty: "Trung bình",
    priority: true,
    emoji: "🔢",
    reason: "AI phát hiện con cần ôn phần này trước buổi học tối nay",
  },
  {
    id: 2,
    title: "Chính tả nghe viết – Bài 12",
    subject: "Tiếng Việt lớp 4",
    duration: "10 phút",
    questions: 5,
    difficulty: "Dễ",
    priority: false,
    emoji: "📖",
    reason: null,
  },
  {
    id: 3,
    title: "Vocabulary – Unit 3: Family",
    subject: "Tiếng Anh lớp 4",
    duration: "10 phút",
    questions: 8,
    difficulty: "Dễ",
    priority: false,
    emoji: "🌍",
    reason: null,
  },
];

const recentResults = [
  { id: 1, title: "Phép nhân 2 chữ số", subject: "Toán", correct: 9, total: 10, date: "Hôm qua" },
  { id: 2, title: "Đọc hiểu – Cánh đồng lúa", subject: "Tiếng Việt", correct: 8, total: 10, date: "2 ngày trước" },
  { id: 3, title: "School things – Unit 2", subject: "Tiếng Anh", correct: 7, total: 10, date: "3 ngày trước" },
];

const diffColors: Record<string, string> = {
  "Dễ": "bg-vh-green-light text-vh-green",
  "Trung bình": "bg-vh-yellow-light text-vh-yellow",
  "Khó": "bg-vh-red-light text-vh-red",
};

export default function LuyenTapPage() {
  return (
    <div className="bg-vh-bg min-h-screen">
      <AppHeader title="Luyện tập" back />

      {/* Header stats */}
      <div className="bg-vh-orange px-4 pb-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white font-black text-xl">12</p>
            <p className="text-white/70 text-[10px] mt-0.5">ngày liên tiếp</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white font-black text-xl">85%</p>
            <p className="text-white/70 text-[10px] mt-0.5">độ chính xác</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white font-black text-xl">240</p>
            <p className="text-white/70 text-[10px] mt-0.5">bài đã làm</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* AI Daily missions */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-vh-orange" />
            <h2 className="text-sm font-bold text-vh-text">AI gợi ý hôm nay</h2>
          </div>

          <div className="space-y-3">
            {dailyMissions.map((m) => (
              <div
                key={m.id}
                className={`bg-white rounded-2xl p-4 shadow-sm ${
                  m.priority ? "border-2 border-vh-orange" : ""
                }`}
              >
                {m.priority && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Zap size={11} className="text-vh-orange" />
                    <span className="text-[10px] font-bold text-vh-orange uppercase tracking-wide">
                      Ưu tiên cao
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-vh-blue-bg flex items-center justify-center text-xl flex-shrink-0">
                    {m.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-vh-text text-sm">{m.title}</p>
                    <p className="text-xs text-vh-sub mt-0.5">{m.subject}</p>

                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-vh-sub">
                        <Clock size={10} /> {m.duration}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-vh-sub">
                        <Target size={10} /> {m.questions} câu
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${diffColors[m.difficulty]}`}>
                        {m.difficulty}
                      </span>
                    </div>

                    {m.reason && (
                      <p className="mt-2 text-[11px] text-vh-blue bg-vh-blue-bg px-2 py-1.5 rounded-lg">
                        💡 {m.reason}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  className={`mt-3 w-full rounded-xl py-2.5 text-sm font-bold ${
                    m.priority
                      ? "bg-vh-orange text-white"
                      : "bg-vh-blue-bg text-vh-blue"
                  }`}
                >
                  Bắt đầu luyện tập
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent results */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-vh-text">Kết quả gần đây</h2>
            <button className="text-xs text-vh-blue font-semibold flex items-center gap-0.5">
              Xem tất cả <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {recentResults.map((r) => {
              const pct = Math.round((r.correct / r.total) * 100);
              return (
                <div key={r.id} className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="14" fill="none"
                        stroke={pct >= 80 ? "#16A34A" : pct >= 60 ? "#D97706" : "#DC2626"}
                        strokeWidth="3"
                        strokeDasharray={`${pct * 0.879} 87.9`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-vh-text">
                      {pct}%
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-vh-text truncate">{r.title}</p>
                    <p className="text-xs text-vh-sub">{r.subject} · {r.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black text-vh-text">{r.correct}/{r.total}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < Math.round(pct / 20) ? "text-vh-yellow fill-vh-yellow" : "text-gray-200 fill-gray-200"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
