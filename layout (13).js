"use client";
import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { name: "full_name", label: "F.I.Sh." },
  { name: "subject", label: "Fani" },
  { name: "position", label: "Lavozimi" },
  { name: "experience_years", label: "Ish tajribasi (yil)", type: "number" },
  { name: "phone", label: "Telefon raqami" },
  { name: "bio", label: "Qisqa ma'lumot (bio)", type: "textarea" },
  { name: "photo_url", label: "Surat", type: "image" }
];

export default function AdminTeachersPage() {
  return <AdminCrud tableName="teachers" title="O'qituvchilar" fields={fields} orderBy="sort_order" />;
}
