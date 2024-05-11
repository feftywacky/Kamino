"use client"

import { restoreArchive } from "@/convex/documents";
import { useQuery, useMutation } from "convex/react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { api } from "@/convex/_generated/api";

import { toast } from "sonner";
import { Spinner } from "@/components/ui/loading_animation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const TrashBox = () => {

    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restoreArchive);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");
    
    const filterDocs = documents?.filter((doc) => {
        return doc.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId) => {
        router.push(`/documents/${documentId}`)
    };

    const onRestore = (event, documentId) => {
        event.stopPropagation();
        const promise = restoreArchive({id: documentId});

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note."
        })
    }

    const onRemove = (event, documentId) => {
        event.stopPropagation();
        const promise = remove({id: documentId});

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        })

        // Redirect to documents page if the current document is deleted
        if (params.documentId === documentId) {
            router.push("/documents");
        }
    }

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg"/>
            </div>
        )
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="w-4 h-4"/>
                <Input 
                    value={search} 
                    onChange={(event) => setSearch(event.target.value)} 
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents found.
                </p>
            </div>
        </div>
    )
};