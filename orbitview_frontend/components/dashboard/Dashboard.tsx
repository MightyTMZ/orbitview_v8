"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Share2,
  TrendingUp,
  MessageSquare,
  Edit,
  ExternalLink,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useState } from "react";

interface Conversation {
  id: string;
  question: string;
  timestamp: Date;
}

export function Dashboard() {
  const [copied, setCopied] = useState(false);
  const username = "tomsmith"; // Replace with actual user data
  const profileUrl = `https://orbitview.com/${username}`;

  const stats = {
    conversationsThisWeek: 47,
    totalConversations: 234,
    questionsAnswered: 1247,
    engagementGrowth: 23,
  };

  const recentConversations: Conversation[] = [
    {
      id: "1",
      question: "What's your most impressive project?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "2",
      question: "Tell me about your experience with AI",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "3",
      question: "What hackathons do you recommend?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: "twitter" | "linkedin") => {
    const text = encodeURIComponent(
      "Check out my AI-powered conversational resume on OrbitView!"
    );
    const url = encodeURIComponent(profileUrl);

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    } else {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your AI twin and track engagement</p>
        </div>

        {/* Hero Stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 mb-8 border border-white/10 glow"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">
                {stats.conversationsThisWeek}
              </div>
              <p className="text-gray-400 mb-1">
                people talked to your AI this week
              </p>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span>+{stats.engagementGrowth}% from last week</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="gradient"
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <span>✓</span> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <MessageSquare className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.totalConversations}
                </div>
                <div className="text-sm text-gray-400">Total conversations</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.questionsAnswered}
                </div>
                <div className="text-sm text-gray-400">Questions answered</div>
              </motion.div>
            </div>

            {/* Recent Conversations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Recent Conversations
              </h2>
              <div className="space-y-3">
                {recentConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <p className="text-white mb-2">{conversation.question}</p>
                    <p className="text-xs text-gray-400">
                      {conversation.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions & Preview */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/profile/edit")}
                >
                  <Edit className="mr-2 w-4 h-4" />
                  Edit Profile
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={handleCopy}
                >
                  <Copy className="mr-2 w-4 h-4" />
                  Copy Shareable Link
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="mr-2 w-4 h-4" />
                  Share on Twitter
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => handleShare("linkedin")}
                >
                  <Linkedin className="mr-2 w-4 h-4" />
                  Share on LinkedIn
                </Button>
              </div>
            </motion.div>

            {/* Profile Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Profile Preview
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-bold">TS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Tom Smith</div>
                    <div className="text-xs text-gray-400">
                      orbitview.com/{username}
                    </div>
                  </div>
                </div>
                <a
                  href={`/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  View Public Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

