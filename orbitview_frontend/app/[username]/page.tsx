import { ChatInterface } from "@/components/chat/ChatInterface";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

// Mock data - replace with actual API call
async function getProfileData(username: string) {
  // In a real app, this would fetch from your API
  return {
    name: "Tom Smith",
    tagline: "Full-Stack Developer & AI Enthusiast",
    avatar: undefined,
    username,
    stats: {
      conversations: 234,
      questionsAnswered: 1247,
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/tomsmith",
      github: "https://github.com/tomsmith",
      twitter: "https://twitter.com/tomsmith",
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getProfileData(params.username);

  return (
    <div className="min-h-screen bg-black">
      {/* Animated gradient background - warmer */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-amber-950 opacity-30" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid lg:grid-cols-[30%_70%] gap-6 lg:gap-8 min-h-[calc(100vh-2rem)] lg:h-[calc(100vh-4rem)]">
          {/* Left Sidebar - Profile Info */}
          <div className="hidden lg:block">
            <ProfileSidebar {...profile} />
          </div>

          {/* Mobile Profile Header */}
          <div className="lg:hidden glass rounded-xl p-4 mb-4 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-white">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-white truncate">{profile.name}</h1>
                {profile.tagline && (
                  <p className="text-sm text-gray-400 truncate">{profile.tagline}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {profile.stats.conversations} conversations
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="glass rounded-xl lg:rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] lg:h-full">
            <ChatInterface
              username={profile.username}
              userTagline={profile.tagline}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

