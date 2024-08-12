"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";

interface BannerProps {
    documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restoreArchive);

    const onRemove = () => {
        const promise = remove({ id: documentId});

        toast.promise(promise, {
            loading: "Deleting...",
            success: "Document deleted.",
            error: "Failed to delete document.",
        });

        router.push("/documents");
    };

    const onRestore = () => {
        const promise = restore({ id: documentId});

        toast.promise(promise, {
            loading: "Restoring...",
            success: "Document restored.",
            error: "Failed to restored document.",
        });
    };


    return (
        <div className="w=full bg-rose-400 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                This page is archived.
            </p>
            <Button 
                onClick={onRestore}
                size="sm"
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Restore page.
            </Button>
            <ConfirmationModal 
                onConfirm={onRemove}
                title={"Are you sure you want to delete this document forever?"} 
                actionLabel={"Confirm delete"}
            >
                <Button 
                    size="sm"
                    variant="outline"
                    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Delete forever.
                </Button>
            </ConfirmationModal>
        </div>
    );
};