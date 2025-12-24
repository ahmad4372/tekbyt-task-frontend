import { fetchGraphQL } from "@/lib/graphql";
import Link from "next/link";
import { Metadata } from "next";

const QUERY = `
  query GetCaseStudyBySlug($slug: ID!) {
    caseStudy(id: $slug, idType: SLUG) {
      title
      content
      date
      caseStudyFields {
        featuredImage {
          node {
            title
            mediaItemUrl
          }
        }
      }
      industries {
        nodes {
          name
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          mediaItemUrl
        }
        twitterTitle
        twitterDescription
        twitterImage {
          mediaItemUrl
        }
        canonical
      }
    }
  }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchGraphQL(
    QUERY,
    { slug },
    { next: { revalidate: 60 } }
  );

  const seo = data?.caseStudy?.seo;

  if (!seo) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: seo.title,
    description: seo.metaDesc,
    openGraph: {
      title: seo.opengraphTitle,
      description: seo.opengraphDescription,
      url: seo.canonical,
      images: seo.opengraphImage?.mediaItemUrl
        ? [
            {
              url: seo.opengraphImage.mediaItemUrl,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      images: seo.twitterImage?.mediaItemUrl
        ? [seo.twitterImage.mediaItemUrl]
        : [],
    },
    alternates: {
      canonical: seo.canonical,
    },
  };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await fetchGraphQL(
    QUERY,
    { slug },
    { next: { revalidate: 60 } }
  );

  const caseStudy = data?.caseStudy;

  if (!caseStudy) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Case study not found</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Home
      </Link>

      {caseStudy.caseStudyFields.featuredImage?.node?.mediaItemUrl && (
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

      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8 text-sm">
        {caseStudy.author?.node?.avatar?.url && (
          <img
            src={caseStudy.author.node.avatar.url}
            alt={caseStudy.author.node.name}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        <span className="mr-4">
          By {caseStudy.author?.node?.name || "Unknown"}
        </span>
        <span className="mr-4">
          In{" "}
          {caseStudy.industries?.nodes
            ?.map((industry: { name: string }) => industry.name)
            .join(", ") || "Unknown"}
        </span>
        <span>{new Date(caseStudy.date).toLocaleDateString()}</span>
      </div>

      <article
        className="prose dark:prose-invert lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: caseStudy.content }}
      />
    </main>
  );
}
