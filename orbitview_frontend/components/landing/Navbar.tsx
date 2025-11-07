"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={32} />
            <span className="text-xl font-bold gradient-text">OrbitView</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/examples"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Examples
            </Link>
            <Link
              href="/pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Button variant="gradient" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

