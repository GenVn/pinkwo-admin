"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sun, Moon, User, Bell, Settings, Flag } from "lucide-react";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "vi" : "en");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b">
      <div className="flex-1"></div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        <Button
          variant="ghost"
          onClick={toggleLanguage}
          aria-label="Change language"
        >
          <div className="flex items-center">
            <Flag size={20} className="mr-2" />
            {language === "en" ? "EN" : "VI"}
          </div>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings size={20} />
        </Button>
        <Avatar>
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback>
            <User size={20} />
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
