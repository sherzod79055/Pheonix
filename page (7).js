"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("school_info")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setForm(data || {}));
  }, []);

  async function handleSave() {
    const payload = { ...form, updated_at: new Date().toISOString() };
    if (form.id) {
      await supabase.from("school_info").update(payload).eq("id", form.id);
    } else {
      await supabase.from("school_info").insert(payload);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!form) return <p className="text-muted">Yuklanmoqda...</p>;

  const textFields = [
    ["school_name", "Maktab nomi"],
    ["tagline", "Shior"],
    ["address", "Manzil"],
    ["phone", "Telefon"],
    ["email", "Email"],
    ["map_url", "Xarita havolasi (Google/Yandex Maps embed URL)"]
  ];

  return (
    <div>
      <h1 className="text-2xl font-medium text-primary mb-6">Maktab ma'lumotlari</h1>
      <div className="space-y-4 max-w-xl">
        {textFields.map(([key, label]) => (
          <div key={key}>
            <label className="text-sm text-muted block mb-1">{label}</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        <div>
          <label className="text-sm text-muted block mb-1">Missiya</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            value={form.mission || ""}
            onChange={(e) => setForm({ ...form, mission: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm text-muted block mb-1">Tarixi</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            value={form.history || ""}
            onChange={(e) => setForm({ ...form, history: e.target.value })}
          />
        </div>
        <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded">
          Saqlash
        </button>
        {saved && <span className="text-green-600 text-sm ml-3">Saqlandi</span>}
      </div>
    </div>
  );
}
