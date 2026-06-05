import AppHeader from "@/components/AppHeader";
import { Clock, Video, Users } from "lucide-react";

const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const dates = [2, 3, 4, 5, 6, 7, 8];
const today = 3; // Tuesday (index 1)

const classes = [
  {
    id: 1,
    subject: "Toán lớp 4",
    topic: "Phép chia có dư",
    teacher: "Cô Minh Anh",
    time: "20:00 – 21:00",
    day: "Hôm nay",
    status: "upcoming",
    minutesLeft: 28,
    students: 24,
  },
  {
    id: 2,
    subject: "Tiếng Việt lớp 4",
    topic: "Chính tả – Nghe viết",
    teacher: "Thầy Hoàng Việt",
    time: "19:30 – 20:30",
    day: "Thứ 5 · 05/06",
    status: "scheduled",
    minutesLeft: null,
    students: 18,
  },
  {
    id: 3,
    subject: "Tiếng Anh lớp 4",
    topic: "Unit 3: My Family",
    teacher: "Cô Thu Linh",
    time: "20:00 – 21:00",
    day: "Thứ 6 · 06/06",
    status: "scheduled",
    minutesLeft: null,
    students: 22,
  },
  {
    id: 4,
    subject: "Toán lớp 4",
    topic: "Luyện tập phép chia",
    teacher: "Cô Minh Anh",
    time: "09:00 – 10:00",
    day: "Thứ 7 · 07/06",
    status: "scheduled",
    minutesLeft: null,
    students: 20,
  },
];

const pastClasses = [
  { id: 5, subject: "Toán", topic: "Phép nhân 2 chữ số", date: "Thứ 3 · 03/06", score: "9/10", attended: true },
  { id: 6, subject: "Tiếng Việt", topic: "Tập đọc – Hội thổi cơm", date: "Thứ 2 · 02/06", score: "8/10", attended: true },
  { id: 7, subject: "Tiếng Anh", topic: "Unit 2: School things", date: "Thứ 6 · 30/05", score: "7.5/10", attended: true },
];

const subjectColors: Record<string, string> = {
  "Toán lớp 4": "bg-blue-50 text-vh-blue",
  "Tiếng Việt lớp 4": "bg-green-50 text-vh-green",
  "Tiếng Anh lớp 4": "bg-orange-50 text-vh-orange",
};

const subjectEmojis: Record<string, string> = {
  "Toán lớp 4": "🔢",
  "Tiếng Việt lớp 4": "📖",
  "Tiếng Anh lớp 4": "🌍",
  "Toán": "🔢",
  "Tiếng Việt": "📖",
  "Tiếng Anh": "🌍",
};

export default function LichHocPage() {
  return (
    <div className="bg-vh-bg min-h-screen">
      <AppHeader title="Lịch học" back />

      {/* Week strip */}
      <div className="bg-vh-orange px-4 pb-4 pt-1">
        <div className="flex gap-1">
          {days.map((d, i) => (
            <div
              key={d}
              className={`flex-1 flex flex-col items-center py-2 rounded-xl ${
                i === 1 ? "bg-white" : "bg-white/10"
              }`}
            >
              <span className={`text-[10px] font-semibold ${i === 1 ? "text-vh-sub" : "text-white/70"}`}>{d}</span>
              <span className={`text-sm font-black mt-0.5 ${i === 1 ? "text-vh-orange" : "text-white"}`}>
                {dates[i]}
              </span>
              {(i === 1 || i === 3 || i === 4 || i === 5) && (
                <span className={`w-1 h-1 rounded-full mt-1 ${i === 1 ? "bg-vh-orange" : "bg-white/50"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Upcoming */}
        <div>
          <h2 className="text-sm font-bold text-vh-text mb-2">Sắp tới</h2>
          <div className="space-y-3">
            {classes.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      subjectColors[cls.subject] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {subjectEmojis[cls.subject]} {cls.subject}
                  </div>
                  {cls.status === "upcoming" ? (
                    <span className="text-xs bg-vh-orange-light text-vh-orange font-bold px-2 py-0.5 rounded-full">
                      Còn {cls.minutesLeft} phút
                    </span>
                  ) : (
                    <span className="text-xs text-vh-sub">{cls.day}</span>
                  )}
                </div>

                <h3 className="font-bold text-vh-text text-sm">{cls.topic}</h3>
                <p className="text-xs text-vh-sub mt-0.5">{cls.teacher}</p>

                <div className="flex items-center gap-4 mt-2 text-xs text-vh-sub">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {cls.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={11} /> {cls.students} học sinh
                  </span>
                </div>

                {cls.status === "upcoming" && (
                  <button className="mt-3 w-full bg-vh-blue text-white rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-2">
                    <Video size={14} />
                    Vào lớp học
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Past classes */}
        <div>
          <h2 className="text-sm font-bold text-vh-text mb-2">Đã học</h2>
          <div className="space-y-2">
            {pastClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                  {subjectEmojis[cls.subject]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-vh-text truncate">{cls.topic}</p>
                  <p className="text-xs text-vh-sub">{cls.subject} · {cls.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-vh-green">{cls.score}</p>
                  <p className="text-[10px] text-vh-sub">điểm</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
