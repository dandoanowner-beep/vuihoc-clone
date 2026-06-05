import Link from "next/link";
import { BookOpen, Star, Users } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-vh-blue-dark px-6 py-10">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <span className="text-4xl">🐱</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Vui<span className="text-vh-orange">Học</span>
        </h1>
        <p className="text-blue-200 text-sm mt-1">Học vui – Tiến nhanh – Học thật</p>
      </div>

      {/* Stats */}
      <div className="flex gap-8 mb-8">
        {[
          { icon: <BookOpen size={16} />, label: "9.000+ bài học" },
          { icon: <Users size={16} />, label: "500K+ học sinh" },
          { icon: <Star size={16} />, label: "4.8★ đánh giá" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center text-blue-200">
            {s.icon}
            <span className="text-xs mt-1 whitespace-nowrap">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Auth card */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-vh-text mb-5 text-center">Đăng nhập</h2>

        <input
          type="text"
          placeholder="Số điện thoại / Email"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 outline-none bg-gray-50"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-2 outline-none bg-gray-50"
        />
        <div className="text-right mb-5">
          <span className="text-xs text-vh-blue font-semibold cursor-pointer">Quên mật khẩu?</span>
        </div>

        <Link
          href="/home"
          className="block w-full bg-vh-blue text-white text-center font-bold py-3 rounded-xl text-sm"
        >
          Đăng nhập
        </Link>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-vh-sub">hoặc</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button className="w-full border border-gray-200 rounded-xl py-3 text-sm font-medium text-vh-text flex items-center justify-center gap-2">
          <span className="font-bold text-red-500">G</span> Tiếp tục bằng Google
        </button>

        <p className="text-center text-xs text-vh-sub mt-5">
          Chưa có tài khoản?{" "}
          <span className="text-vh-orange font-bold cursor-pointer">Đăng ký miễn phí</span>
        </p>
      </div>

      {/* Demo shortcuts */}
      <div className="mt-6 flex flex-col items-center gap-2 text-sm">
        <p className="text-blue-300 text-xs">Demo prototype:</p>
        <div className="flex gap-4">
          <Link href="/home" className="text-blue-200 underline underline-offset-2 text-xs">
            Giao diện học sinh
          </Link>
          <span className="text-blue-400">|</span>
          <Link href="/phu-huynh" className="text-vh-orange font-bold underline underline-offset-2 text-xs">
            Dashboard Phụ huynh ✨ MỚI
          </Link>
        </div>
      </div>
    </div>
  );
}
