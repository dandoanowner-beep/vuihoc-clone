import AppHeader from "@/components/AppHeader";
import { Play, Lock, CheckCircle, ChevronRight } from "lucide-react";

const subjects = [
  { id: "toan", name: "Toán", emoji: "🔢", active: true },
  { id: "viet", name: "Tiếng Việt", emoji: "📖", active: false },
  { id: "anh", name: "Tiếng Anh", emoji: "🌍", active: false },
];

const chapters = [
  {
    id: 1,
    title: "Chương 1: Ôn tập và bổ sung",
    progress: 100,
    lessons: [
      { id: 1, title: "Triệu và lớp triệu", duration: "25 phút", status: "done" },
      { id: 2, title: "Các số đến lớp triệu", duration: "20 phút", status: "done" },
      { id: 3, title: "Dãy số tự nhiên", duration: "22 phút", status: "done" },
    ],
  },
  {
    id: 2,
    title: "Chương 2: Phép nhân và phép chia",
    progress: 55,
    lessons: [
      { id: 4, title: "Phép nhân với số có 2 chữ số", duration: "28 phút", status: "done" },
      { id: 5, title: "Nhân với số có 3 chữ số", duration: "30 phút", status: "done" },
      { id: 6, title: "Phép chia có dư", duration: "25 phút", status: "current" },
      { id: 7, title: "Chia cho số có 2 chữ số", duration: "30 phút", status: "locked" },
      { id: 8, title: "Luyện tập phép chia", duration: "25 phút", status: "locked" },
    ],
  },
  {
    id: 3,
    title: "Chương 3: Hình học",
    progress: 0,
    lessons: [
      { id: 9, title: "Góc nhọn, góc tù, góc bẹt", duration: "22 phút", status: "locked" },
      { id: 10, title: "Hai đường thẳng vuông góc", duration: "20 phút", status: "locked" },
    ],
  },
];

const statusConfig = {
  done: { icon: <CheckCircle size={16} className="text-vh-green" />, bg: "bg-vh-green-light" },
  current: { icon: <Play size={14} className="text-white" fill="white" />, bg: "bg-vh-blue" },
  locked: { icon: <Lock size={14} className="text-gray-400" />, bg: "bg-gray-100" },
};

export default function BaiHocPage() {
  return (
    <div className="bg-vh-bg min-h-screen">
      <AppHeader title="Bài học" back />

      {/* Subject tabs */}
      <div className="bg-vh-orange px-4 pb-4 pt-1">
        <div className="flex gap-2">
          {subjects.map((s) => (
            <button
              key={s.id}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                s.active
                  ? "bg-white text-vh-orange"
                  : "bg-white/15 text-white/80"
              }`}
            >
              <span>{s.emoji}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        {/* Progress summary */}
        <div className="mt-3 bg-white/10 rounded-xl p-3 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-white text-sm font-bold">Toán lớp 4</p>
            <p className="text-white/70 text-xs">8/16 chương · 24/48 bài học</p>
          </div>
          <div className="text-right">
            <p className="text-white font-black text-lg">50%</p>
            <p className="text-white/70 text-[10px]">hoàn thành</p>
          </div>
        </div>

        <div className="mt-2 bg-white/20 rounded-full h-2">
          <div className="bg-vh-orange h-2 rounded-full" style={{ width: "50%" }} />
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Chapter header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-vh-text text-sm">{chapter.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-vh-blue h-1.5 rounded-full"
                      style={{ width: `${chapter.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-vh-sub font-semibold flex-shrink-0">
                    {chapter.progress}%
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 ml-3 flex-shrink-0" />
            </div>

            {/* Lessons */}
            <div className="divide-y divide-gray-50">
              {chapter.lessons.map((lesson) => {
                const config = statusConfig[lesson.status as keyof typeof statusConfig];
                return (
                  <div
                    key={lesson.id}
                    className={`px-4 py-3 flex items-center gap-3 ${
                      lesson.status === "locked" ? "opacity-50" : ""
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg}`}
                    >
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-vh-text">{lesson.title}</p>
                      <p className="text-xs text-vh-sub">{lesson.duration}</p>
                    </div>
                    {lesson.status === "current" && (
                      <span className="text-xs bg-vh-blue-light text-vh-blue font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                        Đang học
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
