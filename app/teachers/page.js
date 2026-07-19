import { createClient } from "../../lib/supabase/server";

export const revalidate = 60;

export default async function TeachersPage() {
  const supabase = createClient();
  const { data: teachers } = await supabase
    .from("teachers")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium text-primary mb-8">O'qituvchilar</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {(teachers || []).map((t) => (
          <div key={t.id} className="border rounded-lg p-4 shadow-sm">
            {t.photo_url && (
              <img src={t.photo_url} alt={t.full_name} className="w-24 h-24 rounded-full object-cover mb-3" />
            )}
            <h2 className="font-medium text-primary">{t.full_name}</h2>
            <p className="text-sm text-muted">{t.subject}</p>
            {t.experience_years && (
              <p className="text-sm text-muted">Ish tajribasi: {t.experience_years} yil</p>
            )}
            {t.bio && <p className="text-sm mt-2">{t.bio}</p>}
            {t.phone && <p className="text-sm mt-2">Tel: {t.phone}</p>}
          </div>
        ))}
        {(!teachers || teachers.length === 0) && (
          <p className="text-muted">Hozircha o'qituvchilar ro'yxati qo'shilmagan.</p>
        )}
      </div>
    </div>
  );
}
