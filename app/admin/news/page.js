"use client";
import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { name: "title", label: "Sarlavha" },
  { name: "content", label: "Matn", type: "textarea" },
  { name: "photo_url", label: "Surat", type: "image" }
];

export default function AdminNewsPage() {
  return <AdminCrud tableName="news" title="Yangiliklar" fields={fields} orderBy="published_at" />;
}
