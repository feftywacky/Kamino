"use client";

import { useEffect, useState } from "react";
import { SettingModal } from "@/components/modals/setting-modal";

export const ModalProvider = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <SettingModal />
        </>
    );
};


