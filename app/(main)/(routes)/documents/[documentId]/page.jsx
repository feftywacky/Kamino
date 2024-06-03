"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Toolbar } from "@/components/toolbar";

const DocumentIdPage = ({ params }) => {
    const document = useQuery(api.documents.getById, { documentId: params.documentId });

    if (document === undefined) {
        return (<div>Loading...</div>);
    }

    if (document === null) {
        return (<div>Document not found</div>);
    }

    return (
        <div className="pb-40">
            <div className="h-[12vh]"/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document} />
            </div>
        </div>
    );
}

export default DocumentIdPage;