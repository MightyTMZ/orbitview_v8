"use client";

import { motion } from "framer-motion";
import { Zap, Link2, MessageSquare, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "5-Minute Setup",
    description: "AI co-pilot extracts everything from your resume. Just upload and go.",
  },
  {
    icon: Link2,
    title: "Shareable Link",
    description: "Get orbitview.com/yourname. Drop it everywhere—Twitter, LinkedIn, email.",
  },
  {
    icon: MessageSquare,
    title: "24/7 AI Assistant",
    description: "Your AI twin answers questions about your experience, projects, and values.",
  },
  {
    icon: TrendingUp,
    title: "Track Engagement",
    description: "See who's talking to your AI. Celebrate every conversation.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Why <span className="gradient-text">OrbitView</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            It&apos;s not just a resume. It&apos;s a status symbol. It&apos;s your AI twin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

