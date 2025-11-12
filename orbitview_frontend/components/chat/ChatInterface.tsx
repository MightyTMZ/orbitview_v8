"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StaticImageData } from "next/image";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  username: string;
  userTagline?: string;
  profileImage: StaticImageData;
  profileAlt?: string | null;
}

const suggestedQuestions = [
  "Tell me about yourself",
  "What's your most impressive project?",
  "What hackathons do you recommend?",
  "What are your core values?",
  "What's your experience with AI?",
];

export function ChatInterface({
  username,
  userTagline,
  profileImage,
  profileAlt,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
    }

    setTimeout(() => {
      const response = generateAIResponse(text.trim());
      const tokens = tokenizeResponse(response);
      const aiMessageId = `${Date.now()}-ai`;
      let currentIndex = 0;

      const aiMessage: Message = {
        id: aiMessageId,
        role: "ai",
        text: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      streamingIntervalRef.current = setInterval(() => {
        if (currentIndex >= tokens.length) {
          if (streamingIntervalRef.current) {
            clearInterval(streamingIntervalRef.current);
          }
          setIsTyping(false);
          return;
        }

        let nextIndex = currentIndex + 1;
        while (nextIndex < tokens.length && /^\s+$/.test(tokens[nextIndex])) {
          nextIndex += 1;
        }

        const nextText = tokens.slice(0, nextIndex).join("");
        currentIndex = nextIndex;

        setMessages((prev) =>
          prev.map((message) =>
            message.id === aiMessageId
              ? {
                  ...message,
                  text: nextText,
                }
              : message
          )
        );

        if (currentIndex >= tokens.length && streamingIntervalRef.current) {
          clearInterval(streamingIntervalRef.current);
          setIsTyping(false);
        }
      }, 45);
    }, 400);
  };

  const generateAIResponse = (question: string): string => {
    // Mock AI responses - replace with actual API
    const responses: Record<string, string> = {
      "tell me about yourself": "I'm a passionate developer and creator who loves building products that make a difference. I've worked across startups and scale-ups, always pushing the boundaries of what's possible with technology.",
      "what's your most impressive project?": "I built a real-time collaboration platform that's now used by 50,000+ developers. It reduced onboarding time by 60% through AI-powered suggestions and intelligent workflows.",
      "what hackathons do you recommend?": "I'd recommend TechCrunch Disrupt, HackMIT, and any local hackathons in your area. The key is finding events that align with your interests and give you a chance to build something cool in 24-48 hours.",
      "what are your core values?": "I believe in transparency, continuous learning, and building with empathy. I think the best products come from understanding real user needs, not just shipping features.",
      "what's your experience with ai?": "I've been experimenting with AI since GPT-3 launched. I've built several AI-powered products and I'm fascinated by how it's reshaping how we work and create. That's why I built OrbitView!",
    };

    const lowerQuestion = question.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return value;
      }
    }

    return "That's a great question! I'd love to chat more about that. Feel free to ask me anything else about my experience, projects, or values.";
  };

  const tokenizeResponse = (response: string) =>
    response.match(/\S+|\s+/g) ?? [response];

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 mb-6">
                {userTagline || "Ask me anything about my experience, projects, or values"}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(question)}
                    className="px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-200"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex gap-2 max-w-[85%] md:max-w-[75%]">
                {message.role === "ai" && (
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10">
                    <Image
                      src={profileImage}
                      alt={profileAlt ?? username}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-white/10 text-white rounded-br-sm"
                        : "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white border border-orange-500/30 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                  {message.role === "ai" && (
                    <button
                      onClick={() => handleCopy(message.text, message.id)}
                      className="self-start text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
                    >
                      {copiedId === message.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl rounded-bl-sm px-4 py-3">
                  <TypingIndicator />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all text-base"
            disabled={isTyping}
          />
          <Button
            type="submit"
            variant="gradient"
            size="md"
            disabled={!input.trim() || isTyping}
            className="px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-white/60"
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

