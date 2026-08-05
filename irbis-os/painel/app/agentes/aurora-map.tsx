"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import styles from "./aurora.module.css";
import { DEPARTAMENTOS, NIVEL_LABEL, type DepartamentoId } from "@/lib/agentes-departamentos";

export type Job = {
  titulo: string;
  skill: string | null;
  nivel_automacao: "ai" | "assisted" | "human";
};

export type BrainFact = { k: string; v: string; pending?: boolean };

type JobsPorDepartamento = Record<DepartamentoId, Job[]>;

// Em telas estreitas/altas o raio precisa encolher e o centro descer, senão a árvore
// "Vendas" (a mais próxima do topo) fica embaixo do H1. Ver crítica de design 05/ago.
function getRadialParams() {
  if (typeof window === "undefined") return { maxR: 44, centerY: 50 };
  const narrow = window.innerWidth <= 720;
  return narrow ? { maxR: 30, centerY: 60 } : { maxR: 44, centerY: 50 };
}

function polarToPercent(anguloDeg: number, raioFrac: number, params: { maxR: number; centerY: number }) {
  const rad = (anguloDeg - 90) * (Math.PI / 180);
  const r = raioFrac * params.maxR;
  return { x: 50 + r * Math.cos(rad), y: params.centerY + r * Math.sin(rad) };
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return h;
}

function levelColor(level: Job["nivel_automacao"]) {
  if (level === "ai") return "147, 179, 130";
  if (level === "human") return "224, 138, 92";
  return "138, 136, 120";
}

// Cada departamento é um neurônio, não uma árvore de jardim — soma no centro,
// dendritos finos e curvos saindo dele, terminais sinápticos nas pontas. Job com
// skill = sinapse acesa (brilha, cor do nível de automação); sem skill = terminal
// apagado (contorno fraco, sem luz — a conexão ainda não existe). Reskin pedido
// pelo Nicolas 05/ago: "muito árvore, pouco sistema neural".
function drawNeuron(ctx: CanvasRenderingContext2D, size: number, deptId: string, seedIndex: number, jobs: Job[]) {
  const rand = mulberry32(hashSeed(deptId) + seedIndex * 97);
  const baseX = size / 2;
  const baseY = size * 0.92;
  ctx.clearRect(0, 0, size, size);
  ctx.lineCap = "round";

  const maxDepth = 4;
  const trunkLen = size * 0.24;

  function drawSynapse(x: number, y: number, job: Job) {
    if (job.skill) {
      const col = levelColor(job.nivel_automacao);
      const r = size * 0.02;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      glow.addColorStop(0, `rgba(${col}, 0.5)`);
      glow.addColorStop(1, `rgba(${col}, 0)`);
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col}, 0.95)`;
      ctx.fill();
    } else {
      // terminal sem conexão — a sinapse que ainda não existe
      ctx.beginPath();
      ctx.arc(x, y, size * 0.017, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(224, 138, 92, 0.5)";
      ctx.lineWidth = size * 0.0035;
      ctx.stroke();
    }
  }

  function branch(x: number, y: number, angle: number, len: number, depth: number, jobIdx: number): number {
    if (depth > maxDepth || len < size * 0.025) {
      if (jobIdx < jobs.length) drawSynapse(x, y, jobs[jobIdx]);
      return jobIdx + 1;
    }
    const x2 = x + Math.cos(angle) * len;
    const y2 = y + Math.sin(angle) * len;
    // leve curvatura — dendrito, não graveto reto
    const bow = angle + Math.PI / 2 * (rand() > 0.5 ? 1 : -1);
    const mx = (x + x2) / 2 + Math.cos(bow) * len * 0.12 * rand();
    const my = (y + y2) / 2 + Math.sin(bow) * len * 0.12 * rand();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(mx, my, x2, y2);
    ctx.strokeStyle = `rgba(230, 229, 225, ${0.4 - depth * 0.05})`;
    ctx.lineWidth = Math.max(0.75, size * 0.01 * (1 - depth / (maxDepth + 1)));
    ctx.stroke();

    const branches = depth === 0 ? 2 : rand() > 0.22 ? 2 : 1;
    let nextIdx = jobIdx;
    for (let b = 0; b < branches; b++) {
      const spread = 0.4 + rand() * 0.34;
      const dir = b % 2 === 0 ? -1 : 1;
      const newAngle = angle + dir * spread * (0.6 + rand() * 0.6);
      const newLen = len * (0.66 + rand() * 0.14);
      nextIdx = branch(x2, y2, newAngle, newLen, depth + 1, nextIdx);
    }
    return nextIdx;
  }

  // soma — o corpo central de onde os dendritos saem
  ctx.beginPath();
  ctx.ellipse(baseX, baseY, size * 0.032, size * 0.024, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(230, 229, 225, 0.16)";
  ctx.fill();
  ctx.strokeStyle = "rgba(230, 229, 225, 0.4)";
  ctx.lineWidth = size * 0.006;
  ctx.stroke();

  const drawn = branch(baseX, baseY, -Math.PI / 2, trunkLen, 0, 0);
  // Rede de segurança: a recursão estocástica não garante um terminal por job
  // (dendritos param cedo quando `len` encolhe rápido demais). Se sobrar job sem
  // terminal, ele ainda aparece — senão a contagem no rótulo mente sobre o que o
  // neurônio mostra. Ver observação da crítica de design 05/ago.
  for (let i = drawn; i < jobs.length; i++) {
    const k = i - drawn;
    const bx = baseX + (k % 2 === 0 ? 1 : -1) * size * (0.08 + Math.floor(k / 2) * 0.05);
    const by = baseY + size * 0.02;
    drawSynapse(bx, by, jobs[i]);
  }
}

const BANDS = [
  { hue: "74, 93, 67", amp: 0.09, speed: 0.00005, yBase: 0.2, thickness: 0.34, phase: 0, freq: 1.15 },
  { hue: "180, 87, 61", amp: 0.07, speed: 0.000035, yBase: 0.5, thickness: 0.3, phase: 2.4, freq: 0.85 },
  { hue: "74, 93, 67", amp: 0.06, speed: 0.00006, yBase: 0.72, thickness: 0.26, phase: 5.1, freq: 1.4 },
];

function smoothPath(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last[0], last[1]);
}

export function AuroraMap({
  jobsPorDepartamento,
  brainFacts,
  totalJobs,
  comSkill,
  rodandoSozinho,
}: {
  jobsPorDepartamento: JobsPorDepartamento;
  brainFacts: BrainFact[];
  totalJobs: number;
  comSkill: number;
  rodandoSozinho: number;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const auroraCanvasRef = useRef<HTMLCanvasElement>(null);
  const rootsRef = useRef<SVGSVGElement>(null);
  const treeCanvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});
  const starsRef = useRef<[number, number, number, number][] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [radialParams, setRadialParams] = useState({ maxR: 44, centerY: 50 });
  const [firstLook, setFirstLook] = useState(true);

  useEffect(() => {
    setRadialParams(getRadialParams());
    function onResize() {
      setRadialParams(getRadialParams());
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFirstLook(false);
      return;
    }
    const t = setTimeout(() => setFirstLook(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const positions = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    DEPARTAMENTOS.forEach((d) => {
      map[d.id] = polarToPercent(d.angulo, d.raio, radialParams);
    });
    return map;
  }, [radialParams]);

  // desenha as 7 árvores (uma vez — não mudam entre re-renders)
  useEffect(() => {
    DEPARTAMENTOS.forEach((dept, i) => {
      const canvas = treeCanvasRefs.current[dept.id];
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      drawNeuron(ctx, canvas.width, dept.id, i, jobsPorDepartamento[dept.id] ?? []);
    });
  }, [jobsPorDepartamento]);

  // raízes (SVG) conectando cada árvore ao núcleo
  useEffect(() => {
    function drawRoots() {
      const stage = stageRef.current;
      const svg = rootsRef.current;
      if (!stage || !svg) return;
      const rect = stage.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const svgns = "http://www.w3.org/2000/svg";
      DEPARTAMENTOS.forEach((dept) => {
        const pos = positions[dept.id];
        const x1 = rect.width * 0.5;
        const y1 = rect.height * 0.5;
        const x2 = (pos.x / 100) * rect.width;
        const y2 = (pos.y / 100) * rect.height;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const nx = -dy;
        const ny = dx;
        const norm = Math.sqrt(nx * nx + ny * ny) || 1;
        const bend = 26;
        const cx = mx + (nx / norm) * bend;
        const cy = my + (ny / norm) * bend;
        const path = document.createElementNS(svgns, "path");
        path.setAttribute("d", `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
        svg.appendChild(path);
      });
    }
    drawRoots();
    window.addEventListener("resize", drawRoots);
    return () => window.removeEventListener("resize", drawRoots);
  }, [positions]);

  // aurora animada de fundo
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = auroraCanvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let rafId = 0;

    function resize() {
      const rect = stage!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    if (!starsRef.current) {
      const stars: [number, number, number, number][] = [];
      const starRand = mulberry32(7);
      for (let s = 0; s < 90; s++) {
        stars.push([starRand(), starRand() * 0.75, starRand() * 1.3 + 0.3, starRand() * 0.5 + 0.15]);
      }
      starsRef.current = stars;
    }

    function frame(time: number) {
      ctx!.clearRect(0, 0, w, h);
      const bg = ctx!.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#100f0b");
      bg.addColorStop(0.5, "#14130e");
      bg.addColorStop(1, "#181712");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      ctx!.save();
      ctx!.filter = `blur(${Math.max(24, w * 0.035)}px)`;
      BANDS.forEach((band) => {
        const steps = 22;
        const topPts: [number, number][] = [];
        const botPts: [number, number][] = [];
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * w * 1.14 - w * 0.07;
          const wobble =
            Math.sin((i / steps) * Math.PI * band.freq + time * band.speed + band.phase) * h * band.amp +
            Math.sin((i / steps) * Math.PI * band.freq * 2.3 + time * band.speed * 1.6) * h * band.amp * 0.25;
          const y = h * band.yBase + wobble;
          topPts.push([x, y]);
          botPts.push([x, y + h * band.thickness]);
        }
        ctx!.beginPath();
        smoothPath(ctx!, topPts);
        for (let i = botPts.length - 1; i >= 0; i--) ctx!.lineTo(botPts[i][0], botPts[i][1]);
        ctx!.closePath();
        const grad = ctx!.createLinearGradient(0, h * band.yBase, 0, h * (band.yBase + band.thickness));
        grad.addColorStop(0, `rgba(${band.hue}, 0.22)`);
        grad.addColorStop(0.55, `rgba(${band.hue}, 0.1)`);
        grad.addColorStop(1, `rgba(${band.hue}, 0)`);
        ctx!.fillStyle = grad;
        ctx!.fill();
      });
      ctx!.restore();

      ctx!.save();
      starsRef.current!.forEach(([sx, sy, r, a]) => {
        ctx!.beginPath();
        ctx!.arc(sx * w, sy * h, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(230, 229, 225, ${a})`;
        ctx!.fill();
      });
      ctx!.restore();
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      frame(0);
    } else {
      const tick = (time: number) => {
        frame(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeDept = activeId && activeId !== "brain" ? DEPARTAMENTOS.find((d) => d.id === activeId) : null;
  const drawerOpen = activeId !== null;

  return (
    <div className={styles.stage} ref={stageRef}>
      <canvas className={styles.aurora} ref={auroraCanvasRef} aria-hidden="true" />
      <svg className={styles.roots} ref={rootsRef} aria-hidden="true" />

      <div className={`${styles.hud} ${styles.hudTop}`}>
        <div>
          <Link href="/visao" className={styles.backLink}>
            ← sistema OS
          </Link>
          <p className={styles.eyebrow}>IRBIS · Company Brain</p>
          <h1 className={styles.title}>Sete departamentos, um cérebro, um dono.</h1>
          <p className={styles.lede}>
            Cada árvore é uma frente da operação. Cada galho é um job real. Toque numa árvore
            pra ver quem — ou o quê — faz esse trabalho hoje.
          </p>
        </div>
        <div className={styles.legend}>
          <div className={styles.legendRow}>
            <span>100% IA</span>
            <span className={`${styles.dot} ${styles.ai}`} />
          </div>
          <div className={styles.legendRow}>
            <span>Humano + IA</span>
            <span className={`${styles.dot} ${styles.assisted}`} />
          </div>
          <div className={styles.legendRow}>
            <span>Humano lidera</span>
            <span className={`${styles.dot} ${styles.human}`} />
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.brainNode} ${firstLook ? styles.firstLook : ""}`}
        aria-haspopup="dialog"
        onClick={() => setActiveId("brain")}
      >
        <span className={styles.brainCore}>
          <span className={styles.glow} />
          <span className={`${styles.ring} ${styles.ring2}`} />
          <span className={styles.ring} />
          <span className={styles.core} />
        </span>
        <span className={styles.brainLabel}>Company Brain</span>
      </button>

      {DEPARTAMENTOS.map((dept) => {
        const pos = positions[dept.id];
        const jobs = jobsPorDepartamento[dept.id] ?? [];
        const gaps = jobs.filter((j) => !j.skill).length;
        const isActive = activeId === dept.id;
        return (
          <button
            key={dept.id}
            type="button"
            className={`${styles.treeNode} ${isActive ? styles.active : ""} ${
              drawerOpen && !isActive ? styles.dimmed : ""
            }`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            aria-label={`${dept.nome} — ${jobs.length} jobs`}
            onClick={() => setActiveId(dept.id)}
          >
            <canvas
              ref={(el) => {
                treeCanvasRefs.current[dept.id] = el;
              }}
              width={184}
              height={184}
              style={{ width: 92, height: 92 }}
            />
            <span className={styles.treeName}>{dept.nome}</span>
            <span className={styles.treeCount}>
              {jobs.length} jobs · {gaps} sem skill
            </span>
          </button>
        );
      })}

      <div className={`${styles.hud} ${styles.hudBottom}`}>
        <div className={styles.statStrip}>
          <div className={`${styles.stat} ${styles.statLead}`}>
            <b>{Math.round((rodandoSozinho / totalJobs) * 100)}%</b>
            <span>Rodando sozinho</span>
          </div>
          <div className={styles.stat}>
            <b>{comSkill}</b>
            <span>Com skill hoje</span>
          </div>
          <div className={styles.stat}>
            <b>{totalJobs - comSkill}</b>
            <span>Sem dono de IA</span>
          </div>
          <div className={styles.stat}>
            <b>{totalJobs}</b>
            <span>Jobs mapeados</span>
          </div>
        </div>
        <p className={styles.hint}>clique numa árvore ou no cérebro central</p>
      </div>

      <div
        className={`${styles.scrim} ${drawerOpen ? styles.open : ""}`}
        onClick={() => setActiveId(null)}
      />
      <aside
        className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}
        role="dialog"
        aria-hidden={!drawerOpen}
      >
        <div className={styles.drawerHead}>
          <button type="button" className={styles.drawerClose} aria-label="Fechar" onClick={() => setActiveId(null)}>
            ✕
          </button>
          {activeId === "brain" ? (
            <>
              <p className={styles.drawerEyebrow}>O núcleo</p>
              <h2>Company Brain</h2>
              <p>A base que deveria saber 100% do que acontece na IRBIS. Hoje existe, mas fragmentada.</p>
            </>
          ) : activeDept ? (
            <>
              <p className={styles.drawerEyebrow}>Departamento</p>
              <h2>{activeDept.nome}</h2>
              <p>{activeDept.tagline}</p>
            </>
          ) : null}
        </div>
        <div className={styles.drawerBody}>
          {activeId === "brain" &&
            brainFacts.map((f) => (
              <div className={styles.brainFact} key={f.k}>
                <span className={styles.k}>{f.k}</span>
                <span className={`${styles.v} ${f.pending ? styles.pending : ""}`}>{f.v}</span>
              </div>
            ))}
          {activeDept &&
            (jobsPorDepartamento[activeDept.id] ?? []).map((job) => (
              <div className={styles.jobRow} key={job.titulo}>
                <div className={styles.jobTop}>
                  <span className={styles.jobTitle}>{job.titulo}</span>
                  <span className={`${styles.pill} ${styles[job.nivel_automacao]}`}>
                    {NIVEL_LABEL[job.nivel_automacao]}
                  </span>
                </div>
                <span className={`${styles.jobSkill} ${job.skill ? "" : styles.gap}`}>
                  {job.skill ?? "Sem skill — a construir"}
                </span>
              </div>
            ))}
        </div>
      </aside>
    </div>
  );
}
