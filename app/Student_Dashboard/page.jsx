"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentHome() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideTimeout = setTimeout(() => setIsVisible(false), 2500);
    const navigateTimeout = setTimeout(() => router.push("/Student_Dashboard/Home_page"), 3000);
    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(navigateTimeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-6">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="splash"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center"
          >
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Welcome to Present_IT!</h1>
            <p className="text-gray-600 text-sm">
              Making presentations smarter, interactive, and fun. Hold tight, loading your dashboard...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
