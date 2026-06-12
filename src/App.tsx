import { useEffect, useRef, useState } from "react";

/* ============================================================
   👇 EDIT YOUR DETAILS HERE — change these and the whole page updates
   ============================================================ */
const WHATSAPP_LINK =
  "https://chat.whatsapp.com/BmGN6km0J4XCShWNTKyx9Z?s=cl&p=a&mlu=2"; // 👈 all buttons link here
const PRICE = "₦20,000"; // 👈 REPLACE with your real price
const ANCHOR_PRICE = "₦60,000"; // 👈 the struck-through "normally" price
const TOTAL_VALUE = "₦310,000"; // 👈 total stacked value
const CREATOR_NAME = "David"; // 👈 REPLACE with your name
const CREATOR_AGE = "24"; // 👈 your age (used in the headline story)
const MEMBER_COUNT = "240+";
const YEAR = new Date().getFullYear();
/* ============================================================ */

/* ---------- Inline SVG Icons ---------- */
const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const XIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const StarIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.605zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);


/* Feature card icons */
const featureIcons = [
  (c: string) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
  ),
  (c: string) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg>
  ),
  (c: string) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v12H4z" /><path d="M2 20h20" /><path d="M9 8h6" /></svg>
  ),
  (c: string) => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" /><path d="M9 21h6" /><path d="M10 17v4" /><path d="M14 17v4" /></svg>
  ),
];

/* ---------- Reveal-on-scroll hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- CTA Button ---------- */
function CTA({ children, className = "", big = false }: { children: React.ReactNode; className?: string; big?: boolean }) {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent font-semibold uppercase tracking-wide text-bg transition-all duration-200 hover:bg-accent-dark hover:scale-[1.02] hover:shadow-glow ${big ? "px-10 py-5 text-lg" : "px-8 py-4 text-base"} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children}
      <ArrowIcon className="h-5 w-5" />
    </a>
  );
}

/* ---------- Reusable section heading ---------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{children}</p>;
}

/* Placeholder avatar */
function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-display text-lg font-bold text-bg">
      {initials}
    </div>
  );
}

export default function App() {
  useReveal();
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowStickyNav(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const steps = [
    { title: "Pick a Proven Offer", desc: "Choose from done-for-you affiliate offers that already pay daily. No guessing what sells." },
    { title: "Launch Simple Ads", desc: "Run the exact ad templates that bring buyers — even on a small ₦5,000 budget." },
    { title: "Build a Funnel That Sells", desc: "Plug into ready-made funnels that turn clicks into cash while you sleep." },
    { title: "Scale With AI", desc: "Use AI to write, design and automate so one person runs like a full team." },
  ];

  const inside = [
    { name: "The 4-Step Profit Blueprint", outcome: "The exact daily system to go from zero to your first online income — no fluff, just steps.", value: "₦90,000" },
    { name: "Live Weekly Trainings", outcome: "Watch me build campaigns live and ask questions in real time until it clicks.", value: "₦80,000" },
    { name: "Done-For-You Funnel Templates", outcome: "Copy-paste funnels and pages so you launch in hours, not months.", value: "₦60,000" },
    { name: "AI Money Toolkit", outcome: "My exact AI prompts for ads, content and automation that save you 20+ hours a week.", value: "₦40,000" },
    { name: "Private WhatsApp Community", outcome: `Join ${MEMBER_COUNT} hungry members posting wins, answers and accountability daily.`, value: "₦25,000" },
    { name: "Beginner Fast-Start Guide", outcome: "Get your first setup done in 48 hours — even if you've never made a naira online.", value: "₦15,000" },
  ];

  const bonuses = [
    { name: "BONUS: Ad Account Recovery Playbook", outcome: "Never lose money to banned ad accounts again.", value: "₦20,000" },
    { name: "BONUS: ₦100K Case Study Vault", outcome: "Real member campaigns broken down step-by-step.", value: "₦25,000" },
  ];

  const testimonials = [
    { quote: "I went from a ₦23K/month teaching salary to ₦450K+ working from home. This system is the realest thing I've touched online.", name: "Emeka O.", role: "Former Teacher, Now Full-Time Marketer", initials: "EO" },
    { quote: "Made my first ₦80,000 in 3 weeks following the 4 steps. I almost didn't join because I'd been scammed before. So glad I did.", name: "Aisha B.", role: "Student, Lagos", initials: "AB" },
    { quote: "The live trainings are gold. No theory — he shows you his actual screen and you copy it. I now run ads that print money daily.", name: "Tunde A.", role: "Freelancer, Ibadan", initials: "TA" },
  ];

  const faqs = [
    { q: "I've never made money online before. Will this work for me?", a: "Yes. The 4-Step Blueprint and Fast-Start Guide are built for complete beginners. You'll be told exactly what to do, in order, with live support if you get stuck." },
    { q: "How much money do I need to start?", a: "You can begin with as little as ₦5,000 for ads. We show you the lowest-cost way to get your first results before you scale up." },
    { q: `Is ${CREATOR_NAME} really making money with this?`, a: `Yes — and you'll see it live. Every week ${CREATOR_NAME} builds real campaigns on screen so you watch the exact process, not slideshows.` },
    { q: "How fast can I see results?", a: "Many members see their first income within 2–4 weeks of applying the steps. Your speed depends on how consistently you follow the system." },
    { q: "What exactly do I get when I join?", a: `Instant access to the WhatsApp community, the 4-Step Blueprint, live weekly trainings, done-for-you funnels, the AI toolkit, and all bonuses — a complete system worth ${TOTAL_VALUE}.` },
    { q: "Do I need to show my face or have a big following?", a: "No. This is built around affiliate offers, ads and funnels — you can stay completely faceless and still profit." },
    { q: "Is this a one-time payment?", a: `Yes. You pay ${PRICE} once and get access to the community and trainings. No hidden monthly surprises.` },
    { q: "How do I join?", a: "Tap any button on this page. It opens our WhatsApp community instantly where you'll get your onboarding and next steps." },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* ===== ANNOUNCEMENT BAR ===== */}
      <div className="bg-primary text-bg">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-4 py-2 text-xs font-semibold sm:text-sm">
          <span>🔥 Live cohort is filling fast — limited seats for new members this week.</span>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden shrink-0 underline underline-offset-2 hover:opacity-80 sm:inline">
            Secure your seat →
          </a>
        </div>
      </div>

      {/* ===== STICKY NAV ===== */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/90 backdrop-blur transition-transform duration-300 ${showStickyNav ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-3">
          <span className="font-display text-lg font-extrabold">
            24/7 <span className="text-primary">Profit System</span>
          </span>
          <div className="hidden items-center gap-6 text-sm text-text-muted md:flex">
            <a href="#steps" className="hover:text-text">The 4 Steps</a>
            <a href="#inside" className="hover:text-text">What You Get</a>
            <a href="#proof" className="hover:text-text">Results</a>
            <a href="#faq" className="hover:text-text">FAQ</a>
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-bg transition-all hover:bg-accent-dark hover:scale-[1.02]">
            Secure Seat
          </a>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-4 pb-24 pt-20 text-center md:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[900px]">
          <Eyebrow>For Ambitious Nigerians Ready to Earn Online</Eyebrow>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight">
            How to Make Your First Income Online in{" "}
            <span className="text-primary">30 Days</span> — Even If You're Broke, Busy & Have Zero Experience
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-lg text-text-muted">
            In just 4 simple steps, I'll show you how this {CREATOR_AGE}-year-old is milking the internet daily — using affiliate marketing, ads, funnels and AI.
          </p>

          {/* Hero visual (replace src with your headshot) */}
          <div className="mx-auto mt-10 max-w-[760px] overflow-hidden rounded-[20px] border border-border shadow-prominent">
            <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-surface-2 to-surface">
              <div className="text-center">
                <WhatsAppIcon className="mx-auto h-14 w-14 text-primary" />
                <p className="mt-3 text-sm text-text-muted">▶ Drop your VSL or headshot here (replace this block)</p>
              </div>
            </div>
          </div>

          {/* Social proof badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="rounded-full border border-border bg-surface px-4 py-2"><strong className="text-primary">{MEMBER_COUNT}</strong> members inside</span>
            <span className="rounded-full border border-border bg-surface px-4 py-2">Learn from an <strong className="text-primary">8-figure marketer</strong></span>
            <span className="rounded-full border border-border bg-surface px-4 py-2">Real results, <strong className="text-primary">real people</strong></span>
          </div>

          <div ref={heroCtaRef} className="mt-10">
            <CTA big>Join the WhatsApp Community</CTA>
            <p className="mt-4 text-sm text-text-muted">🔒 Instant access · No experience needed · Start today</p>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM ===== */}
      <section className="bg-surface px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[760px] fade-in">
          <h2 className="text-center text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">Sound Familiar?</h2>
          <p className="mx-auto mt-5 max-w-[640px] text-center text-lg text-text-muted">
            You scroll past people younger than you flexing online money — and quietly wonder what they know that you don't.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              "I'm tired of working hard every month and still ending up broke.",
              "I've bought \"online money\" courses before and got dumped with theory and zero support.",
              "Everyone says \"make money online\" but nobody shows me the exact steps.",
              "I don't have a big following, fancy laptop, or millions to start with.",
              "I'm scared of getting scammed again by another fake guru.",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-[12px] border border-border bg-surface-2 p-4">
                <XIcon className="mt-0.5 h-5 w-5 shrink-0 text-error" />
                <span className="text-text">{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-lg font-semibold text-primary">
            If any of this sounds like you — keep reading. This is for you.
          </p>
        </div>
      </section>

      {/* ===== AGITATION ===== */}
      <section className="px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[700px] text-center fade-in">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
            Every Month You Wait Is Money You'll Never Get Back
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            Another year passes. Prices keep rising. Your salary doesn't. The same people who started "small" online last year are now earning in a week what you earn in a month — while you're still thinking about it.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            Staying stuck isn't free. It costs you time, opportunity, and the life you actually want.
          </p>
          <p className="mt-8 text-xl font-bold text-primary">But there's a better way.</p>
        </div>
      </section>

      {/* ===== INTRODUCTION ===== */}
      <section className="bg-surface px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[1100px] fade-in">
          <div className="text-center">
            <Eyebrow>Introducing</Eyebrow>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">The 24/7 Profit System</h2>
            <p className="mx-auto mt-4 max-w-[620px] text-lg text-text-muted">
              The step-by-step system + live community that takes you from confused beginner to earning online — in weeks, not years.
            </p>
          </div>
          <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-[20px] border border-border shadow-prominent">
              <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-surface-2 to-bg">
                <p className="px-6 text-center text-sm text-text-muted">📦 Replace with product/course mockup</p>
              </div>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-text">
                This isn't another PDF you'll never open. It's a living system: proven steps, done-for-you templates, and live weekly trainings where you watch real money get made.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-muted">
                You plug in, follow along, and get help the moment you're stuck inside our {MEMBER_COUNT}-member WhatsApp community. No theory overload. No being left alone.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-muted">
                Everything is built for the Nigerian reality — small budgets, big ambition, fast results.
              </p>
              <div className="mt-8">
                <CTA>Join the Community Now</CTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE 4 STEPS / WHAT'S INSIDE ===== */}
      <section id="steps" className="px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center fade-in">
            <Eyebrow>The System</Eyebrow>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">4 Simple Steps to Daily Online Income</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {steps.map((s, i) => (
              <article key={s.title} className="fade-in rounded-[20px] border border-border bg-surface p-8 shadow-medium transition-all hover:shadow-prominent">
                <div className="flex items-center gap-4">
                  <span className="font-display text-4xl font-extrabold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {featureIcons[i]("h-8 w-8 text-primary")}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-text-muted">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT YOU GET ===== */}
      <section id="inside" className="bg-surface px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center fade-in">
            <Eyebrow>Everything Included</Eyebrow>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">Here's Exactly What You Get</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {inside.map((item, i) => (
              <article key={item.name} className="fade-in rounded-[20px] border border-border bg-surface-2 p-8 shadow-medium transition-all hover:shadow-prominent">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">Module {String(i + 1).padStart(2, "0")}</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Value: {item.value}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
                <p className="mt-2 text-text-muted">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT THE CREATOR ===== */}
      <section className="px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[1100px] fade-in">
          <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div className="overflow-hidden rounded-[20px] border border-border shadow-prominent">
              <div className="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-surface-2 to-bg">
                <p className="px-6 text-center text-sm text-text-muted">🧑🏾 Replace with headshot.jpg</p>
              </div>
            </div>
            <div>
              <Eyebrow>Meet Your Trainer</Eyebrow>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">Hi, I'm {CREATOR_NAME}</h2>
              <p className="mt-5 text-lg leading-relaxed text-text-muted">
                A few years ago I was {CREATOR_AGE} and broke, watching everyone else seem to "figure it out" online. So I locked in, tested everything, and cracked a simple system that pays me daily.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-muted">
                Now I run an 8-figure marketing operation — and I teach the exact steps live to {MEMBER_COUNT} members inside the 24/7 Profit System. No guru act. Just a peer who's slightly ahead, showing you the way.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { n: "8-Figure", l: "Marketer" },
                  { n: MEMBER_COUNT, l: "Members Trained" },
                  { n: "Daily", l: "Online Income" },
                ].map((s) => (
                  <div key={s.l} className="rounded-[12px] border border-border bg-surface p-4 text-center">
                    <p className="font-display text-2xl font-extrabold text-primary">{s.n}</p>
                    <p className="mt-1 text-xs text-text-muted">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="proof" className="bg-surface px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center fade-in">
            <Eyebrow>Proof</Eyebrow>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">Real Results From Real Members</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <article key={t.name} className="fade-in flex flex-col rounded-[20px] border border-border bg-surface-2 p-8 shadow-prominent">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-5 w-5" />)}
                </div>
                <p className="mt-4 flex-1 text-text">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar initials={t.initials} />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-text-muted">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OFFER STACK ===== */}
      <section id="offer" className="px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center fade-in">
            <Eyebrow>The Offer</Eyebrow>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">Everything You Get When You Join Today</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-lg text-text-muted">
              A complete system worth <strong className="text-text">{TOTAL_VALUE}</strong> — yours for one low price.
            </p>
          </div>

          <div className="mt-10 space-y-3 fade-in">
            {inside.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-4 rounded-[12px] border border-border bg-surface p-4">
                <div className="flex items-center gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-success" />
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="shrink-0 text-sm text-text-muted">{item.value}</span>
              </div>
            ))}
            {bonuses.map((b) => (
              <div key={b.name} className="flex items-center justify-between gap-4 rounded-[12px] border border-primary/50 bg-primary/5 p-4">
                <div className="flex items-center gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium text-primary">{b.name}</span>
                </div>
                <span className="shrink-0 text-sm text-text-muted">{b.value}</span>
              </div>
            ))}
          </div>

          {/* Receipt summary */}
          <div className="mt-8 rounded-[20px] border border-border bg-surface-2 p-8 text-center shadow-prominent fade-in">
            <p className="text-lg">
              Total value:{" "}
              <span className="font-semibold text-error line-through">{TOTAL_VALUE}</span>
            </p>
            <p className="mt-2 text-sm text-text-muted">Normally <span className="line-through">{ANCHOR_PRICE}</span> — today, you pay just</p>
            <p className="font-display text-6xl font-extrabold text-accent">{PRICE}</p>
            <div className="mt-6">
              <CTA big>Secure My Seat Now</CTA>
            </div>
            <p className="mt-4 text-sm text-text-muted">💳 Secure checkout · 🔒 Instant access · ✅ Lifetime community access</p>
          </div>
        </div>
      </section>

      {/* ===== WHO IT'S FOR / NOT FOR ===== */}
      <section className="bg-surface px-4 py-20 md:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-8 fade-in md:grid-cols-2">
          <div className="rounded-[20px] border border-border bg-surface-2 p-8">
            <h3 className="text-xl font-semibold">This Is For You If...</h3>
            <ul className="mt-6 space-y-4">
              {[
                "You're ready to put in real effort to change your income.",
                "You want a step-by-step system, not vague motivation.",
                "You're starting with a small budget and big ambition.",
                "You want live support, not to be left alone with a PDF.",
                "You're tired of watching others win and ready to be next.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-text-muted">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-border bg-surface-2 p-8">
            <h3 className="text-xl font-semibold">This Is NOT For You If...</h3>
            <ul className="mt-6 space-y-4">
              {[
                "You want overnight riches with zero effort.",
                "You won't follow simple steps or show up to trainings.",
                "You're looking for a get-rich-quick scheme to complain about.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <XIcon className="mt-0.5 h-5 w-5 shrink-0 text-error" />
                  <span className="text-text-muted">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[760px]">
          <div className="text-center fade-in">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="mt-10 space-y-3 fade-in">
            {faqs.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-[12px] border border-border bg-surface">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold">{f.q}</span>
                  <span className="shrink-0 text-2xl font-bold text-primary">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-text-muted">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== URGENCY BLOCK ===== */}
      <section className="bg-primary px-4 py-20 text-bg md:py-24">
        <div className="mx-auto max-w-[700px] text-center fade-in">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-bg">Seats Are Limited — and Filling Fast</h2>
          <p className="mt-5 text-lg font-medium text-bg/80">
            Every day you wait is another day someone else takes the income you could be earning. The system works — but only if you're inside.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-bg px-10 py-5 text-lg font-semibold uppercase tracking-wide text-primary transition-all hover:scale-[1.02]">
            <WhatsAppIcon className="h-5 w-5" /> Join Before Seats Close <ArrowIcon className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* ===== FINAL CLOSE ===== */}
      <section className="px-4 py-24 text-center md:py-32">
        <div className="mx-auto max-w-[700px] fade-in">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">This Is Your Decision Point.</h2>
          <p className="mx-auto mt-6 max-w-[560px] text-lg text-text-muted">
            You can keep scrolling and stay exactly where you are. Or you can take one simple step today and start building real income online — with a proven system and a community that has your back. The choice is yours.
          </p>
          <div className="mt-10">
            <CTA big>Join the Community — {PRICE}</CTA>
          </div>
          <p className="mt-5 text-sm text-text-muted">🔒 Instant access · {MEMBER_COUNT} members inside · No experience needed</p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border px-4 py-10">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 text-sm text-text-muted sm:flex-row">
          <p>© {YEAR} {CREATOR_NAME} · 24/7 Profit System. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-text">Privacy Policy</a>
            <a href="#" className="hover:text-text">Terms</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-text">Contact</a>
          </div>
        </div>
      </footer>

      {/* ===== STICKY MOBILE CTA BAR ===== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/95 p-3 backdrop-blur md:hidden">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-base font-semibold uppercase tracking-wide text-bg">
          <WhatsAppIcon className="h-5 w-5" /> Join Community — {PRICE}
        </a>
      </div>
      <div className="h-20 md:hidden" />
    </div>
  );
}
