"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background - warmer tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-amber-950 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
      
      {/* Floating particles effect - warmer */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <div className="w-4 h-4 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-sm text-gray-300">
                AI-Powered • 5 Minutes Setup
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-white">Your 24/7</span>
              <span className="block gradient-text">Conversational Resume</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Build your AI twin in 5 minutes. Show you&apos;re ahead of the AI curve.
              Drop your OrbitView link everywhere and flex.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="gradient"
                size="lg"
                className="group"
              >
                Build Your AI Twin
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg">
                See Example
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">2,847</div>
                <div className="text-sm text-gray-400">AI Avatars Built</div>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">12.4k+</div>
                <div className="text-sm text-gray-400">Conversations</div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Animated Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <ChatPreview />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ChatPreview() {
  const messages = [
    { role: "user", text: "Tell me about yourself" },
    {
      role: "ai",
      text: "I'm a full-stack developer passionate about building AI-powered products. I've worked at startups and scale-ups, and I love experimenting with new technologies.",
      delay: 1,
    },
    { role: "user", text: "What's your most impressive project?", delay: 2.5 },
    {
      role: "ai",
      text: "I built a real-time collaboration tool used by 50k+ developers. It reduced onboarding time by 60% through AI-powered suggestions.",
      delay: 3.5,
    },
  ];

  return (
    <div className="relative">
      <div className="glass rounded-2xl p-6 shadow-2xl border border-white/10 glow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold">TS</span>
          </div>
          <div>
            <div className="font-semibold text-white">Tom Smith</div>
            <div className="text-xs text-gray-400">Full-Stack Developer</div>
          </div>
        </div>

        <div className="space-y-4 min-h-[300px]">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              index={index}
            />
          ))}
        </div>

        <div className="mt-4 flex gap-2 flex-wrap">
          {["Tell me about yourself", "What hackathons do you recommend?"].map(
            (suggestion, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4 + i * 0.1 }}
                className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
              >
                {suggestion}
              </motion.button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function ChatMessage({
  message,
  index,
}: {
  message: { role: string; text: string; delay?: number };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: message.delay || index * 0.5, duration: 0.3 }}
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
          message.role === "user"
            ? "bg-white/10 text-white"
            : "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white border border-orange-500/30"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </motion.div>
  );
}

