import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export default async function AdminLayout({ children }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const path = typeof window === "undefined" ? "" : "";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <AuthGate user={user}>{children}</AuthGate>
    </div>
  );
}

function AuthGate({ user, children }) {
  // /login o'zi bu layout ostida emas (alohida sahifa bo'lgani uchun bu yerga tekshiruv kifoya)
  if (!user) {
    redirect("/login");
  }
  return children;
}
