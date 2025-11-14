"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { authenticateWithGoogle } from "@/lib/api/auth";
import { Chrome } from "lucide-react";

// Fake user credentials (keeping for backward compatibility)
const FAKE_USER = {
  username: "MightyTMZ",
  password: "tommyz2008",
};

declare global {
  interface Window {
    google: any;
  }
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const router = useRouter();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleGoogleSuccess = useCallback(async (response: any) => {
    if (!response.credential) {
      setError("Failed to get Google credentials");
      return;
    }

    setIsGoogleLoading(true);
    setError("");

    try {
      const authResponse = await authenticateWithGoogle(response.credential);

      // Store authentication info
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("user", JSON.stringify(authResponse.user));

      // Redirect based on whether user has a profile
      if (authResponse.has_profile && authResponse.profile_username) {
        router.push(`/${authResponse.profile_username}`);
      } else {
        router.push("/onboarding");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google authentication failed");
      setIsGoogleLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!GOOGLE_CLIENT_ID) {
      console.warn("Google Client ID is not configured");
      return;
    }

    // Check if script is already loaded
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      // Script already exists, just initialize
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleSuccess,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          width: "100%",
          text: "signin_with",
          shape: "rectangular",
        });

        setGoogleReady(true);
      }
      return;
    }

    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    const initializeGoogle = () => {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleSuccess,
        });

        // Render the button
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          width: "100%",
          text: "signin_with",
          shape: "rectangular",
        });

        setGoogleReady(true);
      }
    };

    script.onload = () => {
      // Wait a bit for Google to be fully loaded
      const checkGoogle = setInterval(() => {
        if (window.google) {
          initializeGoogle();
          clearInterval(checkGoogle);
        }
      }, 100);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkGoogle);
      }, 5000);
    };
  }, [handleGoogleSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check credentials
    if (username === FAKE_USER.username && password === FAKE_USER.password) {
      // Store authentication in sessionStorage
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("username", username);
      // Redirect to profile editing page
      router.push("/profile/edit");
    } else {
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  const showGoogleSignIn = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-amber-950 opacity-30" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.1),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass rounded-2xl p-8 border border-white/10 max-w-md w-full"
      >
        <div className="flex flex-col items-center mb-8">
          <Logo size={48} />
          <h1 className="text-2xl font-bold gradient-text mt-4">OrbitView</h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to continue</p>
        </div>

        {/* Google Sign-In Button */}
        {showGoogleSignIn && (
          <>
            <div className="mb-6">
              <div ref={googleButtonRef} className="w-full flex justify-center"></div>
              {!googleReady && (
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full gap-3"
                  disabled={true}
                >
                  <Chrome className="h-5 w-5" />
                  Loading Google Sign-In...
                </Button>
              )}
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or continue with</span>
              </div>
            </div>
          </>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
              placeholder="Enter your username"
              required={!showGoogleSignIn}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
              placeholder="Enter your password"
              required={!showGoogleSignIn}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {!showGoogleSignIn && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Test credentials: {FAKE_USER.username} / {FAKE_USER.password}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
