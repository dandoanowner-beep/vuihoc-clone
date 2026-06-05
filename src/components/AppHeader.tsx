import Link from "next/link";
import { Bell, ChevronLeft } from "lucide-react";

interface AppHeaderProps {
  title?: string;
  back?: boolean;
  showNotif?: boolean;
  showAvatar?: boolean;
}

export default function AppHeader({
  title,
  back = false,
  showNotif = true,
  showAvatar = false,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-vh-blue-dark text-white px-4 pt-10 pb-3 flex items-center gap-3">
      {back && (
        <Link href="/home" className="p-1">
          <ChevronLeft size={22} />
        </Link>
      )}

      {!back && (
        <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
          <span className="text-lg">🐱</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        {title ? (
          <h1 className="text-base font-bold truncate">{title}</h1>
        ) : (
          <>
            <h1 className="text-base font-black tracking-tight">
              Vui<span className="text-vh-orange">Học</span>
            </h1>
            <p className="text-blue-200 text-[10px]">Học vui – Tiến nhanh</p>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {showNotif && (
          <button className="relative p-1.5">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-vh-orange rounded-full" />
          </button>
        )}
        {showAvatar && (
          <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-sm font-bold text-vh-blue-dark">
            M
          </div>
        )}
      </div>
    </header>
  );
}
