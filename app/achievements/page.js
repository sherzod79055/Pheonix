import { createClient } from "../../lib/supabase/server";
import TiltCard from "../../components/TiltCard";

export const revalidate = 60;

export default async function AchievementsPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("achievements")
    .select("*")
    .order("achieved_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-medium text-primary mb-8">Yutuqlar</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {(items || []).map((a) => (
          <TiltCard key={a.id} className="floating-card border border-black/5 rounded-xl p-4 flex gap-4 bg-white">
            {a.photo_url && (
              <img src={a.photo_url} alt={a.title} className="w-24 h-24 object-cover rounded shrink-0" />
            )}
            <div>
              <h2 className="font-heading font-medium text-primary">{a.title}</h2>
              <p className="text-sm text-muted font-body">
                {a.person_name} {a.category && `· ${a.category}`}
              </p>
              {a.description && <p className="text-sm mt-1 font-body">{a.description}</p>}
            </div>
          </TiltCard>
        ))}
        {(!items || items.length === 0) && (
          <p className="text-muted">Hozircha yutuqlar qo'shilmagan.</p>
        )}
      </div>
    </div>
  );
}
