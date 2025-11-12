
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Settings2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TomZhang } from "@/lib/types/sampleOrbitViewProfile";
import { ChatInterface } from "@/components/chat/ChatInterface";
import type { AIPersonality } from "@/lib/types/types";

const spikeCopy =
  "Tom builds technical products that scale to hundreds of thousands of users—from incident response platforms to global crowdsourcing games. Strong systems thinker with Y Combinator recognition and a track record of shipping ambitious ideas in days, not months.";

const quickStats = [
  { label: "Shipped Projects", value: "9", subtext: "3 at 100k+ users" },
  { label: "Recent Recognition", value: "Top 20", subtext: "Hack the North 2025" },
  { label: "Technical Certifications", value: "4", subtext: "Meta, IBM, Penn" },
];

const backgroundHighlights = [
  "Prev @ Rove (YC W24) — Engineering",
  "Harvard TECH Summer Program Alumni",
  "Meta & IBM Certified Back-End Developer",
];

const suggestedQuestions = [
  "Does Tom have climate tech experience?",
  "What's his leadership style?",
  "Has he worked with early-stage startups?",
  "What hackathons does he recommend?",
];

const defaultPersonality: AIPersonality = {
  tone: "professional",
  formality_level: 7,
  response_length: "balanced",
  personality_traits: ["systems thinker", "fast execution"],
};

export default function MightyTmzProfilePage() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isChatOverlayOpen, setIsChatOverlayOpen] = useState(false);
  const [showPersonalityPanel, setShowPersonalityPanel] = useState(false);
  const [aiPersonality, setAiPersonality] = useState<AIPersonality>(defaultPersonality);

  const featuredProject = TomZhang.works[0];
  const featuredCover = featuredProject?.cover_image ?? null;

  const additionalProjects = useMemo(
    () => TomZhang.works.slice(1).map((work) => ({
      title: work.title,
      impact: work.impact ?? "",
      status: work.status,
      tags: work.tags,
      startDate: work.start_date,
      endDate: work.end_date,
      cover: work.cover_image,
      description: work.description,
      links: work.links,
    })),
    [] // TomZhang is static; safe to leave dependency array empty
  );

  const certifications = useMemo(() => TomZhang.accomplishments ?? [], []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/30 via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(248,113,113,0.1),transparent_60%)]" />
      </div>

      <header className="border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="text-lg font-semibold text-white">OrbitView</div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign Up
            </Button>
            <Button size="sm">Log In</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10 lg:flex-row">
        <aside className="space-y-6 lg:w-[280px]">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="relative mb-4 w-32">
              <div className="aspect-square overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={TomZhang.profile_picture.image}
                  alt={
                    TomZhang.profile_picture.alt ??
                    `${TomZhang.first_name} ${TomZhang.last_name}`
                  }
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <span className="absolute -right-2 bottom-2 flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="h-3 w-3" />
                Verified
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-semibold leading-tight">{TomZhang.first_name} {TomZhang.last_name}</h1>
              <p className="text-sm text-gray-300">
                {TomZhang.byline}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange-300">
              Quick Navigation
            </h2>
            <nav className="space-y-3 text-sm text-gray-300">
              <a href="#overview" className="block transition hover:text-white">
                About
              </a>
              <a href="#featured-work" className="block transition hover:text-white">
                Featured Work
              </a>
              <a href="#all-projects" className="block transition hover:text-white">
                All Projects
              </a>
              <a href="#chat" className="block transition hover:text-white">
                Chat with Tom&apos;s AI
              </a>
            </nav>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3">
              {TomZhang.social_links.map((social) => (
                <Button
                  key={social.platform}
                  asChild
                  variant="secondary"
                  size="sm"
                  className="w-full justify-between capitalize"
                >
                  <a href={social.url} target="_blank" rel="noreferrer">
                    <span>{social.platform}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-wider text-xs text-gray-400">Profile Views</span>
                <span className="text-base text-white">
                  {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                    TomZhang.analytics.total_views
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-wider text-xs text-gray-400">Conversations</span>
                <span className="text-base text-white">
                  {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                    TomZhang.analytics.total_conversations
                  )}
                </span>
              </div>
            </div>
          </section>
        </aside>

        <div className="flex-1 space-y-16">
          <section id="overview" className="space-y-10">
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/5 via-white/3 to-white/5 p-8 shadow-lg shadow-orange-500/10 backdrop-blur">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl space-y-6">
                  <div className="flex items-center gap-3 text-sm text-orange-300">
                    <Sparkles className="h-4 w-4" />
                    Layer 1 · 5-second impression
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold">🎯 The Spike</h2>
                    <p className="text-lg leading-relaxed text-gray-100">{spikeCopy}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {quickStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-4"
                      >
                        <div className="text-sm uppercase tracking-wide text-orange-300">
                          {stat.label}
                        </div>
                        <div className="text-2xl font-semibold text-white">{stat.value}</div>
                        <div className="text-xs text-orange-200">{stat.subtext}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-gray-300">
                  <p>High-stakes viewers connect fastest through the AI co-pilot.</p>
                  <Button
                    variant="gradient"
                    size="lg"
                    className="gap-2"
                    onClick={() => {
                      setIsChatOverlayOpen(true);
                      setShowPersonalityPanel(false);
                    }}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Ask Tom&apos;s AI
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-gray-200">
                    Browse manually
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-orange-300">
                Tom in 30 seconds
              </h3>
              <ul className="space-y-4 text-base leading-relaxed text-gray-200">
                {backgroundHighlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="featured-work" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wider text-orange-300">
                  Layer 2 · 30-second dive
                </p>
                <h2 className="text-2xl font-semibold text-white">🌟 Featured Work</h2>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="gap-2"
                onClick={() => setShowAllProjects(true)}
              >
                View All Projects
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>

            {featuredProject && (
              <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-orange-500/10">
                <div className="relative h-56 w-full bg-black sm:h-72">
                  {featuredCover ? (
                    <Image
                      src={featuredCover.image}
                      alt={featuredCover.alt ?? featuredProject.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/5 text-sm text-gray-400">
                      Visual coming soon
                    </div>
                  )}
                </div>
                <div className="space-y-6 p-8">
                  <header className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-sm text-amber-200">
                      🏅 {featuredProject.impact}
                    </div>
                    <h3 className="text-2xl font-semibold">{featuredProject.title}</h3>
                    <p className="text-base text-gray-200">{featuredProject.description}</p>
                  </header>

                  <section className="rounded-2xl border border-white/10 bg-black/40 p-6 text-gray-200">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-300">
                      Why this matters
                    </h4>
                    <p>
                      Demonstrates Tom&apos;s systems thinking and ability to ship tools that
                      earn trust from engineering teams under pressure.
                    </p>
                  </section>

                  <footer className="flex flex-wrap items-center gap-4">
                    {featuredProject.links?.map((link) => (
                      <Button
                        key={link.title}
                        asChild
                        variant="secondary"
                        size="sm"
                        className="gap-2"
                      >
                        <a href={link.link} target="_blank" rel="noreferrer">
                          {link.title}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </footer>
                </div>
              </article>
            )}

            <div className="grid gap-6 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-white">🎓 Background</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-200">
                  {backgroundHighlights.map((highlight) => (
                    <li key={`background-${highlight}`}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">💼 Currently looking for</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-200">
                  {(TomZhang.looking_for?.opportunities ?? []).map((opportunity) => (
                    <li key={opportunity}>• {opportunity}</li>
                  ))}
                </ul>
                <h3 className="mt-6 text-lg font-semibold text-white">🔗 Fast links</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TomZhang.social_links.map((social) => (
                    <Button
                      key={`link-${social.platform}`}
                      asChild
                      variant="ghost"
                      size="sm"
                      className="gap-2 capitalize text-gray-200"
                    >
                      <a href={social.url} target="_blank" rel="noreferrer">
                        {social.platform}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="all-projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">📁 All Projects</h2>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-gray-200"
                onClick={() => setShowAllProjects((prev) => !prev)}
              >
                {showAllProjects ? (
                  <>
                    Hide details
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    View all ({TomZhang.works.length})
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {showAllProjects && (
              <div className="grid gap-6 sm:grid-cols-2">
                {additionalProjects.map((project) => (
                  <article
                    key={project.title}
                    className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                  >
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm text-orange-200">{project.impact}</p>
                    <p className="mt-3 flex-1 text-sm text-gray-200">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-400">
                      {project.tags?.map((tag) => (
                        <span
                          key={`${project.title}-${tag}`}
                          className="rounded-full bg-white/5 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">📜 Certifications</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {certifications.map((cert) => (
                <article
                  key={cert.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                  <p className="mt-1 text-sm text-orange-200">{cert.issuer}</p>
                  <p className="mt-3 text-sm text-gray-300">{cert.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>{cert.date}</span>
                    {cert.link && (
                      <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="gap-2 text-xs"
                      >
                        <a href={cert.link} target="_blank" rel="noreferrer">
                          View credential
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="chat"
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/60 p-8 backdrop-blur"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-wide text-orange-300">
                  Layer 3 · AI conversation
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  💬 Chat with Tom&apos;s AI
                </h2>
                <p className="max-w-xl text-base text-gray-200">
                  Hi! I&apos;m Tom&apos;s AI. Ask anything about his work, experience, or what
                  he&apos;s currently looking for. I surface relevant proof points in seconds so
                  you can decide fast.
                </p>

                <div className="rounded-2xl border border-white/10 bg-black/50 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                    Suggested questions
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-gray-200">
                    {suggestedQuestions.map((question) => (
                      <li key={question} className="flex gap-3">
                        <ShieldIcon />
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex w-full max-w-md flex-col gap-3 rounded-2xl border border-orange-500/20 bg-black/60 p-6">
                <label className="text-sm font-medium text-orange-200">
                  Ask a question
                </label>
                <textarea
                  rows={4}
                  placeholder="Does Tom have climate tech experience?"
                  className="w-full rounded-xl border border-white/10 bg-black/70 p-4 text-sm text-white placeholder:text-gray-500 focus:border-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                />
                <Button variant="gradient" size="md" className="gap-2">
                  Send
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400"
                  onClick={() => {
                    setIsChatOverlayOpen(true);
                    setShowPersonalityPanel(true);
                  }}
                >
                  ⚙️ Adjust AI personality
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {isChatOverlayOpen && (
          <motion.div
            key="chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="pointer-events-auto m-4 flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#080808]/95 shadow-2xl shadow-orange-500/20"
            >
              <header className="flex items-center justify-between border-b border-white/10 bg-black/60 px-6 py-4">
                <div>
                  <div className="text-sm font-semibold text-white">Chat with Tom&apos;s AI</div>
                  <p className="text-xs text-gray-400">
                    Tone: {aiPersonality.tone} · Formality {aiPersonality.formality_level}/10 ·{" "}
                    {aiPersonality.response_length} responses
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                    onClick={() => setShowPersonalityPanel((prev) => !prev)}
                  >
                    <Settings2 className="h-4 w-4" />
                    {showPersonalityPanel ? "Hide adjustments" : "Adjust personality"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white"
                    onClick={() => setIsChatOverlayOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </header>

              <div className="flex flex-col gap-4 px-6 py-6 lg:flex-row">
                {showPersonalityPanel && (
                  <aside className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/70 p-5">
                    <PersonalitySettings
                      personality={aiPersonality}
                      onChange={setAiPersonality}
                      onReset={() => setAiPersonality(defaultPersonality)}
                    />
                  </aside>
                )}

                <div className="flex-1">
                  <div className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/60">
                    <ChatInterface
                      username="Tom Zhang"
                      userTagline={spikeCopy}
                      profileImage={TomZhang.profile_picture.image}
                      profileAlt={TomZhang.profile_picture.alt}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShieldIcon() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 text-xs text-orange-200">
      <ShieldCheck className="h-3 w-3" />
    </span>
  );
}

interface PersonalitySettingsProps {
  personality: AIPersonality;
  onChange: (personality: AIPersonality) => void;
  onReset: () => void;
}

function PersonalitySettings({ personality, onChange, onReset }: PersonalitySettingsProps) {
  const toneOptions: AIPersonality["tone"][] = [
    "professional",
    "casual",
    "friendly",
    "witty",
    "technical",
  ];

  const responseLengthOptions: AIPersonality["response_length"][] = [
    "concise",
    "balanced",
    "detailed",
  ];

  return (
    <div className="space-y-5 text-sm text-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">AI personality</h3>
        <Button variant="ghost" size="sm" className="text-xs text-gray-400" onClick={onReset}>
          Reset
        </Button>
      </div>
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wide text-gray-400">Tone</label>
        <div className="grid grid-cols-2 gap-2">
          {toneOptions.map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => onChange({ ...personality, tone })}
              className={`rounded-lg border px-3 py-2 text-left capitalize transition ${
                personality.tone === tone
                  ? "border-orange-400/60 bg-orange-500/15 text-white"
                  : "border-white/10 bg-white/5 hover:border-orange-400/40"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-400">
          Formality
          <span className="text-gray-300">{personality.formality_level}/10</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={personality.formality_level}
          onChange={(event) =>
            onChange({
              ...personality,
              formality_level: Number(event.target.value) as AIPersonality["formality_level"],
            })
          }
          className="w-full accent-orange-500"
        />
        <div className="flex justify-between text-[10px] uppercase tracking-wide text-gray-500">
          <span>Casual</span>
          <span>Formal</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wide text-gray-400">Response length</label>
        <div className="flex gap-2">
          {responseLengthOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange({ ...personality, response_length: option })}
              className={`flex-1 rounded-lg border px-3 py-2 text-center capitalize transition ${
                personality.response_length === option
                  ? "border-orange-400/60 bg-orange-500/15 text-white"
                  : "border-white/10 bg-white/5 hover:border-orange-400/40"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wide text-gray-400">
          Custom instructions
        </label>
        <textarea
          rows={3}
          value={personality.custom_instructions ?? ""}
          onChange={(event) =>
            onChange({
              ...personality,
              custom_instructions: event.target.value || undefined,
            })
          }
          placeholder="Always mention Tom's speed to ship, highlight climate experience..."
          className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wide text-gray-400">
          Traits emphasized
        </label>
        <input
          type="text"
          value={(personality.personality_traits ?? []).join(", ")}
          onChange={(event) =>
            onChange({
              ...personality,
              personality_traits: event.target.value
                .split(",")
                .map((trait) => trait.trim())
                .filter(Boolean),
            })
          }
          placeholder="systems thinker, calm under pressure, climate-driven"
          className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        />
      </div>
    </div>
  );
}

