import Link from "next/link";

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

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/case-study/${caseStudy.slug}`}
      className="block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-zinc-900"
    >
      {caseStudy.caseStudyFields?.featuredImage?.node?.mediaItemUrl && (
        <img
          src={caseStudy.caseStudyFields.featuredImage.node.mediaItemUrl}
          alt={
            caseStudy.caseStudyFields.featuredImage.node.title ||
            caseStudy.title
          }
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">
          {caseStudy.title}
        </h2>
        <div
          className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm"
          dangerouslySetInnerHTML={{
            __html: caseStudy.caseStudyFields.shortDescription,
          }}
        />
      </div>
    </Link>
  );
}
