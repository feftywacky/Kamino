"use client";

import {ChevronDown, ChevronRight} from "lucide-react";

import {cn} from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const Item = ({ label, onClick, icon:Icon, id, documentIcon, 
    active, expanded, isSearch, level=0, onExpand, isNewPage, isSettings }) => {

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    
    return (
        <div 
            onClick={onClick} 
            role="button" 
            style={{ 
                paddingLeft: level ? `${(level*12)+12}px` : "12px" 
            }} 
            className={
                cn(`group min-h text-sm py-1 pr-3 w-full hover:bg-primary/5 
                flex items center text-muted-foreground font-medium`, active && `bg-primary/5
                text-primary`
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
                    onClick={()=>{}}
                >
                    <ChevronIcon 
                        className="h-4 w-4 shrink-0 text-muted-foreground/50"/>
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
                        ⌘/Ctrl + S
                    </span>
                </kbd>
            )}

            {isNewPage && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">
                        ⌘/Ctrl + T
                    </span>
                </kbd>
            )}

            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">
                        ⌘/Ctrl + K
                    </span>
                </kbd>
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