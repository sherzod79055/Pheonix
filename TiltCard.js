// GEMINI VARIANTI — bu fayl hozircha FAOL EMAS (nomi route.js emas).
// Anthropic o'rniga Google Gemini ishlatmoqchi bo'lsangiz:
//   1) npm install @google/genai
//   2) Vercel'da ANTHROPIC_API_KEY o'rniga GEMINI_API_KEY qo'shing
//   3) Ushbu faylni "route.gemini.example.js" dan "route.js" ga qayta nomlang
//      (avvalgi app/api/chat/route.js faylini shu bilan almashtiring)

import { GoogleGenAI } from "@google/genai";
import { createServiceClient } from "../../../lib/supabase/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function buildContext() {
  const supabase = createServiceClient();

  const [{ data: info }, { data: teachers }, { data: news }, { data: events }, { data: achievements }] =
    await Promise.all([
      supabase.from("school_info").select("*").limit(1).maybeSingle(),
      supabase.from("teachers").select("full_name,subject,position,experience_years").limit(50),
      supabase.from("news").select("title,content,published_at").order("published_at", { ascending: false }).limit(15),
      supabase.from("events").select("title,description,event_date,location").order("event_date", { ascending: false }).limit(15),
      supabase.from("achievements").select("title,description,category,person_name,achieved_at").order("achieved_at", { ascending: false }).limit(20)
    ]);

  return `
MAKTAB HAQIDA:
Nomi: ${info?.school_name || "Bag'dod tuman ixtisoslashtirilgan maktabi"}
Shior: ${info?.tagline || ""}
Missiya: ${info?.mission || ""}
Tarixi: ${info?.history || ""}
Manzil: ${info?.address || ""}
Telefon: ${info?.phone || ""}
Email: ${info?.email || ""}

O'QITUVCHILAR:
${(teachers || []).map((t) => `- ${t.full_name}, ${t.subject || ""}, ${t.position || ""}, tajriba: ${t.experience_years || "?"} yil`).join("\n")}

SO'NGGI YANGILIKLAR:
${(news || []).map((n) => `- ${n.title}: ${(n.content || "").slice(0, 200)}`).join("\n")}

TADBIRLAR:
${(events || []).map((e) => `- ${e.title} (${e.event_date}), joyi: ${e.location || ""}`).join("\n")}

YUTUQLAR:
${(achievements || []).map((a) => `- ${a.title} (${a.category || ""}) - ${a.person_name || ""}`).join("\n")}
`;
}

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const context = await buildContext();

    const systemInstruction = `Siz Bag'dod tuman ixtisoslashtirilgan maktabining rasmiy AI yordamchisisiz. Faqat quyida berilgan real maktab ma'lumotlariga asoslanib, o'zbek tilida, qisqa va aniq javob bering. Agar javob quyidagi ma'lumotlarda bo'lmasa, buni ochiq ayting va maktab kotibiyatiga murojaat qilishni tavsiya qiling. Hech qachon mavjud bo'lmagan faktlarni o'ylab topmang.

${context}`;

    // Gemini formatiga moslashtirish: role "assistant" -> "model"
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: { systemInstruction }
    });

    const reply = response.text || "";
    return Response.json({ reply });
  } catch (err) {
    console.error(err);
    return Response.json({ reply: "Kechirasiz, hozir javob bera olmadim. Birozdan so'ng qayta urinib ko'ring." }, { status: 500 });
  }
}
