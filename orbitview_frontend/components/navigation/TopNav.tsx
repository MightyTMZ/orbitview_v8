"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { UserMenu } from "./UserMenu";
import { getCurrentUser } from "@/lib/api/auth";
import type { GoogleAuthResponse } from "@/lib/api/auth";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  email_verified: boolean;
}

export function TopNav() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check sessionStorage first
        const isAuthenticated = sessionStorage.getItem("isAuthenticated");
        const userStr = sessionStorage.getItem("user");

        if (isAuthenticated === "true" && userStr) {
          // Try to get fresh user data from API
          const currentUser = await getCurrentUser();
          if (currentUser && currentUser.user) {
            setUser(currentUser.user);
            // Update sessionStorage with fresh data
            sessionStorage.setItem("user", JSON.stringify(currentUser.user));
          } else if (userStr) {
            // Fallback to stored user data
            try {
              const parsedUser = JSON.parse(userStr);
              setUser(parsedUser);
            } catch (e) {
              console.error("Error parsing user data:", e);
            }
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname]); // Re-check when route changes

  // Don't show nav on login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={32} />
            <span className="text-xl font-bold gradient-text">OrbitView</span>
          </Link>

          <div className="flex items-center gap-6">
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              <UserMenu user={user} />
            ) : (
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

