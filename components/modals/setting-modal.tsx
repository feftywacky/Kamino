"use client";

import { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSetting } from "@/hooks/use-setting";
import { ModeToggle } from "@/components/toggle-light-dark";

export const SettingModal = () => {
    const setting = useSetting();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "o" || e.key === "O") && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setting.toggle();
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [setting.toggle]);

    return (
        <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">
                        My settings
                    </h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>Appearance</Label>
                        <span className="text-[0.8rem] text-muted-foreground">Toggle between light and dark mode</span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    );
}