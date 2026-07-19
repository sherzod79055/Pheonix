import { createClient } from "../../lib/supabase/server";

export default async function AboutPage() {
  const supabase = createClient();
  const { data: info } = await supabase.from("school_info").select("*").limit(1).maybeSingle();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium text-primary mb-6">Maktab haqida</h1>
      {info?.mission && (
        <>
          <h2 className="text-xl font-medium mb-2">Missiyamiz</h2>
          <p className="mb-6">{info.mission}</p>
        </>
      )}
      {info?.history && (
        <>
          <h2 className="text-xl font-medium mb-2">Tarixi</h2>
          <p className="mb-6">{info.history}</p>
        </>
      )}
      {!info?.mission && !info?.history && (
        <p className="text-muted">
          Bu sahifa mazmuni admin panel orqali to'ldiriladi (Maktab ma'lumotlari bo'limi).
        </p>
      )}
    </div>
  );
}
