import { createClient } from "../../lib/supabase/server";
import TiltCard from "../../components/TiltCard";

export const revalidate = 60;

export default async function TeachersPage() {
  const supabase = createClient();
  const { data: teachers } = await supabase
    .from("teachers")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-medium text-primary mb-8">O'qituvchilar</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {(teachers || []).map((t) => (
          <TiltCard key={t.id} className="floating-card border border-black/5 rounded-xl p-4 bg-white">
            {t.photo_url && (
              <img src={t.photo_url} alt={t.full_name} className="w-24 h-24 rounded-full object-cover mb-3" />
            )}
            <h2 className="font-heading font-medium text-primary">{t.full_name}</h2>
            <p className="text-sm text-muted font-body">{t.subject}</p>
            {t.experience_years && (
              <p className="text-sm text-muted font-body">Ish tajribasi: {t.experience_years} yil</p>
            )}
            {t.bio && <p className="text-sm mt-2 font-body">{t.bio}</p>}
            {t.phone && <p className="text-sm mt-2 font-body">Tel: {t.phone}</p>}
          </TiltCard>
        ))}
        {(!teachers || teachers.length === 0) && (
          <p className="text-muted">Hozircha o'qituvchilar ro'yxati qo'shilmagan.</p>
        )}
      </div>
    </div>
  );
}
