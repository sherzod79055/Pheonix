import { createClient } from "../../lib/supabase/server";

export default async function ContactPage() {
  const supabase = createClient();
  const { data: info } = await supabase.from("school_info").select("*").limit(1).maybeSingle();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium text-primary mb-6">Kontakt</h1>
      <div className="space-y-2 text-sm">
        {info?.address && <p>Manzil: {info.address}</p>}
        {info?.phone && <p>Telefon: {info.phone}</p>}
        {info?.email && <p>Email: {info.email}</p>}
        {!info?.address && !info?.phone && !info?.email && (
          <p className="text-muted">
            Manzil, telefon va email admin panel orqali kiritilgandan so'ng shu yerda ko'rinadi.
          </p>
        )}
      </div>
      {info?.map_url && (
        <iframe src={info.map_url} className="w-full h-72 rounded mt-6 border-0" loading="lazy" />
      )}
    </div>
  );
}
