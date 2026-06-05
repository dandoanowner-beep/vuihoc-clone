"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, RefreshCw, Check } from "lucide-react";

const topicSets = [
  [
    { emoji: "🔢", title: "Đố toán vui", prompt: 'Con vừa học Phép chia có dư. Thử đặt 1 bài toán cho ba/mẹ giải nào? Ví dụ: "Có 17 cái kẹo chia đều cho 5 bạn, mỗi bạn được mấy cái? Thừa mấy cái?"' },
    { emoji: "🤔", title: "Giải thích cho ba/mẹ", prompt: "Ba/mẹ giả vờ không biết Phép chia có dư. Con hãy giải thích quy tắc bằng lời của con nhé!" },
    { emoji: "🌍", title: "Toán trong cuộc sống", prompt: "Phép chia có dư hay dùng ở đâu trong cuộc sống thật? (Gợi ý: chia kẹo, xếp hàng, mua đồ...)" },
    { emoji: "⭐", title: "Điều con thích nhất", prompt: "Hôm nay con học được điều gì thú vị nhất? Điều gì khó nhất với con?" },
  ],
  [
    { emoji: "🧮", title: "Kiểm tra nhanh", prompt: "Ba/mẹ hỏi: 29 ÷ 6 = ? Con trả lời được không? (Đáp án: 4 dư 5)" },
    { emoji: "📐", title: "Công thức bí mật", prompt: "Con nhớ công thức kiểm tra kết quả phép chia không? Đọc cho ba/mẹ nghe xem nào!" },
    { emoji: "🏆", title: "Thành tích hôm nay", prompt: "Hôm nay con học được gì mới? Con cảm thấy phần nào khó nhất và phần nào dễ nhất?" },
    { emoji: "💡", title: "Mẹo học hay", prompt: "Con có mẹo gì để nhớ công thức phép chia nhanh không? Chia sẻ với ba/mẹ đi!" },
  ],
  [
    { emoji: "🎯", title: "Thử thách ba/mẹ", prompt: "Con ra đề: 43 ÷ 5 = ? Ba/mẹ phải trả lời trong 10 giây! (Đáp án: 8 dư 3)" },
    { emoji: "📖", title: "Kể câu chuyện toán", prompt: "Con hãy kể 1 câu chuyện ngắn có dùng phép chia cho ba/mẹ nghe — sáng tạo nhất có thể!" },
    { emoji: "🌟", title: "Gương sáng học tập", prompt: "Con nghĩ điều gì giúp con học giỏi hơn tuần này? Ba/mẹ rất muốn nghe!" },
    { emoji: "🔍", title: "Tìm lỗi sai", prompt: "Ba/mẹ tính sai: 31 ÷ 7 = 5 dư 1. Con tìm lỗi và sửa lại nhé! (Đúng: 4 dư 3)" },
  ],
];

export default function ChuDePage() {
  const [setIdx, setSetIdx] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const topics = topicSets[setIdx];

  if (confirmed) {
    return (
      <div
        className="min-h-screen bg-vh-bg flex flex-col items-center justify-center px-6 text-center"
        style={{ animation: "fade-up 0.4s ease-out both" }}
      >
        <div className="text-6xl mb-4">🌙</div>
        <h1 className="text-xl font-black text-vh-text mb-2">Chúc bữa tối vui!</h1>
        <p className="text-vh-sub text-sm mb-6 leading-relaxed">
          Một cuộc trò chuyện nhỏ tối nay sẽ giúp Minh Anh nhớ bài lâu hơn rất nhiều.
        </p>
        <Link href="/so-lien-lac" className="w-full max-w-xs bg-vh-blue text-white font-black py-4 rounded-2xl text-base">
          Về Sổ Liên Lạc 🏠
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-vh-bg min-h-screen" style={{ animation: "slide-up-enter 0.3s ease-out both" }}>

      {/* Header */}
      <div className="bg-vh-orange px-4 pt-10 pb-4 flex items-center gap-3">
        <Link href="/so-lien-lac" className="p-1.5 bg-white/15 rounded-xl">
          <ChevronLeft size={20} className="text-white" />
        </Link>
        <div>
          <h1 className="text-white font-black text-base">💬 Trò chuyện tối nay</h1>
          <p className="text-white/70 text-xs">AI gợi ý chủ đề từ bài học hôm nay</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">

        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-vh-green">
          <p className="text-sm text-vh-text leading-relaxed">
            Minh Anh vừa học <strong>Phép chia có dư</strong> hôm nay. Dùng một trong những gợi ý bên dưới để trò chuyện cùng con trong bữa tối nhé — nhẹ nhàng thôi, không cần kiểm tra!
          </p>
        </div>

        {/* Topic cards */}
        <div className="space-y-3">
          {topics.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm"
              style={{ animation: `fade-up 0.3s ease-out ${i * 0.08}s both` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{t.emoji}</span>
                <p className="font-bold text-vh-text text-sm">{t.title}</p>
              </div>
              <p className="text-sm text-vh-sub leading-relaxed italic">"{t.prompt}"</p>
            </div>
          ))}
        </div>

        {/* Regenerate */}
        <button
          onClick={() => setSetIdx((i) => (i + 1) % topicSets.length)}
          className="w-full border-2 border-vh-blue-light text-vh-blue font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2"
        >
          <RefreshCw size={15} />
          Làm mới gợi ý
        </button>

        {/* Confirm */}
        <button
          onClick={() => setConfirmed(true)}
          className="w-full bg-vh-green text-white font-black py-4 rounded-2xl text-base flex items-center justify-center gap-2"
        >
          <Check size={18} />
          Bắt đầu trò chuyện tối nay!
        </button>

        <div className="h-2" />
      </div>
    </div>
  );
}
