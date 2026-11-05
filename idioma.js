/* ===== IDIOMA DE LA APP + GUÍA CON VOZ =====
   1) Si eliges náhuatl, los textos de la app cambian a náhuatl (y vuelven al español).
   2) La guía de uso lee TODO el paso en voz alta, en el idioma elegido.
   Para traducir más textos: agrega una línea "texto en español": "texto en náhuatl" en D.
   El náhuatl es BORRADOR: falta que lo revise un hablante. */
(function(){
"use strict";
const q = s => document.querySelector(s);
const D = {
  /* inicio y barra de abajo */
  "Herramientas rápidas":"Tequitl","Comunicarme":"Nitlahtoz","Traducir con cámara":"Ixiptli","Frases rápidas":"Tlahtolmeh",
  "Lecciones: aprender y leer":"Tlamachtiliztli: ximomachti ihuan xicpohua","Vocabulario: partes del cuerpo":"Tonacayo tlahtolli",
  "Clínicas cerca de mí":"Pahtiloyan nican","Últimas frases":"Tlen otitlahtoh","Ruta de aprendizaje":"Tlamachtiliztli",
  "Inicio":"Calli","Comunicar":"Tlahtolli","Aprender":"Tlamachtiliztli","Servicios":"Pahtiliztli","Más":"Occequin",
  "Comenzar":"Xipehua","Funciona sin conexión":"Tequiti ahmo internet",
  /* comunicar */
  "¿Cómo quieres comunicarte?":"¿Quen ticnequi titlahtoz?","Escribir mensaje":"Xicihcuilo tlahtolli","Elegir una frase":"Xicpepena ce tlahtolli",
  "Usar mi voz":"Xitlahto","Mensajes guardados":"Tlahtolli pialoc","Hablar":"Xitlahto","Buscar":"Xictemo",
  /* lecciones */
  "Lecciones":"Tlamachtiliztli","Salud":"Pahtiliztli","Frases":"Tlahtolli","Trámites":"Amatl","Cuerpo":"Tonacayo",
  "Español":"Caxtillan","Náhuatl":"Nahuatl","Leer y escribir":"Xicpohua ihuan xicihcuilo",
  "Hablo náhuatl, aprendo español":"Nitlahtoa nahuatl, nimomachtia caxtillan tlahtolli",
  "Aprender a leer y escribir":"Nimomachtia nicpohuaz ihuan nicihcuiloz",
  "Hablo español, aprendo náhuatl":"Nitlahtoa caxtillan, nimomachtia nahuatl",
  "Saludos":"Netlapaloliztli","Comida":"Tlacualli","Naturaleza":"Tlalticpac","Animales":"Yolcame","La casa":"Calli",
  "En la clínica":"Pahtiloyan","El cuerpo (1)":"Tonacayo (1)","El cuerpo (2)":"Tonacayo (2)",
  "Números del 1 al 5":"Tlapohualli 1-5","Números del 6 al 10":"Tlapohualli 6-10",
  "Cerrar":"Xictzacua","Más herramientas":"Occequin tequitl",
  /* pantalla "Más", clínicas, accesibilidad, ajustes */
  "Mapa y cómo llegar":"Tlalamatl ihuan ohtli","Voces de la comunidad":"Tlahtolmeh tlen altepetl",
  "Palabras, historias y grabaciones":"Tlahtolli ihuan tlapohualli","Favoritos e historial":"Tlazohtli ihuan tlen otitlahtoh",
  "Tus frases guardadas":"Tlahtolli pialoc","Accesibilidad":"Tlapalehuiliztli","Ajustes visuales y de audio":"Ittaliztli ihuan caquiztli",
  "Ajustes":"Tlapatlaliztli","Idioma, privacidad y ayuda":"Tlahtolli, tlapializtli ihuan tlapalehuiliztli",
  "Clínicas y hospitales":"Pahtiloyan","Farmacias":"Pahtli tlanamacoyan","Buscar cerca de mí":"Xictemo nican",
  "Texto grande":"Huei tlahcuilolli","Audio y lectura en voz alta":"Caquiztli ihuan xicpohua","Pictogramas":"Ixiptli",
  /* bienvenida, iniciar sesión y perfil */
  "Comunicación · Orientación":"Tlahtolli · Tlanextiliztli","Respeto · Autonomía":"Tlacaittaliztli · Momatca",
  "Tu voz, tu idioma,":"Motlahtol, monahuatl,","tu autonomía.":"momatca.","Ya tengo una cuenta CORA":"Ye nicpia nocuenta CORA",
  "Iniciar sesión":"Xicalaqui","Inicia sesión para guardar tu avance y tus ajustes en este teléfono.":"Xicalaqui ic ticpializ motlamachtiliz ihuan motlapatlaliz nican ipan in telefono.",
  "Tu nombre":"Motoca","PIN de 4 números (opcional)":"PIN: 4 tlapohualli (ahmo monequi)","Tu PIN":"Mo PIN",
  "Crear perfil y entrar":"Xicchihua motoca ihuan xicalaqui","Hola,":"Niltze,","Entrar":"Xicalaqui",
  "No soy yo / crear otro perfil":"Amo nehuatl / xicchihua occe motoca","Continuar sin perfil":"Xiyauh ahmo motoca",
  "El perfil se guarda solo en este teléfono. No es una cuenta en internet.":"Motoca quipia zan nican ipan telefono. Ahmo internet.",
  "Cerrar sesión":"Xicalaqui ahmo","Favoritos":"Tlazohtli","Historial":"Tlen otitlahtoh","Borrar mis datos de este teléfono":"Xicpolo notlahtol"
};
const NSET = new Set(Object.values(D));
window.CORA_T = k => (lang === "nah" && D[k]) || k;   /* traduce un texto de la app al idioma elegido */

/* --- Voz: en náhuatl, los textos traducidos se leen con la pronunciación aproximada --- */
const origSay = say; let TOURON = false, TS = false;
window.say = function(x){
  if (TOURON && !TS) return;                      /* durante la guía solo habla la guía */
  if (lang === "nah" && NSET.has(String(x).trim())) x = pron(x);
  return origSay(x);
};
/* --- Botón ← : evita el ciclo frases rápidas <-> detalle que dejaba la app "trabada" --- */
window.goBack = function(){
  let prev = NAVH.pop();
  while (prev && (prev === CUR || prev === "detail" || prev === "cl" || prev === "lesson")) prev = NAVH.pop();
  if (!prev && !localStorage.getItem("cora-onb")) return;
  GOBACK = true; show(prev || "home"); GOBACK = false;
};
const tsay = x => { TS = true; try { origSay(x); } finally { TS = false; } };

/* --- Cambiar los textos de la pantalla --- */
function tr(root){
  const nah = lang === "nah", w = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: n => /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const L = []; let n; while ((n = w.nextNode())) L.push(n);
  L.forEach(n => {
    const s = n.nodeValue, k = s.trim();
    if (!nah) { if (n.__es != null) { n.nodeValue = n.__es; n.__es = null; } return; }
    if (!k) return;
    let v = D[k], key = k;
    if (!v) { const m = k.match(/^([^\p{L}\d¿¡]+\s*)(.+)$/u); if (m && D[m[2]]) { key = m[2]; v = D[key]; } }
    if (v) { n.__es = s; n.nodeValue = s.replace(key, v); }
  });
  document.querySelectorAll("input[placeholder]").forEach(i => {      /* textos de los campos */
    if (nah) { const v = D[i.placeholder]; if (v) { i.__ph = i.placeholder; i.placeholder = v; } }
    else if (i.__ph) { i.placeholder = i.__ph; i.__ph = null; }
  });
}
const _show = show;
/* Lee la pantalla completa (título + botones) al entrar, si está activada la "Navegación con audio" */
const clean = x => x.replace(/[\p{Extended_Pictographic}\uFE0F\u200D▶◆→←✕⋯›]/gu, " ").replace(/\s+/g, " ").trim();
function readScreen(id){
  if (TOURON || CUR !== id) return;
  const sec = document.getElementById(id); if (!sec) return;
  const P = []; if (id === "home") P.push(lang === "nah" ? D["Inicio"] : "Inicio");
  sec.querySelectorAll("h1,h2,button.tool,.unit .ut,.vt,.cl-pt,.lvl b,.chip").forEach(e => {
    const x = clean(e.textContent); if (x && !P.includes(x)) P.push(x); });
  const txt = P.slice(0, 14).join(". "); origSay(lang === "nah" ? pron(txt) : txt);
}
window.show = function(id){
  const nv = S.a && S.a.nav; if (S.a) S.a.nav = false;      /* evita que lea solo el primer título */
  try { _show(id); } finally { if (S.a) S.a.nav = nv; }
  tr();
  if (nv && !TOURON && !/^(cl|lesson|login|welcome)$/.test(id)) setTimeout(() => readScreen(id), 250);
};
const _setLang = setLang; window.setLang = function(l){ _setLang(l); tr(); };
const _rl = renderLearn; window.renderLearn = function(){ _rl(); tr(q("#learn")); };
const _rp = renderPath; window.renderPath = function(){ _rp(); tr(q("#path")); };

/* Frases rápidas: en náhuatl muestran la frase en náhuatl */
window.renderQuick = function(){
  const K = Object.keys(FRASES); qcat = qcat || K[0];
  $("#qTabs").innerHTML = K.map(c => `<button class="chip" aria-pressed="${c===qcat}" data-c="${c}">${PICON() ? (CATICO[c] || "") + " " : ""}${t("cat_"+c)}</button>`).join("");
  $("#qTabs").querySelectorAll(".chip").forEach(b => b.onclick = () => { qcat = b.dataset.c; renderQuick(); });
  const C = ["#c9bdf6","#f8d27a","#a8e6df","#ffd7b0"], E = ["🙋","🆘","💧","🚻","✅","❌","🩺","💊"];
  $("#qGrid").innerHTML = FRASES[qcat].map((f,i) => `<button class="vt" style="background:${C[i%4]};color:#2b2340" data-q="${i}"><i>${pic(f.es) || E[i%8]}</i>${esc(lang === "nah" && f.nah ? f.nah : f.es)}</button>`).join("");
  $("#qGrid").querySelectorAll(".vt").forEach(b => b.onclick = () => openDetail(FRASES[qcat][+b.dataset.q]));
};

/* --- Guía de uso: muestra y LEE todo el paso, en el idioma elegido --- */
const _start = startTour, _end = endTour;
window.startTour = function(){ TOURON = true; _start(); };
window.endTour = function(){ TOURON = false; try { speechSynthesis.cancel(); } catch(e) {} _end(); };
window.tourStep = function(){
  const st = TOUR[ti], nm = lang === "nah", N = TNAH[ti];
  show(st.g);
  setTimeout(() => {
    const el = document.querySelector(st.s); if (!el) return;
    el.scrollIntoView({block:"center"});
    const r = el.getBoundingClientRect(), c = $("#tcard");
    $("#tspot").style.cssText = `left:${r.left-6}px;top:${r.top-6}px;width:${r.width+12}px;height:${r.height+12}px`;
    const T1 = nm ? N[0] : st.t, X1 = nm ? N[1] : st.x, T2 = nm ? st.t : N[0], X2 = nm ? st.x : N[1];
    $("#tn").textContent = (ti + 1) + " / " + TOUR.length;
    $("#tt").textContent = T1;
    $("#tx").innerHTML = esc(X1) + `<br><small style="color:var(--mute)">${nm ? "Español" : "Náhuatl (borrador)"}: ${esc(T2)}. ${esc(X2)}</small>`;
    $("#tnext").textContent = ti === TOUR.length - 1 ? (nm ? "Cualli" : "Listo") : (nm ? "Occe" : "Siguiente");
    $("#tskip").textContent = nm ? "Xicmocahua" : "Omitir";
    c.style.maxHeight = "46vh"; c.style.overflowY = "auto"; c.style.bottom = "auto";
    const ch = c.offsetHeight, gap = 14, spB = innerHeight - r.bottom - gap, spA = r.top - gap;
    const top = spB >= ch ? r.bottom + gap : spA >= ch ? r.top - gap - ch : ((r.top + r.height/2) < innerHeight/2 ? innerHeight - ch - 8 : 8);
    c.style.top = Math.max(8, Math.min(top, innerHeight - ch - 8)) + "px";
    tsay(nm ? pron(T1 + ". " + X1) : T1 + ". " + X1);      /* lee título + texto completo */
  }, 120);
};
/* Flechas ←: todas usan el nuevo goBack (antes quedaban con la función vieja) */
document.querySelectorAll("main .back").forEach(b => { if (!b.id) b.onclick = () => goBack(); });   /* también las que iban a una pantalla fija (Clínicas, etc.) */
const _od = openDetail;
window.openDetail = function(f){ _od(f); const b = q("#detail .back"); if (b) b.onclick = () => goBack(); };
tr();
})();
