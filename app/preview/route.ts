import { draftMode } from "next/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  if (token !== process.env.HEADLESS_SECRET || !id) {
    return new Response("Invalid token", { status: 401 });
  }

  // Check if we have an auth token
  const cookieStore = await cookies();
  const authToken = cookieStore.get("wp_jwt");

  if (!authToken) {
    // Redirect to login if no token
    redirect(`/preview/login?id=${id}`);
  }

  (await draftMode()).enable();

  // Redirect to preview page
  redirect(`/preview/${id}`);
}
