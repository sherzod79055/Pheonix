import { createClient } from "../../lib/supabase/server";

export const revalidate = 60;

export default async function EventsPage() {
  const supabase = createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium text-primary mb-8">Tadbirlar</h1>
      <div className="space-y-4">
        {(events || []).map((e) => (
          <div key={e.id} className="border rounded-lg p-4">
            <h2 className="font-medium text-primary">{e.title}</h2>
            <p className="text-sm text-muted">
              {new Date(e.event_date).toLocaleString("uz-UZ")} {e.location && `· ${e.location}`}
            </p>
            {e.description && <p className="text-sm mt-1">{e.description}</p>}
          </div>
        ))}
        {(!events || events.length === 0) && (
          <p className="text-muted">Hozircha tadbirlar qo'shilmagan.</p>
        )}
      </div>
    </div>
  );
}
