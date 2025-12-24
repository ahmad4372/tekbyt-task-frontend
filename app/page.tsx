import { getCaseStudies } from "./actions";
import CaseStudyList from "./components/CaseStudyList";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate the page every 60 seconds

export const metadata: Metadata = {
  title: "TekByte - Case Studies",
  description: "Explore our latest case studies and success stories.",
  openGraph: {
    title: "TekByte - Case Studies",
    description: "Explore our latest case studies and success stories.",
    type: "website",
  },
};

export default async function Home() {
  const data = await getCaseStudies(6);
  const nodes = data?.nodes || [];
  const pageInfo = data?.pageInfo || { hasNextPage: false, endCursor: "" };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Case Studies</h1>
      <CaseStudyList initialNodes={nodes} initialPageInfo={pageInfo} />
    </main>
  );
}
