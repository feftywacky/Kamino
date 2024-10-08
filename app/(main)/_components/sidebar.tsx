"use client";

import { ChevronLeft, MenuIcon, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, ElementRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useSearch } from "@/hooks/use-search";
import { useSetting } from "@/hooks/use-setting";

import { UserItem } from "./user-item";
import { Item } from "./item";
import { Navbar } from "./navbar";

import { toast } from "sonner";

import { DocumentList } from "./document-list";

import { TrashBox } from "./trashbox";

export const Sidebar = () => {
  const router = useRouter();
  const params = useParams();
  const setting = useSetting();
  const search = useSearch();
  const create = useMutation(api.documents.create)
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)"); // same as md in tailwind
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isTrashOpen, setIsTrashOpen] = useState(false);

  useEffect(() => {
    if (isMobile) {
      collapseSidebar();
    } else {
      resetSidebar();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapseSidebar();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMobile) return;
    e.preventDefault();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isMobile) return;
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 280;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.left = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
    }
  };

  const handleMouseUp = () => {
    if (isMobile) return;
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetSidebar = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "280px";
      navbarRef.current.style.left = isMobile ? "100%" : "280px";
      navbarRef.current.style.width = isMobile ? "0" : "calc(100% - 280px)";
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapseSidebar = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.left = "0";
      navbarRef.current.style.width = "100%";
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  }

  const handleCreate = useCallback(() => {
    const promise = create({ title: "Untitled" }).then((documentId) => router.push(`/documents/${documentId}`));
  
    toast.promise(promise, {
      loading: "Creating note...",
      success: "Note created.",
      error: "Failed to create note."
    });
  }, [create, router]);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "p" || e.key === "P") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleCreate();
      }

      if ((e.key === "m" || e.key === "M") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsTrashOpen(!isTrashOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [handleCreate, isTrashOpen]);

  return (
    <div className="pl-4 py-14">
      <aside
        ref={sidebarRef}
        className={cn(
          "rounded-[14px] group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-[280px] z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapseSidebar}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item
            label="Setting"
            icon={Settings}
            isSettings
            onClick={setting.onOpen}
          />
          <Item
            label="Search"
            icon={Search}
            isSearch
            onClick={search.onOpen}
          />
          <Item
            onClick={handleCreate}
            label="New Page"
            isNewPage
            icon={PlusCircle}
          />
        </div>

        <div className="mt-4">
          <DocumentList />
        </div>

        <div className="mt-4">
          <Popover open={isTrashOpen} onOpenChange={setIsTrashOpen}>
            <PopoverTrigger className="w-full focus:outline-none">
              <Item 
                label="Trash" 
                icon={Trash} 
                isTrash
              />
            </PopoverTrigger>
            <PopoverContent side={isMobile ? "bottom" : "right"} className="p-0 w-72">
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetSidebar}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 
                bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetSidebar={resetSidebar} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetSidebar}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </div>
  );
};