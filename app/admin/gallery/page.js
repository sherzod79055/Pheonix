"use client";
import AdminCrud from "../../../components/AdminCrud";

const fields = [
  { name: "caption", label: "Izoh" },
  { name: "category", label: "Turkumi" },
  { name: "url", label: "Rasm/video", type: "image" }
];

export default function AdminGalleryPage() {
  return <AdminCrud tableName="gallery" title="Galereya" fields={fields} />;
}
