'use client';

import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const DocumentsPage = () => {
    const router = useRouter();
    const { user } = useUser();
    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const promise = create({
            title: "Untitled"
        }).then((documentId) => router.push(`/documents/${documentId}`));

        toast.promise(promise, {
            loading: "Creating note...",
            success: "Note created.",
            error: "Failed to create note."
        });
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg text-center font-medium">
                Hello {user?.firstName}.
                <br />
                Your notes are ready.
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Create a new note
            </Button>
        </div>
    );
}

export default DocumentsPage;