"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { DropdownMenu, 
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuSeparator, 
    DropdownMenuItem} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Menu = ({documentId}) => {
    const router = useRouter();
    const { user } = useUser(); 

    const archive = useMutation(api.documents.archive);
    
    const onArchive = () => {
        toast.promise(archive({ id: documentId }), {
            loading: "Moving to trash...",
            success: "Document moved to trash.",
            error: "Failed to archive document.",
        });

        router.push("/documents");
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="w-4 h-4 mr-2"/>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-sm text-muted-foreground p-2"> 
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-10 w-10"/>
    );
}