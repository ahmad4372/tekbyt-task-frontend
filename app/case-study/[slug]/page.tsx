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

import CaseStudyView from "@/app/components/CaseStudyDetail";
import Toast from "@/app/components/Ui/Toast";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let data;
  try {
    data = await fetchGraphQL(QUERY, { slug }, { next: { revalidate: 60 } });
  } catch (error: any) {
    return (
      <Toast
        type="error"
        message={error.message || "Failed to load preview data"}
      />
    );
  }

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

  return <CaseStudyView caseStudy={caseStudy} />;
}
