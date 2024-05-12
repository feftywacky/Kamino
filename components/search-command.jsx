"use client";

import { useEffect, useState } from "react";   
import  { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";

import {
    CommandDialog,
    CommandInput,
    CommandGroup,
    CommandEmpty,
    CommandItem,
    CommandList,
} from "@/comp1onents/ui/command";

import { useSearch } from "@/hooks/search";
import { api } from "@/convex/_generated/api";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery();

}