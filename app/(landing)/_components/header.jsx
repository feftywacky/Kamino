'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/button'; 

export const Header = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl">
            Your Ideas unified. Introducing <span className="font-semibold">Kamino</span>
            </h1>
            <h3 className="text-base sm:text- xl md:text-2xl">
                Kamino is a productivity tool for students and professionals.
            </h3>
            <Button>
                Enter Kamino
                <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
        </div>
    );
}

export default Header;