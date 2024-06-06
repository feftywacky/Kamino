"use client";

import { useTheme } from "next-themes";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

import { useEdgeStore } from "@/lib/edgestore";

const Editor = ({ onChange, initialContent }) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file) => {
    const response = await edgestore.publicFiles.upload({ 
      file
    });

    return response.url;
  }

  const editor = useCreateBlockNote({
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent) 
      : undefined,
    uploadFile: handleUpload
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        onChange={()=>{onChange(JSON.stringify(editor.document, null, 2));}}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}

export default Editor;
