import { env } from "@/env";
import { safeData } from "@/lib/safeResponsive";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { IGetAllUserdata, TUpdateUserCommonData, TUser, TUserRoleType } from "@/types/user/user";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const api_url = env.API_URL;

export const AdminService = {
  updateuserdata: async (id: string, updateUser: TUpdateUserCommonData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/admin/profile/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(updateUser),
      });
      const data = await res.json();
      const result = data as ApiResponse<TUser>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "user updated failed",
        };
      }
      return result;
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        error: error.message || "something went wrong please  try again",
      };
    }
  },
  getAllusers: async (params?: any) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${api_url}/api/admin/users`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }
      const res = await fetch(url.toString(), {
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ["userdata"],
        },
      });
      const data = await res.json();
      const result = data as ApiResponse<IGetAllUserdata>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve all users successfully",
        };
      }
      return result;
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
        message: "someting went wrong please try again",
      };
    }
  },
  getuserbyid: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/user/profile/${id}`, {
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ["userdata"],
        },
      });
      const body = await res.json();
      const result = body as ApiResponse<TUser>;
      if (!res.ok) {
        const error = body as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve single user failed",
        };
      }
      return result;
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },
  DeleteUser: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/user/profile/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ["userdata"],
        },
      });
      const body = await res.json();
          const result = body as ApiResponse<TUser>;
                if (!res.ok) {
                    const error = body as ApiErrorResponse
                  return { success:error.success,message:error.message || "user deleted failed"};
                }
                return result;
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },
};
