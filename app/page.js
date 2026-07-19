import { createClient } from "../lib/supabase/server";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = createClient();
  const { data: info } = await supabase.from("school_info").select("*").limit(1).maybeSingle();
  const { data: latestNews } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <div>
      <section className="bg-primary text-white flex items-center justify-center min-h-[70vh] px-4 text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-medium mb-4">
            {info?.school_name || "Bag'dod tuman ixtisoslashtirilgan maktabi"}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            {info?.tagline || "Kelajak bugundan boshlanadi"}
          </p>
          <a
            href="/about"
            className="bg-secondary text-primary font-medium py-3 px-6 rounded hover:opacity-90 transition inline-block"
          >
            Batafsil ma'lumot
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-medium mb-6 text-primary">So'nggi yangiliklar</h2>
        {latestNews && latestNews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((n) => (
              <article key={n.id} className="border rounded-lg overflow-hidden shadow-sm">
                {n.photo_url && (
                  <img src={n.photo_url} alt={n.title} className="w-full h-44 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="font-medium text-primary mb-1">{n.title}</h3>
                  <p className="text-sm text-muted line-clamp-3">{n.content}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-muted">
            Hozircha yangiliklar qo'shilmagan. Admin panel orqali birinchi yangilikni qo'shing.
          </p>
        )}
      </section>
    </div>
  );
}
