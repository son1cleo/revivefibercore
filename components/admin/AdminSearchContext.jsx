"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const AdminSearchContext = createContext(null);

export function AdminSearchProvider({ children }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery("");
  }, [pathname]);

  return <AdminSearchContext.Provider value={{ query, setQuery }}>{children}</AdminSearchContext.Provider>;
}

export function useAdminSearch() {
  const context = useContext(AdminSearchContext);
  return context || { query: "", setQuery: () => {} };
}
