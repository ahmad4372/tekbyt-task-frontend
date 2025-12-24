"use server";

import { fetchGraphQL } from "@/lib/graphql";

const GET_CASE_STUDIES_QUERY = `
  query GetCaseStudies($first: Int!, $after: String) {
    caseStudies(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        caseStudyFields {
          shortDescription
          featuredImage {
            node {
              title
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;

export async function getCaseStudies(first: number = 6, after: string | null = null) {
  const data = await fetchGraphQL(
    GET_CASE_STUDIES_QUERY,
    { first, after },
    { next: { revalidate: 60 } }
  );

  return data?.caseStudies;
}
