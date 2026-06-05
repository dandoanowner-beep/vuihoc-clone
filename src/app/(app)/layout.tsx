import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen max-w-[430px] mx-auto bg-vh-bg">
      <main className="pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
