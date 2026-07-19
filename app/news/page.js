import { createClient } from "../../lib/supabase/server";

export const revalidate = 60;

export default async function NewsPage() {
  const supabase = createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium text-primary mb-8">Yangiliklar</h1>
      <div className="space-y-8">
        {(news || []).map((n) => (
          <article key={n.id} className="flex flex-col md:flex-row gap-4 border-b pb-6">
            {n.photo_url && (
              <img src={n.photo_url} alt={n.title} className="w-full md:w-56 h-40 object-cover rounded" />
            )}
            <div>
              <h2 className="text-xl font-medium text-primary mb-1">{n.title}</h2>
              <p className="text-sm text-gray-700">{n.content}</p>
              <span className="text-xs text-gray-400">
                {new Date(n.published_at).toLocaleDateString("uz-UZ")}
              </span>
            </div>
          </article>
        ))}
        {(!news || news.length === 0) && (
          <p className="text-muted">Hozircha yangiliklar qo'shilmagan.</p>
        )}
      </div>
    </div>
  );
}
