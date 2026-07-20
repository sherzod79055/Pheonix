"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

const sections = [
  { href: "/admin/settings", label: "Maktab ma'lumotlari" },
  { href: "/admin/teachers", label: "O'qituvchilar" },
  { href: "/admin/achievements", label: "Yutuqlar" },
  { href: "/admin/news", label: "Yangiliklar" },
  { href: "/admin/events", label: "Tadbirlar" },
  { href: "/admin/gallery", label: "Galereya" }
];

export default function AdminDashboard() {
  const supabase = createClient();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/panel-7f2k9");
    router.refresh();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-primary">Admin panel</h1>
        <button onClick={handleLogout} className="text-sm text-red-600 underline">
          Chiqish
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border rounded-lg p-6 text-center font-medium text-primary hover:bg-gray-50"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
