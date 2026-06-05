import AppHeader from "@/components/AppHeader";
import Link from "next/link";
import { Play, Clock, Flame, Trophy, ChevronRight, Zap } from "lucide-react";

const upcomingClass = {
  subject: "Toán lớp 4",
  topic: "Phép chia có dư",
  teacher: "Cô Minh Anh",
  time: "20:00 – 21:00",
  today: true,
  minutesLeft: 28,
};

const recentLessons = [
  { id: 1, title: "Phép nhân với số có 2 chữ số", subject: "Toán", progress: 100, grade: 4 },
  { id: 2, title: "Đọc hiểu: Cánh đồng lúa", subject: "Tiếng Việt", progress: 80, grade: 4 },
  { id: 3, title: "Family members – vocabulary", subject: "Tiếng Anh", progress: 60, grade: 4 },
];

const subjects = [
  { name: "Toán", emoji: "🔢", color: "bg-blue-50 text-vh-blue border-blue-100", href: "/bai-hoc" },
  { name: "Tiếng Việt", emoji: "📖", color: "bg-green-50 text-vh-green border-green-100", href: "/bai-hoc" },
  { name: "Tiếng Anh", emoji: "🌍", color: "bg-orange-50 text-vh-orange border-orange-100", href: "/bai-hoc" },
  { name: "Luyện tập", emoji: "✏️", color: "bg-purple-50 text-purple-600 border-purple-100", href: "/luyen-tap" },
];

export default function HomePage() {
  return (
    <div className="bg-vh-bg min-h-screen">
      <AppHeader showAvatar />

      {/* Blue greeting area */}
      <div className="bg-vh-blue-dark px-4 pb-6 pt-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-200 text-sm">Buổi tối,</p>
            <h2 className="text-white text-xl font-black mt-0.5">Minh Anh ✨</h2>
          </div>
          <div className="bg-white/10 rounded-2xl px-3 py-2 text-center">
            <div className="flex items-center gap-1 text-vh-orange">
              <Flame size={14} />
              <span className="text-white font-black text-lg leading-none">12</span>
            </div>
            <p className="text-blue-200 text-[10px] mt-0.5">ngày liên tiếp</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex gap-3 mt-4">
          {[
            { label: "Buổi học", value: "8/16", sub: "tuần này" },
            { label: "Bài hoàn thành", value: "24", sub: "bài học" },
            { label: "Điểm TB", value: "8.5", sub: "/ 10" },
          ].map((s) => (
            <div key={s.label} className="flex-1 bg-white/10 rounded-xl p-2 text-center">
              <p className="text-white font-black text-base leading-none">{s.value}</p>
              <p className="text-blue-200 text-[10px] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-4">
        {/* Upcoming class card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vh-green animate-pulse" />
              <span className="text-xs font-semibold text-vh-green">Sắp bắt đầu</span>
            </div>
            <span className="text-xs text-vh-sub bg-orange-50 text-vh-orange font-semibold px-2 py-0.5 rounded-full">
              Còn {upcomingClass.minutesLeft} phút
            </span>
          </div>

          <h3 className="font-bold text-vh-text text-base">{upcomingClass.topic}</h3>
          <p className="text-vh-sub text-sm mt-0.5">{upcomingClass.subject} · {upcomingClass.teacher}</p>

          <div className="flex items-center gap-1 mt-1.5 text-vh-sub text-xs">
            <Clock size={12} />
            <span>{upcomingClass.time} · Hôm nay</span>
          </div>

          <Link
            href="/lich-hoc"
            className="mt-3 w-full bg-vh-blue text-white rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-2"
          >
            <Play size={14} fill="white" />
            Vào lớp ngay
          </Link>
        </div>

        {/* Subjects */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-vh-text text-sm">Môn học</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {subjects.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className={`border rounded-xl p-2.5 flex flex-col items-center gap-1 ${s.color}`}
              >
                <span className="text-xl">{s.emoji}</span>
                <span className="text-[10px] font-bold text-center leading-tight">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Continue learning */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-vh-text text-sm">Tiếp tục học</h3>
            <Link href="/bai-hoc" className="text-xs text-vh-blue font-semibold flex items-center gap-0.5">
              Xem tất cả <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-vh-blue-light flex items-center justify-center flex-shrink-0 text-lg">
                  {lesson.subject === "Toán" ? "🔢" : lesson.subject === "Tiếng Việt" ? "📖" : "🌍"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-vh-text truncate">{lesson.title}</p>
                  <p className="text-xs text-vh-sub">{lesson.subject} · Lớp {lesson.grade}</p>
                  <div className="mt-1.5 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-vh-blue"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-vh-sub font-semibold flex-shrink-0">{lesson.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI suggestion nudge */}
        <div className="bg-gradient-to-r from-vh-blue-dark to-vh-blue rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap size={18} className="text-vh-orange" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm">AI gợi ý cho hôm nay</p>
            <p className="text-blue-200 text-xs mt-0.5 line-clamp-2">
              Ôn lại "Phép chia có dư" trước buổi live tối nay – chỉ 15 phút!
            </p>
          </div>
          <Link
            href="/luyen-tap"
            className="bg-vh-orange text-white text-xs font-bold px-3 py-1.5 rounded-xl flex-shrink-0"
          >
            Ôn ngay
          </Link>
        </div>

        {/* Leaderboard teaser */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <Trophy size={22} className="text-vh-yellow flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-vh-text text-sm">Bảng xếp hạng tuần</p>
            <p className="text-xs text-vh-sub">Con đang xếp hạng #7 trong lớp 🎉</p>
          </div>
          <ChevronRight size={16} className="text-vh-sub" />
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
