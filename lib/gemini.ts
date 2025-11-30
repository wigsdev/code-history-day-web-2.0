import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializar el cliente de Gemini
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export interface GeneratedEphemeris {
  date: string;
  year: number;
  title: string;
  description: string;
  category: "OS" | "Language" | "Hardware" | "Company" | "Web" | "AI" | "Innovation" | "Other";
  impact: "high" | "medium" | "low";
}

export async function generateEphemeris(date: Date): Promise<GeneratedEphemeris | null> {
  if (!genAI) {
    console.error("GEMINI_API_KEY is not set in lib/gemini.ts");
    return null;
  }

  try {
    console.log("Generating ephemeris with Gemini (model: gemini-2.5-flash)...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const month = date.toLocaleString('es-ES', { month: 'long' });
    const day = date.getDate();
    const dateStr = `${day} de ${month}`;

    const prompt = `
      Eres un historiador experto en computación y programación.
      Tu tarea es identificar UN evento histórico significativo ocurrido el día ${dateStr} (mes y día).
      Si no hay un evento exacto para hoy, busca uno de la misma semana que sea muy relevante.

      Requisitos:
      1. El evento debe ser real y verificable.
      2. Prioriza: Lanzamientos de lenguajes, sistemas operativos, hitos de empresas tech, o patentes clave.
      3. Idioma: Español neutro.
      4. Tono: Informativo y técnico pero accesible.

      Formato de Salida (JSON estricto):
      {
        "date": "YYYY-MM-DD",
        "year": number,
        "title": "Título del evento (máx 60 caracteres)",
        "description": "Descripción del evento (máx 250 caracteres)",
        "category": "OS" | "Language" | "Hardware" | "Company" | "Web" | "AI" | "Innovation" | "Other",
        "impact": "high" | "medium" | "low"
      }
      
      Responde SOLO con el JSON, sin markdown ni explicaciones adicionales.
    `;

    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    console.log("Gemini response received. Getting text...");
    const response = await result.response;
    const text = response.text();
    console.log("Gemini raw response:", text);

    // Limpiar el texto de posibles bloques de código markdown
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const data = JSON.parse(cleanText) as GeneratedEphemeris;
    return data;

  } catch (error: any) {
    console.error("Error generating ephemeris with Gemini:", error);
    if (error.response) {
      console.error("API Response Error Status:", error.response.status);
      console.error("API Response Error Text:", error.response.statusText);
    }
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return null;
  }
}
