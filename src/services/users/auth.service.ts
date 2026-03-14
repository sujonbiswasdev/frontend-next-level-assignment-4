"use server";

import { env } from "@/env";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { Ilogin, TAuthData } from "@/types/user/auth.type";
import { TUser } from "@/types/user/user";
import { cookies } from "next/headers";
const api_url = env.API_URL;

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    if (!cookieHeader) {
      return null;
    }
    const res = await fetch(`${api_url}/api/auth/me`, {
      method: "GET",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });
    const session:ApiResponse<TUser> = await res.json();
    if (!session) {
      return { data: null, error: "No session" };
    }
    return { data: session, error: null };
  } catch (e: any) {
    return { data: null, error: "server error" };
  }
}

export async function loginUser(logindata: Ilogin) {
  try {
    const storeCookies = await cookies();
    const response = await fetch(`${api_url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: storeCookies.toString(),
      },
      cache: "no-store",
      body: JSON.stringify(logindata),
    });
    const body: ApiResponse<TAuthData> = await response.json();
    if (!response.ok || !body.success) {
      const data = body as ApiErrorResponse;
      return {
        data: null,
        error: data.message || "Login failed",
      };
    }

    const { accessToken, refreshToken: newRefreshToken, token } = body.data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }

    if (token) {
      await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds
    }
    return { data: body, error: null };
  } catch (error) {
    return { data: null, error: "server error" };
  }
}
