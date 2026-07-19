"use client";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function AdminCrud({ tableName, title, fields, orderBy = "created_at" }) {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from(tableName).select("*").order(orderBy, { ascending: false });
    setRows(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [tableName]);

  function resetForm() {
    setForm({});
    setEditingId(null);
  }

  function startEdit(row) {
    setForm(row);
    setEditingId(row.id);
  }

  async function handleImageUpload(e, fieldName) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${tableName}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: true });
    if (!error) {
      const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
      setForm((f) => ({ ...f, [fieldName]: pub.publicUrl }));
    } else {
      alert("Rasm yuklashda xatolik: " + error.message);
    }
    setUploading(false);
  }

  async function handleSave() {
    const payload = { ...form };
    delete payload.id;
    delete payload.created_at;

    if (editingId) {
      const { error } = await supabase.from(tableName).update(payload).eq("id", editingId);
      if (error) return alert("Xatolik: " + error.message);
    } else {
      const { error } = await supabase.from(tableName).insert(payload);
      if (error) return alert("Xatolik: " + error.message);
    }
    resetForm();
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Rostdan ham o'chirmoqchimisiz?")) return;
    await supabase.from(tableName).delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-primary mb-6">{title}</h1>

      <div className="bg-gray-50 border rounded-lg p-4 mb-8">
        <h2 className="font-medium mb-3">{editingId ? "Tahrirlash" : "Yangi qo'shish"}</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {fields.map((f) => (
            <div key={f.name} className={f.type === "textarea" ? "md:col-span-2" : ""}>
              <label className="text-sm text-muted block mb-1">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  className="w-full border rounded px-2 py-1"
                  rows={3}
                  value={form[f.name] || ""}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                />
              ) : f.type === "image" ? (
                <div>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, f.name)} />
                  {form[f.name] && (
                    <img src={form[f.name]} alt="" className="h-16 mt-2 rounded object-cover" />
                  )}
                </div>
              ) : (
                <input
                  type={f.type || "text"}
                  className="w-full border rounded px-2 py-1"
                  value={form[f.name] || ""}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSave}
            disabled={uploading}
            className="bg-primary text-white px-4 py-2 rounded text-sm"
          >
            {editingId ? "Saqlash" : "Qo'shish"}
          </button>
          {editingId && (
            <button onClick={resetForm} className="border px-4 py-2 rounded text-sm">
              Bekor qilish
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-muted">Yuklanmoqda...</p>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="border rounded p-3 flex items-center justify-between gap-3">
              <div className="text-sm">
                <strong>{r[fields[0].name]}</strong>
                {fields[1] && r[fields[1].name] && (
                  <span className="text-muted"> — {String(r[fields[1].name]).slice(0, 80)}</span>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(r)} className="text-primary text-sm underline">
                  Tahrirlash
                </button>
                <button onClick={() => handleDelete(r.id)} className="text-red-600 text-sm underline">
                  O'chirish
                </button>
              </div>
            </div>
          ))}
          {rows.length === 0 && <p className="text-muted">Hali hech narsa qo'shilmagan.</p>}
        </div>
      )}
    </div>
  );
}
