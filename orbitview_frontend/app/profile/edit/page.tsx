"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProfileCoPilot } from "@/components/profile/ProfileCoPilot";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function ProfileEditPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCoPilotOpen, setIsCoPilotOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "MightyTMZ",
    tagline: "Full-Stack Developer & AI Enthusiast",
    bio: "Passionate developer building AI-powered products. Love creating innovative solutions and pushing the boundaries of what's possible with technology.",
    location: "San Francisco, CA",
    email: "mighty@example.com",
    website: "https://mighty.dev",
    socialLinks: {
      linkedin: "https://linkedin.com/in/mightytmz",
      github: "https://github.com/mightytmz",
      twitter: "https://twitter.com/mightytmz",
    },
  });

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem("isAuthenticated");
    const username = sessionStorage.getItem("username");
    
    if (auth === "true" && username === "MightyTMZ") {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      // Redirect to login if not authenticated
      router.push("/login");
    }
  }, [router]);

  const handleApplyEdit = (edit: { field: string; value: string }) => {
    // Apply the edit to the profile data
    const field = edit.field.toLowerCase();
    
    if (field.includes("name")) {
      setProfileData((prev) => ({ ...prev, name: edit.value }));
    } else if (field.includes("tagline")) {
      setProfileData((prev) => ({ ...prev, tagline: edit.value }));
    } else if (field.includes("bio")) {
      setProfileData((prev) => ({ ...prev, bio: edit.value }));
    } else if (field.includes("location")) {
      setProfileData((prev) => ({ ...prev, location: edit.value }));
    } else if (field.includes("email")) {
      setProfileData((prev) => ({ ...prev, email: edit.value }));
    } else if (field.includes("website")) {
      setProfileData((prev) => ({ ...prev, website: edit.value }));
    } else if (field.includes("linkedin")) {
      setProfileData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, linkedin: edit.value },
      }));
    } else if (field.includes("github")) {
      setProfileData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, github: edit.value },
      }));
    } else if (field.includes("twitter")) {
      setProfileData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, twitter: edit.value },
      }));
    }
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert("Profile saved! (This is a demo - changes are stored in memory only)");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-amber-950 opacity-30" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
              <p className="text-gray-400">
                Manage your profile information and use AI Co-Pilot to enhance it
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

          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
        </motion.div>

        {/* Profile Editing Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 border border-white/10 mb-6"
        >
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Tagline</label>
                <input
                  type="text"
                  value={profileData.tagline}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                  placeholder="e.g., Full-Stack Developer & AI Enthusiast"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Bio</label>
                <textarea
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Website</label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Social Links</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">LinkedIn</label>
                  <input
                    type="url"
                    value={profileData.socialLinks.linkedin}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourname"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">GitHub</label>
                  <input
                    type="url"
                    value={profileData.socialLinks.github}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, github: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    placeholder="https://github.com/yourname"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Twitter</label>
                  <input
                    type="url"
                    value={profileData.socialLinks.twitter}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    placeholder="https://twitter.com/yourname"
                  />
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="pt-6 border-t border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Live Preview</h2>
              <div className="glass rounded-lg p-6 border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-red-500/10">
                <div className="space-y-3">
                  <div className="font-semibold text-white text-lg">{profileData.name}</div>
                  <div className="text-orange-400">{profileData.tagline}</div>
                  <div className="text-gray-300 text-sm">{profileData.bio}</div>
                  {profileData.location && (
                    <div className="text-gray-400 text-sm">📍 {profileData.location}</div>
                  )}
                  <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/10">
                    {profileData.socialLinks.linkedin && (
                      <a href={profileData.socialLinks.linkedin} className="text-sm text-orange-400 hover:text-orange-300">
                        LinkedIn
                      </a>
                    )}
                    {profileData.socialLinks.github && (
                      <a href={profileData.socialLinks.github} className="text-sm text-orange-400 hover:text-orange-300">
                        GitHub
                      </a>
                    )}
                    {profileData.socialLinks.twitter && (
                      <a href={profileData.socialLinks.twitter} className="text-sm text-orange-400 hover:text-orange-300">
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-white/10">
              <Button variant="gradient" size="lg" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
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

