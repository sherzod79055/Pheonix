import { createClient } from "../../lib/supabase/server";

export const revalidate = 60;

export default async function GalleryPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium text-primary mb-8">Galereya</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(items || []).map((g) => (
          <img
            key={g.id}
            src={g.url}
            alt={g.caption || "Maktab galereyasi"}
            className="w-full h-40 object-cover rounded"
          />
        ))}
        {(!items || items.length === 0) && (
          <p className="text-muted col-span-full">Hozircha rasmlar qo'shilmagan.</p>
        )}
      </div>
    </div>
  );
}
