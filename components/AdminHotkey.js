"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHotkey() {
  const router = useRouter();

  useEffect(() => {
    function handler(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        router.push("/panel-7f2k9");
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
