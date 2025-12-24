import Link from "next/link";
import React from "react";

interface CaseStudyDetailProps {
  caseStudy: {
    title: string;
    content: string;
    date: string;
    status?: string;
    caseStudyFields: {
      featuredImage?: {
        node: {
          title: string;
          mediaItemUrl: string;
        };
      };
    };
    author?: {
      node: {
        name: string;
        avatar?: {
          url: string;
        };
      };
    };
    industries?: {
      nodes: Array<{ name: string }>;
    };
  };
  children?: React.ReactNode; // For additional preview-specific UI
}

export default function CaseStudyDetail({
  caseStudy,
  children,
}: CaseStudyDetailProps) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl mt-12">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Home
      </Link>

      {caseStudy.caseStudyFields?.featuredImage?.node?.mediaItemUrl && (
        <img
          src={caseStudy.caseStudyFields.featuredImage.node.mediaItemUrl}
          alt={
            caseStudy.caseStudyFields.featuredImage.node.title ||
            caseStudy.title
          }
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">{caseStudy.title}</h1>

      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8 text-sm flex-wrap gap-y-2">
        {caseStudy.author?.node?.avatar?.url && (
          <img
            src={caseStudy.author.node.avatar.url}
            alt={caseStudy.author.node.name || "Author"}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        <span className="mr-4">
          By {caseStudy.author?.node?.name || "Unknown"}
        </span>
        <span className="mr-4">
          In{" "}
          {caseStudy.industries?.nodes
            ?.map((industry) => industry.name)
            .join(", ") || "Unknown"}
        </span>
        <span className="mr-4">
          {new Date(caseStudy.date).toLocaleDateString()}
        </span>
        {children}
      </div>

      <article
        className="prose dark:prose-invert lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: caseStudy.content }}
      />
    </main>
  );
}
