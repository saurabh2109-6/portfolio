"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogOut, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    setMounted(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, [supabase]);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ];

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) return null;

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-50 bg-[#0b061e]/70 backdrop-blur-xl border border-white/5 shadow-[0_0_30px_rgba(139,92,246,0.15)] rounded-full px-6 py-3 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-bold gradient-text tracking-wider uppercase">
          PORTFOLIO
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredLink(item.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-5 py-2 text-[10px] sm:text-xs font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              {hoveredLink === item.name && (
                <motion.div
                  layoutId="navHover"
                  className="absolute inset-0 bg-purple-500/10 rounded-full border border-purple-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
          
          {/* Admin/Logout Button */}
          {mounted && (
            user ? (
              <Link
                href="/admin"
                className="ml-4 px-5 py-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] rounded-full text-[10px] sm:text-xs font-bold transition-all border border-purple-500/30 flex items-center gap-2 uppercase tracking-wider"
              >
                <ShieldAlert className="w-3 h-3" /> Admin
              </Link>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-5 py-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] rounded-full text-[10px] sm:text-xs font-bold transition-all border border-purple-500/30 flex items-center gap-2 uppercase tracking-wider"
              >
                <ShieldAlert className="w-3 h-3" /> Admin
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-purple-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-40 bg-[#0b061e]/90 backdrop-blur-3xl border border-purple-500/20 shadow-2xl rounded-3xl p-6 md:hidden flex flex-col space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-center py-4 rounded-xl text-sm font-bold text-gray-300 hover:bg-purple-500/10 hover:text-purple-300 transition-colors uppercase tracking-[0.2em] border border-transparent hover:border-purple-500/30"
              >
                {item.name}
              </Link>
            ))}
            {mounted && (
              <div className="pt-4 border-t border-purple-500/20 flex justify-center">
                {user ? (
                  <Link href="/admin" onClick={() => setIsOpen(false)} className="px-8 py-3 bg-purple-600/20 text-purple-400 rounded-full text-xs font-bold border border-purple-500/30 uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Admin Panel
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)} className="px-8 py-3 bg-purple-600/20 text-purple-400 rounded-full text-xs font-bold border border-purple-500/30 uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Admin Panel
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
