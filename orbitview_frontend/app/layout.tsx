import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/navigation/TopNav";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OrbitView - Your AI-Powered Conversational Resume",
  description:
    "Build your AI twin in 5 minutes. The future of resumes is conversational.",
};

const googleAuthID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <GoogleOAuthProvider clientId={googleAuthID}>
          <TopNav />
          <div className="pt-16">{children}</div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
