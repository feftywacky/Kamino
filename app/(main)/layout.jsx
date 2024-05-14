'use client';

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/ui/loading_animation";
import { Sidebar } from "./_components/sidebar";
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({ children }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return ( 
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
   );
}
 
export default MainLayout;