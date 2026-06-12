import { useEffect, useRef, useState } from "react";
import { useReveal } from "./hooks/useReveal";
import {
  CONFIG, STATS, STEPS, PAINS, INSIDE, TESTIMONIALS,
  FOR_YOU, NOT_FOR_YOU, FAQS,
} from "./data";
import {
  Check, Cross, Star, Plus, Minus, Arrow, WhatsApp,
  ChartIcon, FunnelIcon, RobotIcon, UsersIcon, PlayIcon,
  ShieldIcon,
} from "./components/Icons";

const ICONS: Record<string, (p: { className?: string }) => React.ReactElement> = {
  chart: ChartIcon, funnel: FunnelIcon, robot: RobotIcon,
  users: UsersIcon, play: PlayIcon,
};

/* ============ Shared building blocks ============ */

function CTAButton({
  children, className = "", innerRef,
}: { children: React.ReactNode; className?: string; innerRef?: React.Ref<HTMLAnchorElement> }) {
  return (
    <a
      ref={innerRef}
      href={CONFIG.checkoutUrl}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-9 py-4 font-body text-sm font-semibold uppercase tracking-[0.02em] text-bg shadow-[0_0_24px_rgba(245,166,35,0.25)] transition-all duration-200 hover:scale-[1.02] hover:bg-accent-dark hover:shadow-[0_0_36px_rgba(245,166,35,0.45)] sm:text-base ${className}`}
    >
      {children}
      <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">
      {children}
    </span>
  );
}

function TrustLine({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-body text-xs text-muted sm:text-sm ${className}`}>
      {children}
    </p>
  );
}

/* ============ App ============ */

export default function App() {
  useReveal();
  const heroCtaRef = useRef<HTMLAnchorElement>(null);
  const [showNavCta, setShowNavCta] = useState(false);

  // Hide nav CTA while hero CTA is in view
  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowNavCta(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg font-body text-text">
      {/* ===== SECTION 1 — ANNOUNCEMENT BAR ===== */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 py-2.5">
          <p className="font-body text-xs font-medium text-text sm:text-sm">
            <span className="text-warning font-semibold">⚡ Limited seats</span>{" "}
            for this week's live training intake.
          </p>
          <a href={CONFIG.checkoutUrl} className="shrink-0 font-body text-xs font-semibold uppercase tracking-wide text-accent hover:text-accent-dark sm:text-sm">
            Claim seat →
          </a>
        </div>
      </div>

      {/* ===== STICKY NAV ===== */}
      <nav className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-3">
          <a href="#top" className="font-display text-lg font-extrabold tracking-tight text-text">
            24/7 <span className="text-primary">Profit</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {[["Problem", "#problem"], ["Steps", "#steps"], ["Proof", "#proof"], ["Offer", "#offer"], ["FAQ", "#faq"]].map(
              ([label, href]) => (
                <a key={href} href={href} className="font-body text-sm text-muted transition-colors hover:text-text">
                  {label}
                </a>
              )
            )}
          </div>
          <a
            href={CONFIG.checkoutUrl}
            className={`hidden rounded-full bg-accent px-5 py-2 font-body text-sm font-semibold uppercase tracking-wide text-bg transition-all duration-300 hover:bg-accent-dark md:inline-flex ${
              showNavCta ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            Secure Your Seat
          </a>
        </div>
      </nav>

      <main id="top">
        {/* ===== SECTION 2 — HERO ===== */}
        <section className="hero-glow relative overflow-hidden border-b border-border px-4 py-20 sm:py-28">
          <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
            <Eyebrow>For ambitious Nigerians who are done waiting</Eyebrow>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-text">
              How to Make Your First{" "}
              <span className="text-primary">Real Money Online</span> in 30 Days —
              Even With Zero Experience or Audience
            </h1>
            <p className="mt-6 max-w-[620px] font-body text-lg leading-relaxed text-muted">
              In 4 simple steps, I'll show you the exact system this {CONFIG.trainerAge}-year-old
              uses to milk the internet daily — affiliate offers, ads, funnels and AI.
            </p>

            {/* Hero visual: VSL or headshot */}
            <div className="mt-10 w-full max-w-[820px]">
              {CONFIG.vslUrl ? (
                <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.6)]" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={CONFIG.vslUrl}
                    title="24/7 Profit System training"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="mx-auto max-w-[420px] overflow-hidden rounded-2xl border border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                  <img
                    src="/images/trainer.jpg"
                    alt={`${CONFIG.trainerName}, creator of the ${CONFIG.productName}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Social proof badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[`${CONFIG.memberCount} members inside`, "Results from real people", "Taught by an 8-figure marketer"].map((b) => (
                <span key={b} className="rounded-full border border-border bg-surface px-4 py-2 font-body text-xs font-medium text-text sm:text-sm">
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <CTAButton innerRef={heroCtaRef}>Join the WhatsApp Community</CTAButton>
            </div>
            <TrustLine className="mt-4">
              <span>🔒 Secure checkout</span>
              <span>✅ Instant access</span>
              <span>💬 Start today</span>
            </TrustLine>
          </div>
        </section>

        {/* ===== SECTION 3 — THE PROBLEM ===== */}
        <section id="problem" className="border-b border-border bg-surface px-4 py-20 sm:py-24">
          <div className="reveal mx-auto max-w-[760px]">
            <h2 className="text-center font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.01em] text-text">
              Sound Familiar?
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-center font-body text-lg leading-relaxed text-muted">
              You know the internet is full of money. You just can't figure out how
              to grab your own piece — and it's starting to wear you down.
            </p>
            <ul className="mt-10 space-y-4">
              {PAINS.map((p) => (
                <li key={p} className="flex items-start gap-4 rounded-xl border border-border bg-surface2 p-5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-error/15">
                    <Cross className="h-4 w-4 text-error" />
                  </span>
                  <span className="font-body text-base leading-relaxed text-text">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-center font-display text-xl font-bold text-primary">
              If any of this sounds like you — keep reading. This is for you.
            </p>
          </div>
        </section>

        {/* ===== SECTION 4 — THE AGITATION ===== */}
        <section className="border-b border-border bg-bg px-4 py-20 sm:py-24">
          <div className="reveal mx-auto max-w-[700px] text-center">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.01em] text-text">
              Every Month You Wait Costs You More Than Money
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-muted">
              Another month passes. The same balance. The same excuses. Meanwhile
              people no smarter than you are quietly cashing out daily online. The
              longer you stay "thinking about it," the further ahead they get — and
              the harder it feels to ever start.
            </p>
            <p className="mt-8 font-display text-2xl font-bold text-primary">
              But there's a better way.
            </p>
          </div>
        </section>

        {/* ===== SECTION 5 — THE INTRODUCTION ===== */}
        <section className="border-b border-border bg-surface px-4 py-20 sm:py-24">
          <div className="reveal mx-auto max-w-[1100px]">
            <div className="text-center">
              <Eyebrow>The system</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.01em] text-text">
                Introducing the {CONFIG.productName}
              </h2>
              <p className="mx-auto mt-4 max-w-[620px] font-body text-lg text-muted">
                The exact step-by-step way to earn real money online — even if you're
                starting from zero today.
              </p>
            </div>
            <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                <img
                  src="/images/trainer.jpg"
                  alt={`${CONFIG.trainerName} teaching the ${CONFIG.productName}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-5">
                <p className="font-body text-lg leading-relaxed text-text">
                  The {CONFIG.productName} is a live training and private WhatsApp
                  community where you learn to make money online the same way I do —
                  affiliate offers, ads, funnels and AI.
                </p>
                <p className="font-body text-lg leading-relaxed text-muted">
                  No theory. No fluff. Just the exact 4 steps, taught live, with real
                  people getting real results beside you.
                </p>
                <p className="font-body text-lg leading-relaxed text-muted">
                  You don't need an audience, a product, or special skills. You need
                  the system — and the willingness to follow it.
                </p>
                <CTAButton className="mt-2">Secure Your Seat</CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 6 — WHAT'S INSIDE / THE 4 STEPS ===== */}
        <section id="steps" className="border-b border-border bg-bg px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[1100px]">
            <div className="reveal text-center">
              <Eyebrow>The 4 simple steps</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.01em] text-text">
                Here's Exactly How It Works
              </h2>
            </div>
            <div className="reveal mt-12 grid gap-6 md:grid-cols-2">
              {STEPS.map((s) => (
                <article key={s.n} className="group rounded-2xl border border-border bg-surface p-8 shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:[box-shadow:0_0_0_1px_rgba(201,168,76,0.3)]">
                  <span className="font-display text-4xl font-extrabold text-primary">{s.n}</span>
                  <h3 className="mt-3 font-display text-xl font-bold text-text">{s.title}</h3>
                  <p className="mt-2 font-body leading-relaxed text-muted">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 7 — ABOUT THE CREATOR ===== */}
        <section className="border-b border-border bg-surface px-4 py-20 sm:py-24">
          <div className="reveal mx-auto max-w-[1100px]">
            <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden rounded-2xl border border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                <img
                  src="/images/trainer.jpg"
                  alt={CONFIG.trainerName}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <Eyebrow>Your trainer</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.01em] text-text">
                  Hi, I'm {CONFIG.trainerName}
                </h2>
                <p className="mt-5 font-body text-lg leading-relaxed text-muted">
                  I'm {CONFIG.trainerAge} years old, and I make money on the internet
                  every single day. I wasn't born into it — I cracked the code through
                  affiliate offers, ads, funnels and AI, and I've helped {CONFIG.memberCount}{" "}
                  members start doing the same.
                </p>
                <p className="mt-4 font-body text-lg leading-relaxed text-muted">
                  I'm not a far-off guru. I'm a few steps ahead of you, and I teach
                  live every week so you can copy exactly what works — no guesswork.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {STATS.map((s) => (
                    <div key={s.label} className="rounded-xl border border-border bg-surface2 p-4 text-center">
                      <div className="font-display text-2xl font-extrabold text-primary sm:text-3xl">{s.value}</div>
                      <div className="mt-1 font-body text-xs leading-snug text-muted">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 8 — TESTIMONIALS ===== */}
        <section id="proof" className="border-b border-border bg-bg px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[1100px]">
            <div className="reveal text-center">
              <Eyebrow>The proof</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.01em] text-text">
                Real Results From Real Members
              </h2>
            </div>
            <div className="reveal mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="flex flex-col rounded-2xl border border-border bg-surface2 p-7 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,168,76,0.15)]">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 font-body text-base leading-relaxed text-text">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block font-body text-sm font-bold text-text">{t.name}</span>
                      <span className="block font-body text-xs text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 9 — THE OFFER STACK ===== */}
        <section id="offer" className="border-b border-border bg-surface px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[820px]">
            <div className="reveal text-center">
              <Eyebrow>The complete offer</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.01em] text-text">
                Everything You Get When You Join Today
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] font-body text-lg text-muted">
                A complete system worth {CONFIG.anchorPrice} — yours for one low price.
              </p>
            </div>

            <div className="reveal mt-12 space-y-4">
              {INSIDE.map((item, idx) => {
                const Icon = ICONS[item.icon];
                const isBonus = idx > 0;
                return (
                  <article
                    key={item.n}
                    className={`flex items-start gap-5 rounded-2xl bg-surface2 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.5)] ${
                      isBonus ? "border-l-4 border-accent border-y border-r border-y-border border-r-border" : "border border-border"
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {isBonus && (
                          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-wide text-accent">
                            Bonus
                          </span>
                        )}
                        <h3 className="font-display text-lg font-bold text-text">{item.title}</h3>
                      </div>
                      <p className="mt-1.5 font-body leading-relaxed text-muted">{item.body}</p>
                    </div>
                    <span className="hidden shrink-0 font-body text-sm font-semibold text-primary sm:block">
                      Value: {item.value}
                    </span>
                  </article>
                );
              })}
            </div>

            {/* Receipt-style summary */}
            <div className="reveal mt-10 rounded-2xl border border-primary/30 bg-surface2 p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-center gap-3 font-body text-lg text-muted">
                <span>Total value:</span>
                <span className="font-semibold text-error line-through decoration-2">{CONFIG.anchorPrice}</span>
              </div>
              <div className="mt-3 font-body text-sm uppercase tracking-[0.18em] text-muted">Today only</div>
              <div className="mt-1 font-display text-6xl font-extrabold tracking-tight text-accent">{CONFIG.price}</div>
              <div className="mt-8">
                <CTAButton className="w-full sm:w-auto">Secure Your Seat</CTAButton>
              </div>
              <TrustLine className="mt-5">
                <span>💳 Secure checkout</span>
                <span>🔒 Instant access</span>
                <span>✅ Lifetime community access</span>
              </TrustLine>
            </div>
          </div>
        </section>

        {/* ===== SECTION 10 — THE GUARANTEE ===== */}
        {/* [REVIEW] No guarantee confirmed by client — soft "show-up" promise used. Verify or remove. */}
        <section className="border-b border-border bg-bg px-4 py-20 sm:py-24">
          <div className="reveal mx-auto max-w-[700px] text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/40 bg-surface text-primary">
              <ShieldIcon className="h-10 w-10" />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.01em] text-text">
              The Show-Up Guarantee
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-muted">
              Show up to the live trainings, do the 4 steps, and stay active in the
              community. If you put in the work and don't see a real path to your
              first online income, I'll personally work with you until you do.
            </p>
            <p className="mt-6 font-display text-xl font-bold text-primary">
              The risk is on me, not you.
            </p>
          </div>
        </section>

        {/* ===== SECTION 11 — WHO IT'S FOR / NOT FOR ===== */}
        <section className="border-b border-border bg-surface px-4 py-20 sm:py-24">
          <div className="reveal mx-auto grid max-w-[1100px] gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-success/25 bg-surface2 p-8">
              <h3 className="font-display text-2xl font-bold text-text">This Is For You If…</h3>
              <ul className="mt-6 space-y-4">
                {FOR_YOU.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15">
                      <Check className="h-4 w-4 text-success" />
                    </span>
                    <span className="font-body leading-relaxed text-text">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-error/25 bg-surface2 p-8">
              <h3 className="font-display text-2xl font-bold text-text">This Is NOT For You If…</h3>
              <ul className="mt-6 space-y-4">
                {NOT_FOR_YOU.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-error/15">
                      <Cross className="h-4 w-4 text-error" />
                    </span>
                    <span className="font-body leading-relaxed text-text">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== SECTION 12 — FAQ ===== */}
        <FAQSection />

        {/* ===== SECTION 13 — URGENCY BLOCK ===== */}
        <section className="border-b border-border bg-primary px-4 py-20 text-bg sm:py-24">
          <div className="reveal mx-auto max-w-[700px] text-center">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-[-0.01em] text-bg">
              Seats For This Week's Intake Are Limited
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] font-body text-lg leading-relaxed text-bg/80">
              Every week you wait is another week of the same balance. The members
              earning today started exactly where you are now — they just decided.
            </p>
            <a
              href={CONFIG.checkoutUrl}
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-bg px-9 py-4 font-body text-sm font-semibold uppercase tracking-[0.02em] text-accent transition-all hover:scale-[1.02] sm:text-base"
            >
              Secure Your Seat Now <Arrow className="h-5 w-5" />
            </a>
          </div>
        </section>

        {/* ===== SECTION 14 — FINAL CLOSE ===== */}
        <section className="border-b border-border bg-bg px-4 py-24 sm:py-28">
          <div className="reveal mx-auto max-w-[700px] text-center">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-[-0.01em] text-text">
              This Is Your Decision Point.
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-muted">
              You can close this page and stay exactly where you are. Or you can take
              the same 4 steps {CONFIG.memberCount} people are already using to make
              money online — and finally start. No more watching from the sidelines.
            </p>
            <div className="mt-10">
              <CTAButton>Join the Community — {CONFIG.price}</CTAButton>
            </div>
            <TrustLine className="mt-5">
              <span>🔒 Secure checkout</span>
              <span>✅ Instant access</span>
              <span>💬 {CONFIG.memberCount} members inside</span>
            </TrustLine>
          </div>
        </section>

        {/* ===== SECTION 15 — FOOTER ===== */}
        <footer className="bg-surface px-4 py-10">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-body text-sm text-muted">
              © {CONFIG.year} {CONFIG.trainerName}. All rights reserved.
            </p>
            <div className="flex items-center gap-5 font-body text-sm text-muted">
              <a href="#" className="transition-colors hover:text-text">Privacy Policy</a>
              <span aria-hidden="true">·</span>
              <a href="#" className="transition-colors hover:text-text">Terms</a>
              <span aria-hidden="true">·</span>
              <a href={CONFIG.checkoutUrl} className="transition-colors hover:text-text">Contact</a>
            </div>
            <a href={CONFIG.checkoutUrl} aria-label="WhatsApp community" className="text-[#25D366] transition-opacity hover:opacity-80">
              <WhatsApp className="h-6 w-6" />
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-[820px] text-center font-body text-xs leading-relaxed text-muted/70">
            Income results mentioned are not typical and are not a guarantee of your
            results. Your results depend on your effort, consistency and market
            conditions. This is education, not a promise of earnings.
          </p>
        </footer>
      </main>

      {/* ===== MOBILE STICKY CTA BAR ===== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur-md md:hidden">
        <a
          href={CONFIG.checkoutUrl}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-bg shadow-[0_0_24px_rgba(245,166,35,0.35)]"
        >
          <WhatsApp className="h-5 w-5" /> Join — {CONFIG.price}
        </a>
      </div>
      <div className="h-20 md:hidden" aria-hidden="true" />
    </div>
  );
}

/* ============ FAQ Section (accordion) ============ */

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-border bg-surface px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-[760px]">
        <div className="reveal text-center">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.01em] text-text">
            Honest Answers Before You Join
          </h2>
        </div>
        <div className="reveal mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-xl border border-border bg-surface2">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-base font-bold text-text sm:text-lg">{item.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={`faq-panel ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="px-5 pb-5 font-body leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
