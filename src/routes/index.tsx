import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "motion/react";
import {
  ChevronLeft, ChevronRight, ChevronsDown, GraduationCap, Code2, Database, Cpu,
  ClipboardList, Network, Layers, Github, Instagram, Mail, CheckCircle2, Clock, Menu, X, Sparkles,
} from "lucide-react";
import fotoDaTurma from "@/assets/turma/foto-da-turma.jpg";
import fotoFlisol from "@/assets/trajetoria/flisol.jpg";
import desafioPoo from "@/assets/trajetoria/desafio-poo-ii.png";
import SplitText from "@/components/react-bits/SplitText";
import BlurText from "@/components/react-bits/BlurText";
import CountUp from "@/components/react-bits/CountUp";
import ShinyText from "@/components/react-bits/ShinyText";
import ScrollVelocity from "@/components/react-bits/ScrollVelocity";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import Magnet from "@/components/react-bits/Magnet";
import ClickSpark from "@/components/react-bits/ClickSpark";
import { alunos } from "@/data/alunos";
import { docentes } from "@/data/docentes";
import { ClientParticles, Reveal, ScrollProgress, Stagger, StaggerItem } from "@/components/motion-kit";

const EASE = [0.2, 0.7, 0.2, 1] as const;

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


const links = [["Sobre", "#sobre"], ["Turma", "#turma"], ["Docentes", "#docentes"], ["Grade", "#grade"]];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-border bg-card/80 px-6 py-3 shadow-md backdrop-blur-md">
        <motion.a href="#inicio" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1 font-display text-lg font-extrabold text-navy">
          BES<motion.span whileHover={{ rotate: -6, scale: 1.1 }} className="rounded bg-accent px-1.5 text-accent-foreground">2024</motion.span>
        </motion.a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map(([l, h], i) => (
            <motion.a
              key={h}
              href={h}
              initial={{ opacity: 0, y: -8 }}
              whileHover="hover"
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="relative py-1 font-display text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {l}
              <motion.span
                initial="rest"
                animate="rest"
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.25, ease: EASE }}
                className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded bg-accent"
              />
            </motion.a>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.85 }} className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "m"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="block"
            >
              {open ? <X /> : <Menu />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mx-auto mt-2 max-w-5xl origin-top rounded-2xl border border-border bg-card p-4 shadow-md md:hidden"
          >
            {links.map(([l, h], i) => (
              <motion.a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.3 }}
                className="block py-2 font-display font-semibold text-navy"
              >
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="inicio" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <motion.img src={fotoDaTurma} alt="Turma BES 2024 reunida no laboratório de informática" width={1600} height={1201} style={{ y: bgY, scale: bgScale }} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="pointer-events-none absolute inset-0">
        <ClientParticles particleColors={["#ffffff"]} particleCount={140} particleSpread={10} speed={0.06} particleBaseSize={80} moveParticlesOnHover={false} alphaParticles />
      </div>
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-32 text-center text-primary-foreground">
        <motion.div initial={{ opacity: 0, scale: 0.8, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}>
          <span className="inline-block rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest backdrop-blur">
            <ShinyText text="UEPA CAMPUS XXIII • Engenharia de Software" color="rgba(255,255,255,0.75)" shineColor="#ffffff" speed={3} />
          </span>
        </motion.div>
        <SplitText
          text="BES 2024"
          tag="h1"
          splitType="chars"
          delay={60}
          duration={1.1}
          from={{ opacity: 0, y: 90 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="center"
          className="mt-6 text-7xl font-black tracking-tight sm:text-8xl md:text-[10rem] leading-none"
        />
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 text-xl font-medium sm:text-2xl">
          <motion.span
            initial={{ opacity: 0, filter: "blur(12px)", scale: 0.8 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
            className="rounded-md bg-accent px-3 py-1 text-accent-foreground"
          >
            Sobreviventes
          </motion.span>
          <BlurText text="do Primeiro Semestre" delay={180} animateBy="words" className="justify-center" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
          className="mx-auto mt-12 max-w-md text-left"
        >
          <div className="mb-2 flex justify-between font-display text-sm font-semibold">
            <span>Progresso do Curso</span>
            <span><CountUp to={55} duration={2} delay={1.5} />% Concluído</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-primary-foreground/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "55%" }}
              transition={{ duration: 2, ease: EASE, delay: 1.5 }}
              className="h-full rounded-full bg-gradient-progress"
            />
          </div>
        </motion.div>
      </motion.div>
      <motion.a
        href="#sobre"
        aria-label="Rolar para baixo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2, duration: 0.6 }, y: { delay: 2, duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-6 right-6 z-10 text-navy md:right-12"
      >
        <ChevronsDown className="h-8 w-8" />
      </motion.a>
      <svg className="absolute bottom-0 left-0 w-full text-background" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: 120 }}>
        <path fill="currentColor" d="M0,120 L1440,20 L1440,120 Z" />
      </svg>
    </section>
  );
}

const story = [
  { img: fotoDaTurma, fit: "contain" as const, title: "A Gênese e o Batismo de Fogo", date: "Agosto de 2024", text: "Iniciamos nossa jornada acadêmica em agosto de 2024 sob circunstâncias que testariam a resiliência de qualquer engenheiro. Entre greves, semanas atípicas sem aulas e um quadro docente em formação, aprendemos desde o primeiro dia a principal competência da nossa profissão: resolução de problemas no caos. Saímos ilesos e oficialmente condecorados como 'Sobreviventes do Primeiro Semestre'." },
  { img: fotoFlisol, fit: "contain" as const, title: "Organização do FLISoL: Teoria vs. Prática", date: "Evento", text: "Com espírito empreendedor e nenhuma experiência prévia em gestão de eventos, assumimos a organização do FLISoL. Como era de se esperar, o cronograma foi um exercício empírico de teoria do caos mitigada. Contudo, graças ao suporte salvador dos veteranos e à integridade estrutural dos cachorros-quentes servidos, o evento consolidou-se como um marco vitorioso na nossa história." },
  { img: desafioPoo, fit: "contain" as const, title: "O Desafio de POO II e a Epopeia dos 41 Commits", date: "Domingo, 23:59", text: "Na disciplina de POO II, sob a tutela da Prof.ª Vanessa Rezende, fomos desafiados a arquitetar um sistema segmentado em camadas: Frontend, Serviços, API e Banco de Dados. A separação de responsabilidades foi impecável no papel, mas a comunicação entre times foi um teste de nervos. O desfecho memorável ocorreu no domingo às 23:59: um pull request histórico contendo 41 commits simultâneos que milagrosamente compilaram em produção." },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-14 text-center">
      <p className="font-display text-sm font-bold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-4xl font-extrabold text-navy md:text-5xl">{title}</h2>
    </Reveal>
  );
}

function ParallaxImage({ src, alt, fit = "cover" }: { src: string; alt: string; fit?: "cover" | "contain" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`aspect-[4/3] w-full overflow-hidden ${fit === "contain" ? "bg-black" : ""}`}>
      <motion.img src={src} alt={alt} loading="lazy" width={1024} height={1024} style={fit === "cover" ? { y, scale: 1.2 } : {}} className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`} />
    </div>
  );
}

function Marquee() {
  return (
    <div aria-hidden className="overflow-hidden border-y border-border bg-navy py-4 text-navy-foreground">
      <ScrollVelocity
        texts={["COMPILA • COMMITA • SOBREVIVE •", "BES 2024 • ENGENHARIA DE SOFTWARE • UEPA •"]}
        velocity={50}
        className="px-4 font-display text-2xl font-extrabold tracking-widest"
        scrollerClassName="text-2xl leading-loose"
      />
    </div>
  );
}

function Trajetoria() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle eyebrow="Sobre" title="Nossa Trajetória" />
      <div className="space-y-24">
        {story.map((s, i) => (
          <div key={s.title} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <Reveal direction={i % 2 ? "right" : "left"} className="overflow-hidden rounded-2xl shadow-md">
              <ParallaxImage src={s.img} alt={s.title} fit={s.fit ?? "cover"} />
            </Reveal>
            <Reveal direction={i % 2 ? "left" : "right"} delay={0.15}>
              <span className="font-display text-sm font-bold text-accent">0{i + 1} — {s.date}</span>
              <h3 className="mt-2 text-3xl font-bold text-navy">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          </div>
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
          <motion.button key={d} onClick={() => go(d)} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} aria-label={d < 0 ? "Anterior" : "Próximo"} className="rounded-full border border-border bg-card p-3 text-navy shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground">
            {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function Alunos() {
  const [studentIndex, setStudentIndex] = useState(0);
  const visibleStudents = alunos.slice(studentIndex, studentIndex + 4);
  const nextStudents = () => setStudentIndex((index) => index >= alunos.length - 4 ? 0 : index + 1);
  const previousStudents = () => setStudentIndex((index) => index <= 0 ? alunos.length - 4 : index - 1);

  return (
    <section id="turma" className="overflow-hidden bg-card px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[.18em] text-accent">
              <motion.span initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }} className="inline-block h-0.5 bg-accent" />
              A turma
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[.98] tracking-tight text-navy sm:text-5xl">
              Quem está no<br /><span className="text-accent">terminal?</span>
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.2} className="flex gap-2">
            <Magnet padding={40} magnetStrength={3}>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.88 }} onClick={previousStudents} aria-label="Alunos anteriores" className="grid h-11 w-11 place-items-center rounded-full border border-border text-navy transition-colors hover:border-primary hover:text-primary">
                <ChevronLeft className="h-[18px] w-[18px]" />
              </motion.button>
            </Magnet>
            <Magnet padding={40} magnetStrength={3}>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.88 }} onClick={nextStudents} aria-label="Próximos alunos" className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-navy">
                <ChevronRight className="h-[18px] w-[18px]" />
              </motion.button>
            </Magnet>
          </Reveal>
        </div>
        <div className="relative mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleStudents.map(({ name, image }, i) => (
              <motion.article
                key={name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: i * 0.08 } }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                whileHover={{ y: -8 }}
                transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
                className="group rounded-3xl border border-border/80 bg-background p-5 transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative mb-5 overflow-hidden rounded-2xl">
                  <img src={image} alt={`Foto de ${name}`} loading="lazy" width={320} height={320} className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                  <motion.div whileHover={{ rotate: 180, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }} className="absolute bottom-3 left-3 grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                  </motion.div>
                </div>
                <h3 className="font-display text-lg font-bold text-navy">{name}</h3>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Docentes() {
  return (
    <section id="docentes" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <Reveal>
          <p className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[.18em] text-accent">
            <motion.span initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }} className="inline-block h-0.5 bg-accent" />
            Corpo docente
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[.98] tracking-tight text-navy sm:text-5xl">
            Quem nos ajuda a<br /><span className="text-accent">compilar.</span>
          </h2>
        </Reveal>
        <Reveal direction="left" delay={0.2}>
          <p className="max-w-xs text-sm leading-6 text-navy/55">
            Mentoria, provocação e aquele olhar que encontra o bug antes da gente.
          </p>
        </Reveal>
      </div>
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
        {docentes.map(({ name, image }) => (
          <StaggerItem key={name} className="h-full" whileHover={{ y: -6 }}>
            <SpotlightCard
              spotlightColor="rgba(220, 60, 50, 0.14)"
              className="h-full rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative">
                <img src={image} alt={`Foto de ${name}`} loading="lazy" width={400} height={350} className="aspect-[1.15] w-full rounded-2xl object-cover object-top" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{name}</h3>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

const disciplinas = [
  { n: "Arquitetura de Software", p: "Prof. Alan Barreto", i: Layers, done: false },
  { n: "Cultura, Sociedade e Tecnologia", p: "Prof. Keny Goes", i: Network, done: true },
  { n: "Fundamentos de Redes de Computadores", p: "Prof. Alan Barreto", i: Database, done: false },
  { n: "Gerência de Projetos", p: "Prof.ª Jacqueline Rosario", i: ClipboardList, done: false },
  { n: "Processos de Desenvolvimento de Software", p: "Prof.ª Vanessa Rezende", i: Cpu, done: false },
  { n: "Robótica Móvel", p: "Prof. Keny Goes", i: Code2, done: false },
];

function Grade() {
  return (
    <section id="grade" className="bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Grade" title="Disciplinas" />
        <Carousel>
          {disciplinas.map(({ n, p, i: Icon, done }, idx) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: (idx % 3) * 0.1 } }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
              variants={{ hover: { y: -8, transition: { duration: 0.25 } } }}
              className="flex w-72 shrink-0 snap-start flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <motion.div variants={{ hover: { rotate: 12, scale: 1.15 } }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></motion.div>
              <h3 className="mt-5 text-lg font-bold leading-snug text-navy">{n}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><GraduationCap className="h-4 w-4" />{p}</p>
              <span className={`mt-auto pt-5`}>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-xs font-semibold ${done ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                  {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}{done ? "Concluída" : "Em curso"}
                </span>
              </span>
            </motion.div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <Stagger className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3" stagger={0.15}>
        <StaggerItem>
          <p className="font-display text-2xl font-extrabold">BES <span className="text-accent">2024</span></p>
          <p className="mt-3 text-sm opacity-75">Comissão organizadora: Lucas Henrique, Nicolas Sousa, Ikki Carvalho e Vitoria Mota.</p>
        </StaggerItem>
        <StaggerItem>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent">Links rápidos</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            {links.map(([l, h]) => (
              <li key={h}>
                <motion.a href={h} whileHover={{ x: 6 }} className="inline-block hover:opacity-100 hover:underline">{l}</motion.a>
              </li>
            ))}
          </ul>
        </StaggerItem>
        <StaggerItem>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent">Conecte-se</h4>
          <div className="mt-4 flex gap-3">
            {[[Github, "https://github.com"], [Instagram, "https://instagram.com"], [Mail, "mailto:bes2024@exemplo.com"]].map(([I, h], k) => {
              const Ic = I as typeof Github;
              return (
                <motion.a key={k} href={h as string} whileHover={{ y: -5, rotate: 8, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="rounded-lg border border-navy-foreground/20 p-2.5 transition-colors hover:border-accent hover:text-accent">
                  <Ic className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </StaggerItem>
      </Stagger>
      <Reveal className="border-t border-navy-foreground/10 py-6 text-center text-sm opacity-70">
        © 2024 BES. Compilado com orgulho pela turma BES 2024. Zero warnings, muitos erros corrigidos.
      </Reveal>
    </footer>
  );
}

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <ClickSpark sparkColor="#e03a2c" sparkSize={10} sparkRadius={22} sparkCount={9} duration={500}>
        <main className="font-sans">
          <ScrollProgress />
          <Navbar />
          <Hero />
          <Trajetoria />
          <Marquee />
          <Alunos />
          <Docentes />
          <Grade />
          <Footer />
        </main>
      </ClickSpark>
    </MotionConfig>
  );
}
