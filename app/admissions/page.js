export default function AdmissionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium text-primary mb-6">Qabul</h1>
      <p className="text-muted mb-4">
        5-sinfga qabul tartibi, talablar va hujjatlar ro'yxati shu yerda joylashadi. Bu ma'lumotlarni
        maktab rasmiy hujjatlariga asoslanib to'ldiring.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>Qabul shartlari — tasdiqlangandan so'ng shu yerga qo'shiladi</li>
        <li>Hujjatlar ro'yxati — tasdiqlangandan so'ng shu yerga qo'shiladi</li>
        <li>Imtihonlar grafigi — tasdiqlangandan so'ng shu yerga qo'shiladi</li>
      </ul>
    </div>
  );
}
