'use client';

import { useScrollTop } from "@/helpers/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import  Link  from  "next/link";
import { ModeToggle } from "@/components/toggle-light-dark";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const isScrolling = useScrollTop();

    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            isScrolling && "border-b shadow-sm"
          )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
              {isLoading && (
                <Spinner />
              )}
              {!isAuthenticated && !isLoading && (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </SignInButton>
                </>
              )}
              {isAuthenticated && !isLoading && (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/documents">
                      Enter Kamino
                    </Link>
                  </Button>
                  <UserButton
                    afterSignOutUrl="/"
                  />
                </>
              )}
              <ModeToggle />
            </div>
          </div>
    );
}