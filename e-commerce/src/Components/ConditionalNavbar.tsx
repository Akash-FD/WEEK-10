// components/ConditionalNavbar.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";
import AdminNavbar from "./AdminNavbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // If URL starts with /admin, don't show Navbar
  if (pathname.startsWith("/admin")) {
    return <AdminNavbar />;
  }
  if (pathname.startsWith("/login")) {
    return null;
  }
  if (pathname.startsWith("/register")) {
    return null;
  }
  if (pathname.startsWith("/verifyemail")) {
    return null;
  }
  if (pathname.startsWith("/reset-password")) {
    return null;
  }
  return <Navbar />;
}
