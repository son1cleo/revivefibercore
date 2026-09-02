"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const IDLE_LIMIT_MS = 90 * 1000;
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];

export default function AdminIdleLogout() {
  const router = useRouter();
  const timerRef = useRef(null);

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/api/admin/auth/logout", { method: "POST" });
      } finally {
        router.push("/admin/login");
        router.refresh();
      }
    };

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(logout, IDLE_LIMIT_MS);
    };

    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [router]);

  return null;
}
