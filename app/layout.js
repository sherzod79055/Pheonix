import "./globals.css";
import ChatWidget from "../components/ChatWidget";
import AdminHotkey from "../components/AdminHotkey";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Bag'dod tuman ixtisoslashtirilgan maktabi",
  description: "Bag'dod tuman ixtisoslashtirilgan maktabining rasmiy veb-sayti"
};

const navItems = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/about", label: "Maktab haqida" },
  { href: "/teachers", label: "O'qituvchilar" },
  { href: "/achievements", label: "Yutuqlar" },
  { href: "/news", label: "Yangiliklar" },
  { href: "/events", label: "Tadbirlar" },
  { href: "/gallery", label: "Galereya" },
  { href: "/admissions", label: "Qabul" },
  { href: "/contact", label: "Kontakt" }
];

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <header className="bg-primary text-white sticky top-0 z-40 shadow-md border-b border-white/10">
          <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-4 py-3 gap-2">
            <a href="/" className="flex items-center gap-3 font-heading font-semibold text-lg">
              <img src="/logo-gold-navy.png" alt="PIIMA" className="h-9 w-9" />
              Bag'dod IM
            </a>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-body">
              {navItems.slice(1).map((item) => (
                <a key={item.href} href={item.href} className="hover:text-secondary transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="bg-primary text-white mt-12 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-white/50">
            <p>&copy; {new Date().getFullYear()} Bag'dod tuman ixtisoslashtirilgan maktabi</p>
          </div>
        </footer>

        <ChatWidget />
        <AdminHotkey />
        <Analytics />
      </body>
    </html>
  );
}
