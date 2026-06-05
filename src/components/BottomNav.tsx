"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, BookOpen, PenLine } from "lucide-react";

function FamilyHeartIcon({ active }: { active: boolean }) {
  const c = active ? "#1469B4" : "#9CA3AF";
  const h = active ? "#F97316" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="5.5" r="2" stroke={c} strokeWidth="1.8" />
      <path d="M4.5 14v-2.8A2.5 2.5 0 0 1 7 8.7a2.5 2.5 0 0 1 2.5 2.5V14" stroke={c} strokeWidth="1.8" />
      <circle cx="17" cy="5.5" r="2" stroke={c} strokeWidth="1.8" />
      <path d="M14.5 14v-2.8a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5V14" stroke={c} strokeWidth="1.8" />
      <path
        d="M12 21.5-1.55-1.42C7.2 17.3 5 15.3 5 12.7A3.4 3.4 0 0 1 8.4 9.3c1.1 0 2.1.5 2.8 1.3l.8.9.8-.9a3.9 3.9 0 0 1 2.8-1.3A3.4 3.4 0 0 1 19 12.7c0 2.6-2.2 4.6-5.45 7.38L12 21.5z"
        fill={active ? h : "none"}
        stroke={h}
        strokeWidth="1.5"
      />
    </svg>
  );
}

const tabs = [
  { href: "/home",      icon: (a: boolean) => <Home size={20} strokeWidth={a ? 2.5 : 1.8} />,       label: "Trang chủ",   orange: true },
  { href: "/lich-hoc",  icon: (a: boolean) => <Calendar size={20} strokeWidth={a ? 2.5 : 1.8} />,   label: "Lịch học",    orange: true },
  { href: "/bai-hoc",   icon: (a: boolean) => <BookOpen size={20} strokeWidth={a ? 2.5 : 1.8} />,   label: "Bài học",     orange: true },
  { href: "/luyen-tap", icon: (a: boolean) => <PenLine size={20} strokeWidth={a ? 2.5 : 1.8} />,    label: "Luyện tập",   orange: true },
  { href: "/so-lien-lac", icon: (a: boolean) => <FamilyHeartIcon active={a} />,                      label: "Sổ Liên Lạc", isNew: true },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 shadow-lg z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ href, icon, label, isNew, orange }) => {
          const active = pathname === href || pathname.startsWith(href + "/") && href !== "/home";
          const activeBg   = orange ? "bg-orange-100"  : "bg-vh-blue-light";
          const activeText = orange ? "text-vh-orange"  : "text-vh-blue";
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-0.5 relative px-2 py-1 min-w-[56px]">
              <div className={`p-1.5 rounded-xl transition-colors ${active ? activeBg : ""}`}>
                <span className={active ? activeText : "text-gray-400"}>{icon(active)}</span>
              </div>
              <span className={`text-[9px] font-semibold text-center leading-tight ${active ? activeText : "text-gray-400"}`}>
                {label}
              </span>
              {isNew && (
                <span className="absolute -top-0.5 right-0 bg-vh-orange text-white text-[8px] font-bold px-1 rounded-full leading-4">
                  MỚI
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
