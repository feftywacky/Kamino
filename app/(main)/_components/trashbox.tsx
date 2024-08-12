"use client"

import { useQuery, useMutation } from "convex/react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Search, Trash, Trash2, History, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";

export const TrashBox = () => {

    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restoreArchive);
    const restoreAll = useMutation(api.documents.restoreArchiveAll);
    const remove = useMutation(api.documents.remove);
    const removeAll = useMutation(api.documents.removeAll);

    const [search, setSearch] = useState("");

    const filterDocs = documents?.filter((doc) => {
        return doc.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    };

    const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<"documents">) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note."
        })
    }

    const onRestoreAll= () => {
        if (documents && documents.length > 0) {
            const promise = restoreAll({ ids: documents.map((doc) => doc._id) });

            toast.promise(promise, {
                loading: "Restoring all notes...",
                success: "All notes restored!",
                error: "Failed to restore all notes."
            })
        } else {
            showEmptyTrashMsg();
        }
    }

    const onRemove = (documentId: Id<"documents">) => {
        const promise = remove({ id: documentId });

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

    const onRemoveAll = () => {
        if (documents && documents.length > 0) {
            const promise = restoreAll({ ids: documents.map((doc) => doc._id) });

            toast.promise(promise, {
                loading: "Restoring all notes...",
                success: "All notes restored!",
                error: "Failed to restore all notes."
            })
        } else {
            showEmptyTrashMsg();
        }

        // Redirect to documents page if the current document is deleted
        if (params.documentId) {
            router.push("/documents");
        }
    }

    const showEmptyTrashMsg = () => {
        toast.error("No archived documents to restore or delete.")
    }

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg" />
            </div>
        )
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <div className="pl-1">
                    <Search className="h-4 w-4" />
                </div>
                <div className="pr-2 pl-2">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-7 px-1 focus-visible:ring-transparent bg-secondary"
                        placeholder="Filter by page title..."
                    />
                </div>  
                <div className="flex mr-[-4px]">
                    {documents.length ? (
                        <>
                            <ConfirmationModal 
                                onConfirm={() => onRestoreAll()}
                                title={"Are you sure you want to restore ALL archived documents?"} 
                                actionLabel={"Confirm archive"}
                            >
                            <div className="flex items-center rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                <History className="h-4 w-4" />
                            </div>
                            </ConfirmationModal>
                            <ConfirmationModal 
                                onConfirm={() => onRemoveAll()}
                                title={"Are you sure you want to delete ALL documents?"} 
                                actionLabel={"Confirm delete all"}
                            >
                                <div className="flex items-center rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                    <Trash2 className="h-4 w-4" />
                                </div>
                            </ConfirmationModal>
                        </>
                    ) : (
                        <>
                            <div 
                                className="flex items-center rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                onClick={()=>showEmptyTrashMsg()}
                                >
                                <History className="h-4 w-4" />
                            </div>
                            <div 
                                className="flex items-center rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                onClick={()=>showEmptyTrashMsg()}
                            >
                                <Trash2 className="h-4 w-4" />
                            </div>
                        </>
                    )}
                    
                </div>
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents found.
                </p>
                {filterDocs?.map((document) => (
                    <div
                        key={document._id}
                        role="button"
                        onClick={() => onClick(document._id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                    >
                        <span className="truncate pl-2">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                            <div
                                onClick={(e) => onRestore(e, document._id)}
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                            >
                                <RotateCcw className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <ConfirmationModal 
                                onConfirm={() => onRemove(document._id)}
                                title={"Are you sure you want to delete this document?"} 
                                actionLabel={"Confirm delete"}
                            >
                                <div
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                >
                                    <Trash className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </ConfirmationModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};