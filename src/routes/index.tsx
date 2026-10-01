import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Search, ChevronLeft, ChevronRight, GraduationCap, Code2, Database, Cpu,
  ClipboardList, Network, Layers, Github, Instagram, Mail, CheckCircle2, Clock, Menu, X, Sparkles,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import b1 from "@/assets/block1.jpg";
import b2 from "@/assets/block2.jpg";
import b3 from "@/assets/block3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BES 2024 — Turma de Engenharia de Software" },
      { name: "description", content: "Landing page oficial da turma BES 2024: Sobreviventes do Primeiro Semestre. Trajetória, alunos, docentes e disciplinas." },
      { property: "og:title", content: "BES 2024 — Sobreviventes do Primeiro Semestre" },
      { property: "og:description", content: "Conheça a turma BES 2024 de Engenharia de Software: história, alunos, professores e grade." },
    ],
  }),
  component: Index,
});

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setShow(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`${show ? "animate-fade-up" : "opacity-0"} ${className}`}>{children}</div>;
}

const links = [["Sobre", "#sobre"], ["Turma", "#turma"], ["Docentes", "#docentes"], ["Grade", "#grade"]];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-border bg-card/80 px-6 py-3 shadow-md backdrop-blur-md">
        <a href="#inicio" className="flex items-center gap-1 font-display text-lg font-extrabold text-navy">
          BES<span className="rounded bg-accent px-1.5 text-accent-foreground">2024</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="font-display text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">{l}</a>
          ))}
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 lg:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Buscar..." className="w-28 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </div>
        <a href="#turma" className="hidden rounded-lg bg-primary px-4 py-2 font-display text-sm font-semibold text-primary-foreground transition-colors hover:bg-navy sm:inline-block">Conheça a turma</a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-border bg-card p-4 shadow-md md:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block py-2 font-display font-semibold text-navy">{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <img src={hero} alt="Turma BES 2024" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-32 text-center text-primary-foreground animate-fade-up">
        <span className="inline-block rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest backdrop-blur">
          Turma Oficial • Engenharia de Software
        </span>
        <h1 className="mt-6 text-7xl font-black tracking-tight sm:text-8xl md:text-[10rem] leading-none">BES 2024</h1>
        <p className="mt-6 text-xl font-medium sm:text-2xl">
          <span className="rounded-md bg-accent px-3 py-1 text-accent-foreground">Sobreviventes</span> do Primeiro Semestre
        </p>
        <div className="mx-auto mt-12 max-w-md text-left">
          <div className="mb-2 flex justify-between font-display text-sm font-semibold">
            <span>Progresso do Curso</span><span>25% Concluído</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-primary-foreground/20">
            <div className="h-full w-1/4 rounded-full bg-gradient-progress" />
          </div>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full text-background" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: 120 }}>
        <path fill="currentColor" d="M0,120 L1440,20 L1440,120 Z" />
      </svg>
    </section>
  );
}

const story = [
  { img: b1, title: "A Gênese e o Batismo de Fogo", date: "Agosto de 2024", text: "Iniciamos nossa jornada acadêmica em agosto de 2024 sob circunstâncias que testariam a resiliência de qualquer engenheiro. Entre greves, semanas atípicas sem aulas e um quadro docente em formação, aprendemos desde o primeiro dia a principal competência da nossa profissão: resolução de problemas no caos. Saímos ilesos e oficialmente condecorados como 'Sobreviventes do Primeiro Semestre'." },
  { img: b2, title: "Organização do FLISoL: Teoria vs. Prática", date: "Evento", text: "Com espírito empreendedor e nenhuma experiência prévia em gestão de eventos, assumimos a organização do FLISoL. Como era de se esperar, o cronograma foi um exercício empírico de teoria do caos mitigada. Contudo, graças ao suporte salvador dos veteranos e à integridade estrutural dos cachorros-quentes servidos, o evento consolidou-se como um marco vitorioso na nossa história." },
  { img: b3, title: "O Desafio de POO II e a Epopeia dos 41 Commits", date: "Domingo, 23:59", text: "Na disciplina de POO II, sob a tutela da Prof.ª Vanessa Rezende, fomos desafiados a arquitetar um sistema segmentado em camadas: Frontend, Serviços, API e Banco de Dados. A separação de responsabilidades foi impecável no papel, mas a comunicação entre times foi um teste de nervos. O desfecho memorável ocorreu no domingo às 23:59: um pull request histórico contendo 41 commits simultâneos que milagrosamente compilaram em produção." },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-14 text-center">
      <p className="font-display text-sm font-bold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-4xl font-extrabold text-navy md:text-5xl">{title}</h2>
    </div>
  );
}

function Trajetoria() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle eyebrow="Sobre" title="Nossa Trajetória" />
      <div className="space-y-24">
        {story.map((s, i) => (
          <Reveal key={s.title} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="overflow-hidden rounded-2xl shadow-md">
              <img src={s.img} alt={s.title} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div>
              <span className="font-display text-sm font-bold text-accent">0{i + 1} — {s.date}</span>
              <h3 className="mt-2 text-3xl font-bold text-navy">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Carousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * 320, behavior: "smooth" });
  return (
    <div className="relative">
      <div ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-6">{children}</div>
      <div className="mt-2 flex justify-center gap-3">
        {[-1, 1].map((d) => (
          <button key={d} onClick={() => go(d)} aria-label={d < 0 ? "Anterior" : "Próximo"} className="rounded-full border border-border bg-card p-3 text-navy shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground">
            {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        ))}
      </div>
    </div>
  );
}

const alunos = [
  ["Lucas Andrade", "Frontend Enthusiast", "https://i.pravatar.cc/160?img=11"],
  ["Beatriz Lima", "Backend Warrior", "https://i.pravatar.cc/160?img=47"],
  ["Gabriel Siqueira", "QA & Café", "https://i.pravatar.cc/160?img=12"],
  ["Matheus Rocha", "Cloud Explorer", "https://i.pravatar.cc/160?img=14"],
  ["Larissa Fernandes", "UX & Research", "https://i.pravatar.cc/160?img=44"],
  ["Rafael Martins", "Database Tamer", "https://i.pravatar.cc/160?img=59"],
  ["Júlia Castro", "Product Mindset", "https://i.pravatar.cc/160?img=32"],
  ["Henrique Alves", "DevOps Rookie", "https://i.pravatar.cc/160?img=68"],
];

function Alunos() {
  const [studentIndex, setStudentIndex] = useState(0);
  const visibleStudents = alunos.slice(studentIndex, studentIndex + 4);
  const nextStudents = () => setStudentIndex((index) => index >= alunos.length - 4 ? 0 : index + 1);
  const previousStudents = () => setStudentIndex((index) => index <= 0 ? alunos.length - 4 : index - 1);

  return (
    <section id="turma" className="overflow-hidden bg-card px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[.18em] text-accent">
              <span className="inline-block h-0.5 w-8 bg-accent" />
              A turma
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[.98] tracking-tight text-navy sm:text-5xl">
              Quem está no<br /><span className="text-accent">terminal?</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={previousStudents} aria-label="Alunos anteriores" className="grid h-11 w-11 place-items-center rounded-full border border-border text-navy transition hover:border-primary hover:text-primary">
              <ChevronLeft className="h-[18px] w-[18px]" />
            </button>
            <button onClick={nextStudents} aria-label="Próximos alunos" className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-navy">
              <ChevronRight className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleStudents.map(([name, role, image]) => (
            <article key={name} className="group rounded-3xl border border-border/80 bg-background p-5 transition duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl">
              <div className="relative mb-5 overflow-hidden rounded-2xl">
                <img src={image} alt={`Foto de ${name}`} loading="lazy" width={320} height={320} className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                <div className="absolute bottom-3 left-3 grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-navy">{name}</h3>
              <p className="mt-1 text-sm text-primary">{role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const docentes = [
  { n: "Vanessa Rezende", m: "Programação Orientada a Objetos II", s: ["Java", "POO", "Arquitetura"], p: "https://i.pravatar.cc/240?img=49", d: true },
  { n: "Carlos Eduardo", m: "Algoritmos e Estrutura de Dados", s: ["Algoritmos", "C++", "Lógica"], p: "https://i.pravatar.cc/240?img=53" },
  { n: "Helena Prado", m: "Banco de Dados I", s: ["SQL", "Modelagem", "Postgres"], p: "https://i.pravatar.cc/240?img=45" },
  { n: "Roberto Moura", m: "Sistemas Operacionais", s: ["Linux", "Redes", "Processos"], p: "https://i.pravatar.cc/240?img=60" },
];

function Docentes() {
  return (
    <section id="docentes" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[.18em] text-accent">
            <span className="inline-block h-0.5 w-8 bg-accent" />
            Corpo docente
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[.98] tracking-tight text-navy sm:text-5xl">
            Quem nos ajuda a<br /><span className="text-accent">compilar.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-navy/55">
          Mentoria, provocação e aquele olhar que encontra o bug antes da gente.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {docentes.map((d) => (
          <Reveal key={d.n}>
            <article className={`h-full rounded-3xl border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${d.d ? "border-accent/60" : "border-border/80"}`}>
              <div className="relative">
                <img src={d.p} alt={`Professor ${d.n}`} loading="lazy" width={400} height={350} className="aspect-[1.15] w-full rounded-2xl object-cover object-top" />
                {d.d && <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-accent-foreground">Destaque</span>}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{d.n}</h3>
              <p className="mt-2 text-sm font-semibold text-primary">{d.m}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.s.map((s) => (
                  <span key={s} className="rounded-md bg-background px-2 py-1 text-[11px] font-semibold text-navy/60">{s}</span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const disciplinas = [
  { n: "Programação Orientada a Objetos II", p: "Prof.ª Vanessa Rezende", i: Layers, done: false },
  { n: "Estrutura de Dados", p: "Prof. Carlos Eduardo", i: Network, done: true },
  { n: "Banco de Dados I", p: "Prof.ª Helena Prado", i: Database, done: false },
  { n: "Engenharia de Requisitos", p: "Prof.ª Vanessa Rezende", i: ClipboardList, done: true },
  { n: "Sistemas Operacionais", p: "Prof. Roberto Moura", i: Cpu, done: false },
  { n: "Algoritmos e Programação", p: "Prof. Carlos Eduardo", i: Code2, done: true },
];

function Grade() {
  return (
    <section id="grade" className="bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Grade" title="Disciplinas" />
        <Carousel>
          {disciplinas.map(({ n, p, i: Icon, done }) => (
            <div key={n} className="flex w-72 shrink-0 snap-start flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-5 text-lg font-bold leading-snug text-navy">{n}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><GraduationCap className="h-4 w-4" />{p}</p>
              <span className={`mt-auto pt-5`}>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-xs font-semibold ${done ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                  {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}{done ? "Concluída" : "Em curso"}
                </span>
              </span>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold">BES <span className="text-accent">2024</span></p>
          <p className="mt-3 text-sm opacity-75">Comissão organizadora: Lucas Andrade, Beatriz Lima e Larissa Fernandes.</p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent">Links rápidos</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            {links.map(([l, h]) => <li key={h}><a href={h} className="hover:opacity-100 hover:underline">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent">Conecte-se</h4>
          <div className="mt-4 flex gap-3">
            {[[Github, "https://github.com"], [Instagram, "https://instagram.com"], [Mail, "mailto:bes2024@exemplo.com"]].map(([I, h], k) => {
              const Ic = I as typeof Github;
              return <a key={k} href={h as string} className="rounded-lg border border-navy-foreground/20 p-2.5 transition-colors hover:border-accent hover:text-accent"><Ic className="h-5 w-5" /></a>;
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-6 text-center text-sm opacity-70">
        © 2024 BES. Compilado com orgulho pela turma BES 2024. Zero warnings, muitos erros corrigidos.
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="font-sans">
      <Navbar />
      <Hero />
      <Trajetoria />
      <Alunos />
      <Docentes />
      <Grade />
      <Footer />
    </main>
  );
}
