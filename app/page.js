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
      <section className="bg-primary text-white flex items-center justify-center min-h-[75vh] px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12), transparent 60%)"
        }} />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-semibold mb-4 bg-gradient-to-r from-white via-white to-secondary bg-clip-text text-transparent">
            {info?.school_name || "Bag'dod tuman ixtisoslashtirilgan maktabi"}
          </h1>
          <p className="text-lg md:text-xl mb-10 text-white/80 font-body">
            {info?.tagline || "Kelajak bugundan boshlanadi"}
          </p>
          <a
            href="/about"
            className="glass-panel text-secondary font-medium py-3 px-8 rounded-full hover:shadow-goldGlow transition-shadow inline-block border border-secondary/30"
          >
            Batafsil ma'lumot
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-heading font-medium mb-8 text-primary">So'nggi yangiliklar</h2>
        {latestNews && latestNews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((n) => (
              <article key={n.id} className="floating-card border border-black/5 rounded-xl overflow-hidden bg-white">
                {n.photo_url && (
                  <img src={n.photo_url} alt={n.title} className="w-full h-44 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="font-heading font-medium text-primary mb-1">{n.title}</h3>
                  <p className="text-sm text-muted line-clamp-3 font-body">{n.content}</p>
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
