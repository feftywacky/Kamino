"use client";

import {
    AlertDialog,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const ConfirmationModal = ({children, onConfirm}) => {

    const handleConfirm = (e) => {
        e.stopPropagation();
        onConfirm();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={(e)=>e.stopPropagation()} asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Confirm delete</AlertDialogAction>
                </AlertDialogFooter>    
            </AlertDialogContent>
        </AlertDialog>
    )
}
