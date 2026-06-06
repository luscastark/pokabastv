/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Inicializa o SDK do Gemini apenas se a chave estiver configurada
const apiKey = process.env.GEMINI_API_KEY;
let ai = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({ apiKey });
    console.log("Gemini AI SDK initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini SDK:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not configured or uses placeholder. Falling back to local temporal simulation.");
}

// Cache local para diminuir chamadas de API externas
let matchesCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // Cache de 1 minuto para resultados online

app.get("/api/matches", async (req, res) => {
  const now = Date.now();
  if (matchesCache && (now - lastFetchTime < CACHE_DURATION)) {
    return res.json(matchesCache);
  }

  if (!ai) {
    // Se o Gemini não estiver inicializado, retorna array vazio para o frontend usar a simulação local
    return res.json({ source: "simulation", matches: [] });
  }

  try {
    // Chama o Gemini 2.5 Flash com Grounding de Busca do Google
    // para descobrir os placares mais recentes da Copa do Mundo 2026 de forma 100% online
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Search Google for the latest results, live scores, and matches of the FIFA World Cup 2026.
Return the current status of the matches as a raw JSON array.
Each item in the array MUST represent a match with the following schema:
{
  "id": "m1" to "m72" for group stage matches, or "r32_1" to "r32_16", "r16_1" to "r16_8", "qf_1" to "qf_4", "sf_1" to "sf_2", "third_place", "final" for knockout matches.
  "simulatedResult1": number (goals scored by team 1, if match is live or finished),
  "simulatedResult2": number (goals scored by team 2, if match is live or finished),
  "isFinished": boolean,
  "isLive": boolean,
  "knockoutWinnerCode": string (the 3-letter team code like BRA, ARG that won if the match was a draw in a knockout stage)
}
Only output the JSON array, no markdown blocks, no commentary.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    const data = JSON.parse(text);

    matchesCache = { source: "online", matches: data };
    lastFetchTime = now;

    res.json(matchesCache);
  } catch (error) {
    console.error("Error fetching live scores from Gemini:", error);
    // Retorna status de fallback amigável em vez de quebrar a requisição
    res.json({ source: "simulation", matches: [], error: error.message });
  }
});

// Servir arquivos estáticos gerados pelo Vite (Vite build) em produção
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
