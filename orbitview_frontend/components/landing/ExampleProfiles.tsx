"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const exampleProfiles = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    username: "sarahchen",
    conversations: "234",
    avatar: "SC",
  },
  {
    name: "Alex Rivera",
    role: "ML Engineer",
    username: "alexrivera",
    conversations: "189",
    avatar: "AR",
  },
  {
    name: "Jordan Kim",
    role: "Startup Founder",
    username: "jordankim",
    conversations: "456",
    avatar: "JK",
  },
];

export function ExampleProfiles() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            See It In <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-gray-400">
            Check out how others are flexing with their AI twins
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {exampleProfiles.map((profile, index) => (
            <motion.a
              key={index}
              href={`/${profile.username}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold">{profile.avatar}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{profile.name}</h3>
                  <p className="text-sm text-gray-400">{profile.role}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-sm text-gray-400">
                  {profile.conversations} conversations
                </span>
                <span className="text-sm gradient-text font-medium">
                  orbitview.net/{profile.username}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

