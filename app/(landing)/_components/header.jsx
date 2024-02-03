'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/button'; 
import { useConvexAuth } from 'convex/react';
import { Spinner } from '../../../components/ui/loading_animation';
import Link from 'next/link';
import { SignInButton } from '@clerk/clerk-react';

export const Header = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl">
            Your Ideas unified. Introducing <span className="font-semibold underline">Kamino</span>
            </h1>
            <h3 className="text-base sm:text- xl md:text-2xl">
                Kamino is a free productivity tool for individuals.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg"/>
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter Kamino
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton  mode="modal">
                    <Button>
                        Use Kamino
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Button>
                </SignInButton>
            )}
        </div>
    );
}

export default Header;