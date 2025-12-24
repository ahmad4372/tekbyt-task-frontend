import { fetchGraphQL } from "@/lib/graphql";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import PreviewBar from "@/app/components/PreviewBar";
import Toast from "@/app/components/Ui/Toast";

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

import CaseStudyView from "@/app/components/CaseStudyDetail";

export default async function PreviewCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isEnabled } = await draftMode();
  const { id } = await params;

  if (!isEnabled) {
    redirect(`/api/preview?id=${id}&secret=${process.env.HEADLESS_SECRET}`);
  }

  let data;
  try {
    data = await fetchGraphQL(QUERY, { id: id }, { next: { revalidate: 60 } });
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
      <div className="container mx-auto px-4 py-8 text-center mt-12">
        <PreviewBar />
        <h1 className="text-2xl font-bold mb-4">
          Draft not found or access denied
        </h1>
        <p className="mb-4">
          Please ensure your account has permission to view this content.
        </p>
      </div>
    );
  }

  return (
    <>
      <PreviewBar />
      <CaseStudyView caseStudy={caseStudy}>
        <span className="ml-0 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs uppercase font-bold tracking-wide">
          {caseStudy.status}
        </span>
      </CaseStudyView>
    </>
  );
}
