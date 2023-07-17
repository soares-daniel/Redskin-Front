"use client";

import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { use, useEffect, useState } from "react";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Prevents SSR flash for mismatched dark mode
  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 focus:outline-none"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? "light" : "dark"}
      <FaSun className="text-yellow-500" /> <FaMoon className="text-gray-700" />
    </button>
  );
};

export default ThemeButton;
