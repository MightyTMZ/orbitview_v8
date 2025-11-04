"use client";

import { Linkedin, Github, Twitter, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProfileSidebarProps {
  name: string;
  tagline?: string;
  avatar?: string;
  username: string;
  stats?: {
    conversations: number;
    questionsAnswered: number;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export function ProfileSidebar({
  name,
  tagline,
  avatar,
  username,
  stats = { conversations: 0, questionsAnswered: 0 },
  socialLinks,
}: ProfileSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-white">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">{name}</h1>
        {tagline && (
          <p className="text-gray-400 text-sm mb-4">{tagline}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>orbitview.com/{username}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(`https://orbitview.com/${username}`);
            }}
            className="hover:text-gray-300 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4 mb-8">
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">
            {stats.conversations.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">conversations started</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">
            {stats.questionsAnswered.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">questions answered</div>
        </div>
      </div>

      {/* Social Links */}
      {socialLinks && (
        <div className="flex gap-3 mb-8">
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-gray-400" />
            </a>
          )}
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5 text-gray-400" />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-5 h-5 text-gray-400" />
            </a>
          )}
        </div>
      )}

      {/* Built with OrbitView Badge */}
      <div className="mt-auto pt-8 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          <span>Built with</span>
          <span className="gradient-text font-semibold">OrbitView</span>
        </Link>
      </div>
    </div>
  );
}

