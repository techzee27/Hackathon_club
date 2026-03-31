"use client";

import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import { CopySlash, LayoutDashboard, CalendarDays, Users, LogOut, Ticket, TrophyIcon, Settings, Bell, Search, MessageSquare, MessageCircle, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      redirect("/");
    }
  }, [user]);

  if (!user || user.role !== "admin") return null;

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/bookings", label: "Bookings", icon: Ticket },
    { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
    { href: "/admin/events", label: "Events", icon: TrophyIcon },
    { href: "/admin/participants", label: "Participants", icon: Users },
    { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
    { href: "/admin/discussions", label: "Discussions", icon: MessageCircle },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-[#eaecf1] flex flex-col items-stretch z-20 shadow-sm relative">
        <div className="p-6 flex items-center gap-2 mb-2">
          <div className="bg-fuchsia-600 p-1.5 rounded-lg flex items-center justify-center">
            <CopySlash className="h-5 w-5 text-white" />
          </div>
          <Link href="/admin" className="text-xl font-bold tracking-tighter text-slate-800">
            HackClub
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-6 custom-scrollbar">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || (pathname === '/admin' && link.href === '/admin');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all group",
                  active
                    ? "bg-[#fff0f7] text-fuchsia-600"
                    : "text-slate-500 hover:bg-[#f8f9fb] hover:text-slate-800"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-fuchsia-600" : "text-slate-400 group-hover:text-slate-600")} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Promo Card & Logout Bottom */}
        <div className="p-4 mt-auto">
          <button
            className="flex items-center gap-3 w-full px-4 py-3 text-[15px] font-medium text-slate-600 bg-[#f1f3f7] hover:bg-[#e6e9f0] rounded-xl transition-colors"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 text-slate-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-[80px] bg-transparent flex items-center justify-between px-8 shrink-0 relative z-10 w-full">
          {/* Header Left: Dynamic Page Title block handled in page, leaving empty here or reserved */}
          <div className="flex-1 min-w-0 flex items-center pr-8" id="header-left">
            {/* Target for portals or just flexible space */}
          </div>

          <div className="flex items-center gap-5 justify-end w-full max-w-3xl">
            {/* Public Links */}
            <nav className="hidden lg:flex items-center gap-6 mr-4">
              <Link href="/" className="text-sm font-bold text-slate-500 hover:text-fuchsia-600 transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-bold text-slate-500 hover:text-fuchsia-600 transition-colors">About</Link>
              <Link href="/team" className="text-sm font-bold text-slate-500 hover:text-fuchsia-600 transition-colors">Team</Link>
              <Link href="/events" className="text-sm font-bold text-slate-500 hover:text-fuchsia-600 transition-colors">Events</Link>
              <Link href="/gallery" className="text-sm font-bold text-slate-500 hover:text-fuchsia-600 transition-colors">Gallery</Link>
            </nav>

            <button className="h-10 w-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md shrink-0 relative hover:bg-indigo-700 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-indigo-600"></span>
            </button>
            <button className="h-10 w-10 bg-[#34446a] text-white rounded-full flex items-center justify-center shrink-0 shadow-md hover:bg-[#253251] transition-colors">
              <Settings className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="hidden lg:block text-right">
                <p className="text-sm font-bold text-slate-800 leading-tight">Orlando Laurentius</p>
                <p className="text-xs font-medium text-slate-500">Admin</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=orlando" alt="User Avatar" className="h-10 w-10 rounded-full border-2 border-white shadow-sm shrink-0 object-cover" />
            </div>
          </div>
        </header>
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto w-full px-8 pb-8 custom-scrollbar relative z-0">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>

          <footer className="mt-12 border-t border-slate-200 pt-6 pb-2 text-xs text-slate-400 flex flex-col md:flex-row justify-between items-center max-w-[1600px] mx-auto gap-4">
            <p>Copyright © 2026 HackClub - All rights reserved</p>
            <div className="flex gap-4 font-medium text-slate-500">
              <Link href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-800 transition-colors">Term and conditions</Link>
              <Link href="#" className="hover:text-slate-800 transition-colors">Contact</Link>
            </div>
          </footer>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
