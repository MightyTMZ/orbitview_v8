"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { authenticateWithGoogle } from "@/lib/api/auth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectPath, setRedirectPath] = useState("");

  const router = useRouter();

  const googleAuthID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      setError("");
      setIsLoading(true);

      const token = credentialResponse.credential;
      if (!token) {
        setError("Missing Google credential. Please try again.");
        return;
      }

      const result = await authenticateWithGoogle(token);

      const destination =
        redirectPath ||
        (result.has_profile && result.profile_username
          ? `/profile/${result.profile_username}`
          : "/");

      router.push(destination);
    } catch (err) {
      console.error("Google auth failed", err);
      setError(
        err instanceof Error
          ? err.message
          : "Google sign-in failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google sign-in was cancelled or failed. Please try again.");
  };

  useEffect(() => {
    setRedirectPath(
      localStorage.getItem("previously_viewed_orbitview_profile") || ""
    );
  }, []); // empty context array --> only runs when it mounts

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 -mt-16">
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

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        {!googleAuthID ? (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm text-center">
            Google Sign-In is not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.
          </div>
        ) : (
          <>
            {/* Google Sign-In Button */}
            <div className="mb-6">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={false}
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </>
        )}

        {isLoading && (
          <div className="mt-4 text-center text-xs text-gray-400">
            Signing you in with Google…
          </div>
        )}
      </motion.div>
    </div>
  );
}
