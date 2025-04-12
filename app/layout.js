"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RealtimeProvider } from "@/context/RealtimeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Present_IT</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <RealtimeProvider>
          {children}
      </RealtimeProvider>   
      </body>
    </html>
  );
}
