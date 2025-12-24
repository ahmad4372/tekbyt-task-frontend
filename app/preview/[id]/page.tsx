import { fetchGraphQL } from "@/lib/graphql";
import { draftMode } from "next/headers";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PreviewBar from "@/app/components/PreviewBar";

const QUERY = `
  query GetCaseStudyById($id: ID!) {
    caseStudy(id: $id, idType: DATABASE_ID) {
      title
      content
      date
      status
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
    }
  }
`;

export default async function PreviewCaseStudy({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isEnabled } = await draftMode();
  const { id } = await params;

  if (!isEnabled) {
    redirect(`/api/preview?id=${id}&secret=${process.env.HEADLESS_SECRET}`);
  }

  const cookieStore = await cookies();
  const authToken = cookieStore.get("wp_jwt")?.value;

  let data;
  try {
    data = await fetchGraphQL(
      QUERY,
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        next: { revalidate: 0 },
      }
    );
  } catch (error: any) {
    if (error?.graphQLErrors) {
      const isExpired = error.graphQLErrors.some(
        (e: any) => e?.extensions?.debugMessage === "Expired token"
      );
      if (isExpired) {
        redirect(`/preview/login?id=${id}`);
      }
    }
    throw error;
  }

  const caseStudy = data?.caseStudy;

  if (!caseStudy) {
    return (
      <div className="container mx-auto px-4 py-8 text-center mt-12">
        <PreviewBar />
        <h1 className="text-2xl font-bold mb-4">
          Draft not found or access denied
        </h1>
        <p className="mb-4">
          Please ensure you are logged in with an account that has permission to
          view this content.
        </p>
        <Link href="/preview/login" className="text-blue-500 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <PreviewBar />
      <main className="container mx-auto px-4 py-8 max-w-4xl mt-12">
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

        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>

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
          <span className="ml-4 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs uppercase font-bold tracking-wide">
            {caseStudy.status}
          </span>
        </div>

        <article
          className="prose dark:prose-invert lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: caseStudy.content }}
        />
      </main>
    </>
  );
}
