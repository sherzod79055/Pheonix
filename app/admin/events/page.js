"use client";
import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { name: "title", label: "Sarlavha" },
  { name: "description", label: "Tavsif", type: "textarea" },
  { name: "event_date", label: "Sana va vaqt", type: "datetime-local" },
  { name: "location", label: "Joyi" },
  { name: "photo_url", label: "Surat", type: "image" }
];

export default function AdminEventsPage() {
  return <AdminCrud tableName="events" title="Tadbirlar" fields={fields} orderBy="event_date" />;
}
