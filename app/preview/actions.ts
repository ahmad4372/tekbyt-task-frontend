"use server";

import { fetchGraphQL } from "@/lib/graphql";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

const LOGIN_MUTATION = `
  mutation LoginUser($username: String!, $password: String!) {
    login(input: {
      clientMutationId: "uniqueId",
      username: $username,
      password: $password
    }) {
      authToken
      user {
        id
        name
      }
    }
  }
`;

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const id = formData.get("id") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const data = await fetchGraphQL(LOGIN_MUTATION, {
      username,
      password,
    });

    if (!data?.login?.authToken) {
      return { error: "Invalid credentials" };
    }

    const authToken = data.login.authToken;

    // Set cookie
    (await cookies()).set("wp_jwt", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    // Enable draft mode
    (await draftMode()).enable();

    // Redirect to preview page
    redirect(`/preview/${id}`);
  } catch (error) {
     if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        throw error;
    }
    console.error("Login failed:", error);
    return { error: "Login failed. Please check your credentials." };
  }
}

export async function logout() {
  (await cookies()).delete("wp_jwt");
  (await draftMode()).disable();
  redirect("/");
}
