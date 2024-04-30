'use client';

import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const promise = create({
            title: "Untitled Note"
        })

        toast.promise(promise, {
            loading: "Creating note...",
            success: "Note created.",
            error: "Failed to create note."
        });
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg text-center font-medium">
                Hello {user.firstName ? user.firstName : There}.
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