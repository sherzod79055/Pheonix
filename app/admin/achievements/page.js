"use client";
import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { name: "title", label: "Sarlavha" },
  { name: "description", label: "Tavsif", type: "textarea" },
  { name: "category", label: "Turkumi (olimpiada, sertifikat, sport...)" },
  { name: "person_name", label: "Kimning yutug'i" },
  { name: "achieved_at", label: "Sana", type: "date" },
  { name: "photo_url", label: "Surat", type: "image" }
];

export default function AdminAchievementsPage() {
  return <AdminCrud tableName="achievements" title="Yutuqlar" fields={fields} />;
}
