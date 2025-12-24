"use client";

import { useState } from "react";
import CaseStudyCard from "./CaseStudyCard";
import { getCaseStudies } from "../actions";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  caseStudyFields: {
    shortDescription: string;
    featuredImage: {
      node: {
        title: string;
        mediaItemUrl: string;
      };
    };
  };
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface CaseStudyListProps {
  initialNodes: CaseStudy[];
  initialPageInfo: PageInfo;
}

export default function CaseStudyList({
  initialNodes,
  initialPageInfo,
}: CaseStudyListProps) {
  const [nodes, setNodes] = useState<CaseStudy[]>(initialNodes);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !pageInfo.hasNextPage) return;

    setLoading(true);
    try {
      const data = await getCaseStudies(6, pageInfo.endCursor);
      const newNodes = data?.nodes || [];
      const newPageInfo = data?.pageInfo || {
        hasNextPage: false,
        endCursor: "",
      };

      setNodes((prev) => [...prev, ...newNodes]);
      setPageInfo(newPageInfo);
    } catch (error) {
      console.error("Failed to load more", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map((node) => (
          <CaseStudyCard key={node.id} caseStudy={node} />
        ))}
      </div>

      {nodes.length === 0 && (
        <p className="text-center text-gray-500">No case studies found.</p>
      )}

      {pageInfo.hasNextPage && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
