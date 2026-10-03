import {
  motion,
  useScroll,
  useSpring,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

type Direction = "up" | "left" | "right";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  left: { x: -48 },
  right: { x: 48 },
};

/** Revela o conteúdo quando entra na viewport (uma única vez). */
export function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Container que anima filhos `StaggerItem` em cascata ao entrar na viewport. */
export function Stagger({
  children,
  className = "",
  stagger = 0.1,
  delayChildren = 0,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView" | "animate">) {
  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & Omit<HTMLMotionProps<"div">, "variants">) {
  return (
    <motion.div className={className} variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}

/** Barra fina no topo que acompanha o progresso de rolagem da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-progress"
      style={{ scaleX }}
    />
  );
}

const LazyParticles = lazy(() => import("@/components/react-bits/Particles"));

/** Particles usa WebGL (ogl): só é carregado no cliente, depois da hidratação. */
export function ClientParticles(props: React.ComponentProps<typeof LazyParticles>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <LazyParticles {...props} />
    </Suspense>
  );
}
