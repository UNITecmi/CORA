/* ===== CURSO DE CORA: lecciones tipo Duolingo para personas que no leen ni escriben =====
   Todo se entiende con AUDIO + DIBUJOS + SONIDOS (✅ / ❌). El texto es opcional.
   Tres caminos:  🗣️ hablo náhuatl → aprendo español   ✍️ leer y escribir   🌿 hablo español → aprendo náhuatl
   Para agregar palabras: edita la lista U (abajo). Para agregar grabaciones de hablantes: audio:"audio/nah/x.mp3". */
(function(){
"use strict";
const q = s => document.querySelector(s), E = esc;
const shuf = a => a.map(x => [Math.random(), x]).sort((p, r) => p[0] - r[0]).map(x => x[1]);
const I = (ico, es, nah) => ({ico, es, nah, ok:false, audio:null});
const LT = (k, w, wes, ico) => ({k, w, wes, ico});
const disp = k => k[0].toUpperCase() + k.slice(1) + "  " + k;
const SY = (c, w, wes, ico) => ({kind:"l", ico, es:"Sílabas con " + c.toUpperCase(), items:["a","e","i","o"].map(v => LT(c + v, w, wes, ico))});
const body = VOCAB.filter(v => v.nah).map(v => I(v.ico, v.es, v.nah));

/* ---------- CONTENIDO (el náhuatl es borrador: falta validación de hablantes) ---------- */
const U = {
  sal:{ico:"👋", es:"Saludos", items:[I("👋","Hola","Niltze"),I("🙏","Gracias","Tlazohcamati"),I("🌞","Buen día","Cualli tonalli"),I("🌙","Buenas noches","Cualli yohualli")]},
  fam:{ico:"👨‍👩‍👧", es:"Familia", items:[I("👩","Mamá","Nonan"),I("👨","Papá","Notah"),I("🧒","Niño","Piltontli"),I("👩‍🦱","Mujer","Cihuatl"),I("🧔","Hombre","Oquichtli")]},
  n15:{ico:"1️⃣", es:"Números del 1 al 5", items:[I("1️⃣","Uno","Ce"),I("2️⃣","Dos","Ome"),I("3️⃣","Tres","Yei"),I("4️⃣","Cuatro","Nahui"),I("5️⃣","Cinco","Macuilli")]},
  com:{ico:"🌽", es:"Comida", items:[I("🌽","Maíz","Centli"),I("🫓","Tortilla","Tlaxcalli"),I("🫘","Frijol","Etl"),I("🌶️","Chile","Chilli"),I("🍅","Tomate","Tomatl"),I("🍖","Carne","Nacatl")]},
  nat:{ico:"🌳", es:"Naturaleza", items:[I("💧","Agua","Atl"),I("🔥","Fuego","Tletl"),I("☀️","Sol","Tonatiuh"),I("🌙","Luna","Metztli"),I("⭐","Estrella","Citlalin"),I("🌳","Árbol","Cuahuitl"),I("🌸","Flor","Xochitl"),I("⛰️","Cerro","Tepetl")]},
  ani:{ico:"🐕", es:"Animales", items:[I("🐕","Perro","Itzcuintli"),I("🐱","Gato","Mizton"),I("🐇","Conejo","Tochtli"),I("🦋","Mariposa","Papalotl"),I("🐔","Gallina","Totolin"),I("🐟","Pez","Michin")]},
  cas:{ico:"🏠", es:"La casa", items:[I("🏠","Casa","Calli"),I("🍲","Olla","Comitl"),I("🍳","Comal","Comalli"),I("🛏️","Petate","Petlatl"),I("🛤️","Camino","Ohtli")]},
  n610:{ico:"🔟", es:"Números del 6 al 10", items:[I("6️⃣","Seis","Chicuace"),I("7️⃣","Siete","Chicome"),I("8️⃣","Ocho","Chicueyi"),I("9️⃣","Nueve","Chicnahui"),I("🔟","Diez","Mahtlactli")]},
  cu1:{ico:"🙂", es:"El cuerpo (1)", items:body.slice(0,6)},
  cu2:{ico:"🫀", es:"El cuerpo (2)", items:body.slice(6,12)},
  sa:{ico:"🩺", es:"En la clínica", items:[I("🤕","Me duele la cabeza","Nechcocoa notzontecon"),I("🌡️","Tengo fiebre","Nitotonia"),I("🙋","Necesito ayuda","Xinechpalehui"),I("🆘","Es una emergencia","Cenca ohuihcayotl"),I("😮‍💨","No puedo respirar","Amo huel nihiyohuia"),I("🧑‍⚕️","Llamen a un médico","Xicnotzacan ticitl")]},
  /* Leer y escribir: letras, sílabas y palabras */
  vow:{kind:"l", ico:"🔤", es:"Las vocales", items:[LT("a","Atl","agua","💧"),LT("e","Etl","frijol","🫘"),LT("i","Itzcuintli","perro","🐕"),LT("o","Ocelotl","jaguar","🐆"),LT("u","Uva","uva (solo español)","🍇")]},
  lm:SY("m","Maitl","mano","✋"), lt:SY("t","Tochtli","conejo","🐇"), lc:SY("c","Calli","casa","🏠"),
  lp:SY("p","Papalotl","mariposa","🦋"), ln:SY("n","Nonan","mamá","👩"), lx:SY("x","Xochitl","flor","🌸"),
  wnah:{kind:"w", to:"nah", ico:"✍️", es:"Escribo en náhuatl", items:[I("💧","agua","atl"),I("🫘","frijol","etl"),I("🏠","casa","calli"),I("🌸","flor","xochitl"),I("🐇","conejo","tochtli"),I("🐕","perro","itzcuintli")]},
  wes:{kind:"w", to:"es", ico:"📝", es:"Escribo en español", items:[I("💧","agua","atl"),I("🏠","casa","calli"),I("☀️","sol","tonatiuh"),I("🌸","flor","xochitl"),I("🐕","perro","itzcuintli"),I("🐱","gato","mizton")]}
};
const VOC = ["sal","fam","n15","com","nat","ani","cas","n610","cu1","cu2","sa"];
const PATHS = {
  hab:{ico:"🗣️", es:"Hablo náhuatl, aprendo español", from:"nah", to:"es", units:VOC},
  esc:{ico:"✍️", es:"Aprender a leer y escribir", units:["vow","lm","lt","lc","lp","ln","lx","wnah","wes"]},
  nah:{ico:"🌿", es:"Hablo español, aprendo náhuatl", from:"es", to:"nah", units:VOC}
};

/* ---------- Estado ---------- */
let CP = jget("cora-cp", {}), ST = jget("cora-cs", {xp:0, streak:0, last:""});
let curPath = jget("cora-cpath", null) || (lang === "nah" ? "hab" : "nah");
const stars = (pk, id) => CP[pk + ":" + id] || 0;
const unlocked = (pk, i) => i === 0 || stars(pk, PATHS[pk].units[i-1]) > 0;
const nextUnit = pk => { const L = PATHS[pk].units, i = L.findIndex(id => !stars(pk, id)); return i < 0 ? null : {i, id:L[i], u:U[L[i]]}; };

/* ---------- Estilos ---------- */
document.head.insertAdjacentHTML("beforeend", `<style>
.cl-big{font-size:96px;text-align:center;line-height:1.1;margin:14px 0}
.cl-ins{font-size:34px;text-align:center;margin:6px 0}
.cl-listen{width:100%;min-height:92px;justify-content:center;align-items:center;font-size:40px;flex-direction:row}
.cl-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px}
.cl-o{background:var(--card);border:3px solid var(--line);border-radius:20px;min-height:104px;font-size:52px;font-weight:800;color:var(--ink);line-height:1.1}
.cl-o.ok{background:#bfe8c9;border-color:var(--green)}.cl-o.no{background:#f7c6c1;border-color:var(--terra)}
.cl-go{width:100%;min-height:68px;border-radius:34px;justify-content:center;align-items:center;font-size:30px;flex-direction:row;margin-top:14px}
.cl-slots,.cl-tiles{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:14px 0}
.cl-s,.cl-t{min-width:52px;height:64px;border-radius:14px;font-size:30px;font-weight:800;padding:0 10px}
.cl-s{background:none;border:3px dashed var(--line);color:var(--ink)}.cl-s.f{border-style:solid;background:var(--card)}
.cl-t{background:var(--teal);color:#fff}.cl-t:disabled{opacity:.2}
.cl-model{font-size:34px;font-weight:800;text-align:center;letter-spacing:2px}
.cl-cv{width:100%;max-width:340px;display:block;margin:10px auto;background:var(--card);border:3px solid var(--line);border-radius:20px;touch-action:none}
.cl-f{position:fixed;inset:0;display:none;align-items:center;justify-content:center;font-size:140px;z-index:30;pointer-events:none}
.cl-n{width:88px;height:88px;border-radius:50%;font-size:42px;background:var(--card);border:6px solid var(--teal);display:block;margin:0 auto}
.cl-n.done{border-color:var(--mustard);background:#fff4d6}.cl-n.lock{opacity:.4;border-color:var(--line)}
.cl-pt{flex:1;min-height:78px;border-radius:18px;background:var(--card);border:3px solid var(--line);font-size:34px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:800}
.cl-pt small{font-size:11px;font-weight:700;color:var(--mute)}.cl-pt[aria-pressed="true"]{border-color:var(--terra);background:var(--line)}
</style>`);

/* ---------- Sonidos ---------- */
let ac;
function beep(ok){
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime;
    o.connect(g); g.connect(ac.destination); o.type = ok ? "sine" : "square";
    o.frequency.setValueAtTime(ok ? 660 : 180, t0); if (ok) o.frequency.setValueAtTime(880, t0 + .12);
    g.gain.setValueAtTime(.15, t0); g.gain.exponentialRampToValueAtTime(.001, t0 + .35); o.start(); o.stop(t0 + .4);
  } catch(e) {}
  if (navigator.vibrate) navigator.vibrate(ok ? 30 : [60, 40, 60]);
}
const sayN = it => it.audio ? new Audio(it.audio).play().catch(() => {}) : say(pron(it.nah));

/* ---------- Pantallas ---------- */
mk("cl", "");
window.renderLearn = function(){
  const P = PATHS[curPath], el = q("#learn");
  el.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><h1 style="font-size:26px;margin:0">Lecciones</h1><b style="font-size:20px">🔥 ${ST.streak} &nbsp;⭐ ${ST.xp}</b></div>
  <div class="seg" style="margin:12px 0">${Object.keys(PATHS).map(k => `<button class="cl-pt" data-p="${k}" aria-pressed="${k === curPath}" aria-label="${PATHS[k].es}">${PATHS[k].ico}<small>${["Español","Leer y escribir","Náhuatl"][["hab","esc","nah"].indexOf(k)]}</small></button>`).join("")}</div>
  <p class="note" style="margin:0 0 6px;font-weight:800;color:var(--ink)">${P.es}</p>
  ${P.units.map((id, i) => { const u = U[id], s = stars(curPath, id), ok = unlocked(curPath, i), off = [0,46,0,-46][i % 4];
    return `<div style="text-align:center;margin:12px 0;transform:translateX(${off}px)"><button class="cl-n ${s ? "done" : ""} ${ok ? "" : "lock"}" data-u="${i}" aria-label="${E(u.es)}">${ok ? u.ico : "🔒"}</button><small style="font-weight:800">${s ? "⭐".repeat(s) : ""}</small></div>`; }).join("")}
  <h2>Salud</h2><div class="seg"><button class="chip" data-go="phrases">🩺 Frases</button><button class="chip" data-go="tramites">📄 Trámites</button><button class="chip" data-go="vocab">🫀 Cuerpo</button></div>
  <p class="note">Las palabras en náhuatl son borradores y la voz es aproximada hasta que hablantes las validen y graben.</p>`;
  el.querySelectorAll("[data-go]").forEach(b => b.onclick = () => show(b.dataset.go));
  el.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { curPath = b.dataset.p; jset("cora-cpath", curPath); say(window.CORA_T ? CORA_T(PATHS[curPath].es) : PATHS[curPath].es); renderLearn(); });
  el.querySelectorAll("[data-u]").forEach(b => b.onclick = () => { const i = +b.dataset.u; if (unlocked(curPath, i)) play(curPath, P.units[i]); else { beep(false); toast("🔒"); } });
};
window.renderPath = function(){
  const el = q("#path"); if (!el) return; const n = nextUnit(curPath);
  el.innerHTML = `<button class="tool t5" id="hCont" style="width:100%;min-height:84px;flex-direction:row;align-items:center;justify-content:center;font-size:20px;gap:12px"><i>${n ? n.u.ico : "🏆"}</i>▶ ${n ? E(n.u.es) : "¡Terminaste!"}</button>`;
  q("#hCont").onclick = () => n ? play(curPath, n.id) : show("learn");
};

/* ---------- Lección ---------- */
function play(pk, id){
  const P = PATHS[pk], u = U[id], kind = u.kind || "v", from = P.from || "es", to = u.to || P.to || "es", items = u.items;
  const wd = (it, l) => l === "nah" ? it.nah : it.es, snd = (it, l) => l === "nah" ? sayN(it) : say(it.es);
  const tag = it => (from === "nah" || to === "nah") && !it.ok ? '<span class="pend">Borrador</span>' : "";
  let Q = [], idx = 0, mist = 0;
  if (kind === "v") { items.forEach(it => Q.push({t:"tch", it})); shuf(items).forEach(it => Q.push({t:"pcs", it})); }
  else if (kind === "l") { items.forEach(it => Q.push({t:"tch", it})); shuf(items).forEach(it => Q.push({t:"lts", it})); shuf(items).slice(0,4).forEach(it => Q.push({t:"trc", it})); }
  else shuf(items).forEach((it, i) => Q.push({t:"spl", it, copy:i < Math.ceil(items.length / 2)}));
  show("cl");
  q("#cl").innerHTML = `<div class="hdr"><button class="back" id="clx" aria-label="Salir">✕</button><div class="bar" style="flex:1;height:14px"><div id="clp" style="width:0"></div></div></div><div id="clb"></div><div class="cl-f" id="clf"></div>`;
  q("#clx").onclick = () => { renderPath(); show("learn"); };
  const B = () => q("#clb");
  const fb = (ok, cb) => { beep(ok); const f = q("#clf"); f.textContent = ok ? "✅" : "❌"; f.style.display = "flex"; setTimeout(() => { f.style.display = "none"; cb && cb(); }, ok ? 800 : 1000); };
  const next = () => { idx++; idx >= Q.length ? fin() : step(); };
  const miss = () => { const s = Q[idx]; mist++; if (!s.r) Q.push(Object.assign({}, s, {r:1})); };

  function tch(s){
    const it = s.it;
    if (kind === "l") {
      B().innerHTML = `<div class="cl-big" style="font-size:84px">${disp(it.k)}</div><div class="cl-big" style="font-size:72px;margin:0">${it.ico}</div><p class="note" style="font-size:22px;color:var(--ink);font-weight:800">${E(it.w)}<br><small>${E(it.wes)}</small></p><div class="brow"><button class="spk" id="s1" style="width:90px;height:64px">🔊</button><button class="spk" id="s2" style="width:140px;height:64px;background:var(--terra)">🔊 ${E(it.w)}</button></div><button class="tool t2 cl-go" id="nx">▶</button>`;
      q("#s1").onclick = () => say(it.k); q("#s2").onclick = () => say(pron(it.w)); say(it.k);
    } else {
      B().innerHTML = `<div class="cl-big">${it.ico}</div><div class="phrase"><div class="main"><b style="font-size:32px">${E(wd(it, to))}</b><span style="font-size:20px">${E(wd(it, from))}</span>${tag(it)}</div><button class="spk" id="s1" aria-label="🔊">🔊</button></div><div class="brow"><button class="chip" id="s2" style="font-size:26px">🔉</button></div><button class="tool t2 cl-go" id="nx">▶</button>`;
      q("#s1").onclick = () => snd(it, to); q("#s2").onclick = () => snd(it, from); snd(it, to);
    }
    q("#nx").onclick = next;
  }
  function pcs(s){
    const it = s.it, o = shuf([it, ...shuf(items.filter(x => x !== it)).slice(0, 2)]);
    B().innerHTML = `<div class="cl-ins">👂 ➜ 🖼️</div><button class="tool t2 cl-listen" id="s1" aria-label="🔊">🔊</button><div class="cl-opts">${o.map((x, k) => `<button class="cl-o" data-k="${k}" aria-label="${E(x.es)}">${x.ico}</button>`).join("")}</div>`;
    q("#s1").onclick = () => snd(it, to); snd(it, to);
    B().querySelectorAll(".cl-o").forEach(b => b.onclick = () => { const ok = o[b.dataset.k] === it; B().querySelectorAll(".cl-o").forEach(x => x.disabled = true); b.classList.add(ok ? "ok" : "no"); if (!ok) B().querySelectorAll(".cl-o").forEach(x => { if (o[x.dataset.k] === it) x.classList.add("ok"); }); fb(ok, () => { if (!ok) miss(); next(); }); });
  }
  function lts(s){
    const it = s.it, o = shuf([it, ...shuf(items.filter(x => x !== it)).slice(0, 2)]);
    B().innerHTML = `<div class="cl-ins">👂 ➜ 🔤</div><button class="tool t2 cl-listen" id="s1" aria-label="🔊">🔊</button><div class="cl-opts">${o.map((x, k) => `<button class="cl-o" data-k="${k}" style="font-size:34px">${disp(x.k)}</button>`).join("")}</div>`;
    q("#s1").onclick = () => say(it.k); say(it.k);
    B().querySelectorAll(".cl-o").forEach(b => b.onclick = () => { const ok = o[b.dataset.k] === it; B().querySelectorAll(".cl-o").forEach(x => x.disabled = true); b.classList.add(ok ? "ok" : "no"); if (!ok) B().querySelectorAll(".cl-o").forEach(x => { if (o[x.dataset.k] === it) x.classList.add("ok"); }); fb(ok, () => { if (!ok) miss(); next(); }); });
  }
  function trc(s){
    const it = s.it;
    B().innerHTML = `<div class="cl-ins">✍️ ${it.ico}</div><div class="brow"><button class="spk" id="s1" style="width:90px;height:60px">🔊</button></div><canvas id="cv" width="320" height="220" class="cl-cv"></canvas><div class="brow"><button class="chip" id="cc" style="font-size:24px">🧽</button><button class="tool t5" id="cd" style="min-height:56px;padding:0 28px;flex-direction:row;align-items:center;justify-content:center;font-size:26px">✅</button></div>`;
    const cv = q("#cv"), cx = cv.getContext("2d");
    const guide = () => { cx.clearRect(0, 0, 320, 220); cx.font = "bold " + (it.k.length > 1 ? 120 : 170) + "px sans-serif"; cx.textAlign = "center"; cx.fillStyle = "rgba(120,140,140,.28)"; cx.fillText(it.k, 160, 160); };
    guide(); cx.lineWidth = 12; cx.lineCap = cx.lineJoin = "round"; cx.strokeStyle = "#0f857d";
    let d = false; const pt = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * 320 / r.width, (e.clientY - r.top) * 220 / r.height]; };
    cv.onpointerdown = e => { d = true; cv.setPointerCapture(e.pointerId); const [x, y] = pt(e); cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + .1, y + .1); cx.stroke(); };
    cv.onpointermove = e => { if (!d) return; const [x, y] = pt(e); cx.lineTo(x, y); cx.stroke(); };
    cv.onpointerup = cv.onpointercancel = () => { d = false; };
    q("#s1").onclick = () => say(it.k); say(it.k);
    q("#cc").onclick = guide; q("#cd").onclick = () => fb(true, next);
  }
  function spl(s){
    const it = s.it, w = wd(it, to).toLowerCase(), tk = w.match(to === "nah" ? /tl|tz|ch|hu|qu|./g : /ch|ll|rr|qu|./g), sl = tk.map(() => -1), tl = shuf(tk.map((x, i) => i));
    let hint = s.copy;
    const R = () => {
      B().innerHTML = `<div class="cl-big" style="font-size:80px;margin:6px 0">${it.ico}</div><div class="brow"><button class="spk" id="s1" style="width:90px;height:60px">🔊</button><button class="chip" id="hn" style="font-size:24px">👁️</button></div>${hint ? `<div class="cl-model">${E(w)}</div>` : ""}<div class="cl-slots">${sl.map((v, i) => `<button class="cl-s ${v >= 0 ? "f" : ""}" data-s="${i}">${v >= 0 ? E(tk[v]) : ""}</button>`).join("")}</div><div class="cl-tiles">${tl.map(i => `<button class="cl-t" data-t="${i}" ${sl.includes(i) ? "disabled" : ""}>${E(tk[i])}</button>`).join("")}</div>`;
      q("#s1").onclick = () => snd(it, to); q("#hn").onclick = () => { hint = !hint; R(); };
      B().querySelectorAll(".cl-s").forEach(b => b.onclick = () => { sl[+b.dataset.s] = -1; R(); });
      B().querySelectorAll(".cl-t").forEach(b => b.onclick = () => {
        sl[sl.indexOf(-1)] = +b.dataset.t;
        if (sl.includes(-1)) return R();
        R(); const ok = sl.map(v => tk[v]).join("") === tk.join("");
        fb(ok, () => { if (ok) next(); else { mist++; sl.fill(-1); R(); } });
      });
    };
    R(); snd(it, to);
  }
  const STEP = {tch, pcs, lts, trc, spl};
  function step(){ q("#clp").style.width = Math.round(idx / Q.length * 100) + "%"; window.scrollTo(0, 0); STEP[Q[idx].t](Q[idx]); }
  function fin(){
    const st = mist <= 1 ? 3 : mist <= 3 ? 2 : 1, g = 10 + Q.length * 2, td = new Date().toDateString(), yd = new Date(Date.now() - 864e5).toDateString();
    CP[pk + ":" + id] = Math.max(stars(pk, id), st); jset("cora-cp", CP);
    ST.xp += g; if (ST.last !== td) { ST.streak = ST.last === yd ? ST.streak + 1 : 1; ST.last = td; } jset("cora-cs", ST);
    q("#clp").style.width = "100%";
    B().innerHTML = `<div class="cl-big">🎉</div><div class="cl-big" style="font-size:56px;margin:0">${"⭐".repeat(st)}</div><p class="note" style="font-size:24px;font-weight:800;color:var(--ink)">+${g} XP &nbsp; 🔥 ${ST.streak}</p><button class="tool t2 cl-go" id="nx">▶</button>`;
    renderPath(); q("#nx").onclick = () => { show("learn"); }; beep(true); say("¡Muy bien!");
  }
  step();
}
renderPath();
})();
