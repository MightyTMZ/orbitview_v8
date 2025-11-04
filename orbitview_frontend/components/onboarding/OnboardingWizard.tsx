"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Sparkles, Upload, FileText, Link2 } from "lucide-react";
import { ProfileCoPilot } from "@/components/profile/ProfileCoPilot";

const steps = [
  {
    id: 1,
    title: "Welcome",
    description: "Let's build your AI twin",
  },
  {
    id: 2,
    title: "Upload Resume",
    description: "AI will extract everything automatically",
  },
  {
    id: 3,
    title: "Review & Edit",
    description: "Make sure everything looks perfect",
  },
  {
    id: 4,
    title: "Choose Username",
    description: "Get your shareable link",
  },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<string>("");
  const [username, setUsername] = useState("");

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-gradient-primary text-white"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <span className="text-white">✓</span>
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-xs text-center">
                    <div
                      className={`font-medium ${
                        currentStep >= step.id ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-gradient-primary"
                        : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl p-8 border border-white/10"
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && <WelcomeStep onNext={nextStep} />}
            {currentStep === 2 && (
              <UploadStep
                onNext={nextStep}
                onBack={prevStep}
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
            {currentStep === 3 && (
              <ReviewStep
                onNext={nextStep}
                onBack={prevStep}
                resumeData={resumeData}
              />
            )}
            {currentStep === 4 && (
              <UsernameStep
                onBack={prevStep}
                username={username}
                setUsername={setUsername}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6"
      >
        <Sparkles className="w-10 h-10 text-white" />
      </motion.div>
      <h2 className="text-3xl font-bold text-white mb-4">
        Welcome to <span className="gradient-text">OrbitView</span>
      </h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        We&apos;ll help you build your AI twin in just 5 minutes. Your conversational
        resume will be ready to share with the world.
      </p>
      <Button variant="gradient" size="lg" onClick={onNext}>
        Get Started
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
}

function UploadStep({
  onNext,
  onBack,
  resumeData,
  setResumeData,
}: {
  onNext: () => void;
  onBack: () => void;
  resumeData: string;
  setResumeData: (data: string) => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async (file: File) => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setResumeData("Extracted resume data would appear here...");
      setIsProcessing(false);
      onNext();
    }, 2000);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setResumeData(text);
      onNext();
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Upload Your Resume</h2>
      <p className="text-gray-400 mb-6">
        Our AI co-pilot will extract all your information automatically
      </p>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-purple-500/50 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-white mb-2">Drop your resume here</p>
          <p className="text-sm text-gray-400 mb-4">
            PDF, DOCX, or paste text
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
            className="hidden"
            id="resume-upload"
          />
          <label htmlFor="resume-upload">
            <Button variant="secondary" size="sm">
              Choose File
            </Button>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          onClick={handlePaste}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <FileText className="w-5 h-5 text-gray-400" />
          <span className="text-white">Paste from Clipboard</span>
        </button>

        <button
          onClick={() => {
            // Handle LinkedIn import
            alert("LinkedIn import coming soon!");
          }}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <Link2 className="w-5 h-5 text-gray-400" />
          <span className="text-white">Import from LinkedIn</span>
        </button>
      </div>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 text-orange-400">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <span>AI is processing your resume...</span>
          </div>
        </motion.div>
      )}

      <div className="flex gap-4 mt-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
      </div>
    </div>
  );
}

function ReviewStep({
  onNext,
  onBack,
  resumeData,
}: {
  onNext: () => void;
  onBack: () => void;
  resumeData: string;
}) {
  const [isCoPilotOpen, setIsCoPilotOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Tom Smith",
    tagline: "Full-Stack Developer & AI Enthusiast",
    bio: "Passionate developer building AI-powered products...",
  });

  const handleApplyEdit = (edit: { field: string; value: string }) => {
    // Apply the edit to the profile data
    if (edit.field.includes("name") || edit.field.includes("tagline") || edit.field.includes("bio")) {
      const field = edit.field.includes("name") ? "name" : edit.field.includes("tagline") ? "tagline" : "bio";
      setProfileData((prev) => ({
        ...prev,
        [field]: edit.value,
      }));
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Review Your Profile</h2>
          <p className="text-gray-400">
            Edit manually or use AI Co-Pilot to make changes
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsCoPilotOpen(!isCoPilotOpen)}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {isCoPilotOpen ? "Hide" : "Show"} Co-Pilot
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="glass rounded-lg p-4">
          <label className="text-sm text-gray-400 mb-2 block">Name</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full bg-transparent text-white border-none outline-none focus:ring-1 focus:ring-orange-500/50 rounded px-2 py-1"
          />
        </div>
        <div className="glass rounded-lg p-4">
          <label className="text-sm text-gray-400 mb-2 block">Tagline</label>
          <input
            type="text"
            value={profileData.tagline}
            onChange={(e) => setProfileData((prev) => ({ ...prev, tagline: e.target.value }))}
            className="w-full bg-transparent text-white border-none outline-none focus:ring-1 focus:ring-orange-500/50 rounded px-2 py-1"
          />
        </div>
        <div className="glass rounded-lg p-4">
          <label className="text-sm text-gray-400 mb-2 block">Bio</label>
          <textarea
            rows={4}
            value={profileData.bio}
            onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
            className="w-full bg-transparent text-white border-none outline-none resize-none focus:ring-1 focus:ring-orange-500/50 rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">Live Preview</p>
        <div className="glass rounded-lg p-4 border border-orange-500/30">
          <div className="text-sm text-gray-300 space-y-2">
            <div className="font-semibold text-white">{profileData.name}</div>
            <div className="text-orange-400">{profileData.tagline}</div>
            <div className="text-gray-400">{profileData.bio}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button variant="gradient" onClick={onNext} className="ml-auto">
          Looks Good!
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Co-Pilot Side Panel */}
      <ProfileCoPilot
        isOpen={isCoPilotOpen}
        onToggle={() => setIsCoPilotOpen(!isCoPilotOpen)}
        onApplyEdit={handleApplyEdit}
      />
    </div>
  );
}

function UsernameStep({
  onBack,
  username,
  setUsername,
}: {
  onBack: () => void;
  username: string;
  setUsername: (username: string) => void;
}) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkAvailability = (value: string) => {
    setUsername(value);
    // Simulate availability check
    setTimeout(() => {
      setIsAvailable(value.length > 3 && !value.includes(" "));
    }, 500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Choose Your Username</h2>
      <p className="text-gray-400 mb-6">
        This will be your unique OrbitView link
      </p>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-400">orbitview.com/</span>
            <input
              type="text"
              value={username}
              onChange={(e) => checkAvailability(e.target.value)}
              placeholder="yourname"
              className="flex-1 bg-transparent text-white border-b border-white/20 focus:border-purple-500 focus:outline-none pb-2"
            />
          </div>
          {username && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm mt-2"
            >
              {isAvailable ? (
                <span className="text-green-400">✓ Available</span>
              ) : isAvailable === false ? (
                <span className="text-red-400">✗ Not available</span>
              ) : (
                <span className="text-gray-400">Checking...</span>
              )}
            </motion.div>
          )}
        </div>

        <div className="glass rounded-lg p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
          <p className="text-white font-semibold mb-2">🎉 Your AI Twin is Ready!</p>
          <p className="text-sm text-gray-300 mb-4">
            Share your link everywhere and start flexing.
          </p>
          <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
            <span className="text-sm text-gray-400">orbitview.com/{username || "yourname"}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://orbitview.com/${username}`);
              }}
              className="ml-auto text-orange-400 hover:text-orange-300"
            >
              <Link2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          variant="gradient"
          disabled={!isAvailable}
          onClick={() => {
            // Navigate to profile or dashboard
            window.location.href = `/${username}`;
          }}
          className="ml-auto"
        >
          Launch Profile
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

