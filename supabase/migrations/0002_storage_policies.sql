-- Rasm/fayl yuklash xatoligini tuzatish: "media" bucket uchun RLS qoidalari
-- Buni Supabase SQL Editor'da ishga tushiring

-- Hammaga o'qishga ruxsat (rasm saytda ko'rinishi uchun)
create policy "public_read_media"
on storage.objects for select
using (bucket_id = 'media');

-- Faqat tizimga kirgan (autentifikatsiyadan o'tgan) foydalanuvchi yuklay oladi
create policy "admin_upload_media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'media');

-- Faqat tizimga kirgan foydalanuvchi yangilay/o'chira oladi
create policy "admin_update_media"
on storage.objects for update
to authenticated
using (bucket_id = 'media');

create policy "admin_delete_media"
on storage.objects for delete
to authenticated
using (bucket_id = 'media');
