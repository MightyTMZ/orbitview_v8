"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, ChevronLeft, Lightbulb, Check, Copy, History } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditRequest {
  id: string;
  request: string;
  response: string;
  timestamp: Date;
  applied: boolean;
}

interface ProfileCoPilotProps {
  isOpen: boolean;
  onToggle: () => void;
  onApplyEdit?: (edit: { field: string; value: string }) => void;
}

const exampleRequests = [
  "Make my tagline more professional",
  "Add a new project about my AI work",
  "Update my bio to highlight my leadership experience",
  "Change my location to San Francisco",
  "Add my GitHub link",
  "Make my experience section more concise",
];

export function ProfileCoPilot({ isOpen, onToggle, onApplyEdit }: ProfileCoPilotProps) {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [editHistory, setEditHistory] = useState<EditRequest[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!input.trim() || isProcessing) return;

    const requestText = input.trim();
    setInput("");
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateEditResponse(requestText);
      const newEdit: EditRequest = {
        id: Date.now().toString(),
        request: requestText,
        response,
        timestamp: new Date(),
        applied: false,
      };
      setEditHistory((prev) => [newEdit, ...prev]);
      setIsProcessing(false);
    }, 1500);
  };

  const generateEditResponse = (request: string): string => {
    // Mock AI responses - replace with actual API
    const lowerRequest = request.toLowerCase();
    
    if (lowerRequest.includes("tagline") || lowerRequest.includes("professional")) {
      return "Updated tagline: 'Senior Full-Stack Engineer | AI Product Builder | Tech Leader'\n\n✓ Applied to your profile";
    }
    
    if (lowerRequest.includes("project") || lowerRequest.includes("ai")) {
      return "Added new project: 'AI-Powered Resume Platform'\n\n• Built with React & Next.js\n• 50,000+ users\n• Reduced onboarding time by 60%\n\nWould you like me to apply this?";
    }
    
    if (lowerRequest.includes("bio") || lowerRequest.includes("leadership")) {
      return "Updated bio to emphasize leadership:\n\n'Passionate developer with 8+ years building products that scale. Led teams of 5-10 engineers, shipping features used by millions. Specialized in AI/ML integration and full-stack architecture.'\n\n✓ Applied to your profile";
    }
    
    if (lowerRequest.includes("location") || lowerRequest.includes("san francisco")) {
      return "Updated location to: San Francisco, CA\n\n✓ Applied to your profile";
    }
    
    if (lowerRequest.includes("github") || lowerRequest.includes("link")) {
      return "Added GitHub link: github.com/yourusername\n\n✓ Applied to your profile";
    }
    
    if (lowerRequest.includes("concise") || lowerRequest.includes("shorter")) {
      return "Condensed experience section:\n\n• Removed redundant bullet points\n• Combined similar roles\n• Highlighted key achievements\n\nWould you like to review the changes?";
    }

    return `I understand you want to: "${request}"\n\nI can help you:\n• Update any section of your profile\n• Add new experiences or projects\n• Refine your writing style\n• Reorganize content\n\nCould you be more specific about what you'd like to change?`;
  };

  const handleApply = (edit: EditRequest) => {
    // Parse the response to extract field and value
    // In a real implementation, this would come from the AI response structure
    const lines = edit.response.split("\n");
    const field = lines[0].split(":")[0].toLowerCase().replace("updated", "").replace("added", "").trim();
    const value = lines[0].split(":")[1]?.trim() || edit.response;

    if (onApplyEdit) {
      onApplyEdit({ field, value });
    }

    setEditHistory((prev) =>
      prev.map((e) => (e.id === edit.id ? { ...e, applied: true } : e))
    );
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
    textareaRef.current?.focus();
  };

  return (
    <>
      {/* Toggle Button - Always visible when panel is closed */}
      {!isOpen && (
        <motion.button
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 w-12 h-20 rounded-l-xl bg-gradient-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          aria-label="Open Co-Pilot"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </motion.button>
      )}

      {/* Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] lg:w-[420px] z-50 bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">AI Co-Pilot</h2>
                    <p className="text-xs text-gray-400">Edit your profile with AI</p>
                  </div>
                </div>
                <button
                  onClick={onToggle}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Examples Section */}
                {editHistory.length === 0 && !isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border-b border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-orange-400" />
                      <p className="text-sm font-medium text-gray-300">Try asking:</p>
                    </div>
                    <div className="space-y-2">
                      {exampleRequests.slice(0, 3).map((example, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleExampleClick(example)}
                          className="w-full text-left px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-200"
                        >
                          {example}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Edit History */}
                {editHistory.length > 0 && (
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <History className="w-4 h-4 text-gray-400" />
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Recent Edits
                      </p>
                    </div>
                    {editHistory.map((edit) => (
                      <motion.div
                        key={edit.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-lg p-4 border border-white/10"
                      >
                        <div className="mb-2">
                          <p className="text-xs text-gray-400 mb-1">Your request:</p>
                          <p className="text-sm text-white">{edit.request}</p>
                        </div>
                        <div className="mb-3">
                          <p className="text-xs text-gray-400 mb-1">AI response:</p>
                          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded p-3">
                            <p className="text-sm text-gray-200 whitespace-pre-wrap">
                              {edit.response}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!edit.applied && (
                            <Button
                              variant="gradient"
                              size="sm"
                              onClick={() => handleApply(edit)}
                              className="text-xs"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Apply
                            </Button>
                          )}
                          {edit.applied && (
                            <span className="text-xs text-green-400 flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Applied
                            </span>
                          )}
                          <button
                            onClick={() => handleCopy(edit.response, edit.id)}
                            className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1 transition-colors"
                          >
                            {copiedId === edit.id ? (
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
                          <button
                            onClick={() =>
                              setEditHistory((prev) =>
                                prev.filter((e) => e.id !== edit.id)
                              )
                            }
                            className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 transition-colors ml-auto"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Processing Indicator */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4"
                  >
                    <div className="glass rounded-lg p-4 border border-orange-500/30">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-5 h-5 text-orange-400" />
                        </motion.div>
                        <div>
                          <p className="text-sm text-white font-medium">AI is thinking...</p>
                          <p className="text-xs text-gray-400">Analyzing your request</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4 bg-black/50">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="space-y-3"
                >
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Describe what you'd like to edit... (e.g., 'Make my tagline more professional' or 'Add my GitHub project')"
                      className="w-full px-4 py-3 pr-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm resize-none"
                      rows={3}
                      disabled={isProcessing}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                      {input.length > 0 && `${input.length} chars`}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs">Enter</kbd> to send
                    </p>
                    <Button
                      type="submit"
                      variant="gradient"
                      size="sm"
                      disabled={!input.trim() || isProcessing}
                      className="flex items-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

