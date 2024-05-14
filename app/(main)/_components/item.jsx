"use client";

import {ChevronDown, ChevronRight, Plus, MoreHorizontal, Trash} from "lucide-react";
import { toast } from "sonner";
import {cn} from "@/lib/utils";

import {useUser} from "@clerk/clerk-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem, DropdownMenuSeparator  } from "@/components/ui/dropdown-menu";

export const Item = ({ label, onClick, icon:Icon, id, documentIcon, 
    active, expanded, isSearch, level=0, onExpand, isNewPage, isSettings }) => {

    const { user } = useUser(); 
    const router = useRouter();

    // api endpoint methods
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const onArchive = (event) => {
        event.stopPropagation();
        if (!id) return;
        const promise = archive({id});

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash.",
            error: "Failed to archive note."
        });
    }

    const handleExpand = (event) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate = (event) => {
        event.stopPropagation();
        if (!id) return;

        const promise = create({title: "Untitled", parentDocument: id}).then(()=>{
            if (!expanded) onExpand?.();
            router.push(`/documents/${documentId}`);

            toast.promise(promise, {
                loading: "Creating note...",
                success: "Note created.",
                error: "Failed to create note."
            });

        });
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    
    return (
        <div 
            onClick={onClick} 
            role="button" 
            style={{ 
                paddingLeft: level ? `${(level*12)+12}px` : "12px" 
            }} 
            className={
                cn(`group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium`,
                active && `bg-primary/5 text-primary`
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"/>
                </div>
            )}

            {documentIcon ? (
                <div className="shrink-1 mr-2 text-[18px]">
                    {documentIcon}
                </div>) 
                : 
                (<Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground"/>)
            }

            <span>{label}</span>

            {isSettings && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">
                        Ctrl + O
                    </span>
                </kbd>
            )}

            {isNewPage && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">
                        Ctrl + T
                    </span>
                </kbd>
            )}

            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">
                        Ctrl + K
                    </span>
                </kbd>
            )}

            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>

                        <DropdownMenuTrigger
                            onClick={(e)=>e.stopPropagation()}
                            asChild
                        >
                            <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-netural-600">
                                <MoreHorizontal className="w-4 h-4 text-muted-foreground"/>
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2"/>
                                Move to Trash
                            </DropdownMenuItem>

                            <DropdownMenuSeparator/>

                            <div className="text-xs text-muted-foreground p-2">
                                Editor: {user?.fullName}
                            </div>

                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div 
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover-neutral-600">
                        <Plus className="h-4 w-4 text-muted-foreground"/>    
                    </div>
                </div>
            )}
        </div>
    );
};


Item.Skeleton = function ItemSkeleton({level}) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level*12)+25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}