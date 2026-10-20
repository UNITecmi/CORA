// Puente (Cloudflare Worker) para la IA de Corito.
// La llave de Anthropic se guarda como secreto del Worker y NUNCA va dentro de la app.
//
// Pasos (una sola vez):
//  1. En dash.cloudflare.com -> Workers y Pages -> Crear Worker -> pega este archivo.
//  2. Settings -> Variables y secretos:
//       ANTHROPIC_API_KEY  (secreto)  = tu llave de https://console.anthropic.com
//       ALLOWED_ORIGIN     (texto)    = la dirección de tu app, p. ej. https://TU-USUARIO.github.io
//  3. Copia la URL del Worker y pégala en index.html en:  const AI_ENDPOINT = "...";
//  4. Sube el cambio y sube la versión del caché en sw.js (cora-v12 -> cora-v13).

const SYSTEM = `Eres Corito, un xoloitzcuintle amable y paciente, ayudante de CORA: una app para personas que hablan náhuatl y usan servicios de salud en México. Usa palabras sencillas.
Responde SOLO con JSON válido, sin texto extra ni bloques de código: {"es":"...","nah":"..."}
- SIEMPRE llena los dos campos: "es" en español y "nah" en náhuatl (náhuatl clásico, frases cortas y sencillas). No dejes "nah" vacío: da tu mejor traducción; la app ya avisa que no está validada.
- FOTO de un documento: léela; en "es" explica en español muy sencillo (frases cortas, máximo 8 líneas) qué es y qué hay que hacer, y en "nah" da esa misma explicación en náhuatl (máximo 4 líneas, lo más importante).
- TEXTO en español: "es" es el texto en español claro y "nah" su traducción al náhuatl.
- TEXTO en náhuatl: "es" es su traducción al español y "nah" es el texto original.
- Nunca inventes datos que no estén en el texto o la foto.
- No diagnostiques ni recomiendes medicamentos ni dosis. Si hay una emergencia, di en "es": "En caso de emergencia, llama al 911." y en "nah": "Ihcuac cenca ohuihcayotl, xicnotza 911."`;

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const allow = env.ALLOWED_ORIGIN || "*";
    const cors = {
      "Access-Control-Allow-Origin": allow === "*" ? "*" : (origin === allow ? origin : allow),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };
    const send = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") return send({ error: "method" }, 405);
    if (allow !== "*" && origin !== allow) return send({ error: "origin" }, 403);

    let body;
    try { body = await req.json(); } catch { return send({ error: "json" }, 400); }

    const isPhoto = body.mode === "photo";
    let content;
    if (isPhoto) {
      if (typeof body.image !== "string" || body.image.length > 4_000_000) return send({ error: "image" }, 400);
      content = [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: body.image } },
        { type: "text", text: "Explica este documento (da \"es\" y \"nah\")." },
      ];
    } else {
      const text = String(body.text || "").slice(0, 500);
      if (!text.trim()) return send({ error: "text" }, 400);
      content = "Texto: " + text;
    }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: isPhoto ? "claude-sonnet-5-5" : "claude-haiku-5-5",
        max_tokens: 1000,
        system: SYSTEM,
        messages: [{ role: "user", content }],
      }),
    });
    if (!r.ok) return send({ error: "upstream", status: r.status }, 502);

    const data = await r.json();
    const raw = (data.content || []).map(b => b.text || "").join("").replace(/```json|```/g, "").trim();
    try {
      const v = JSON.parse(raw);
      return send({ es: String(v.es || ""), nah: String(v.nah || "") });
    } catch {
      return send({ es: raw, nah: "" });
    }
  },
};
