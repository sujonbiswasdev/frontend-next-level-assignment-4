import { TCategoryStats, TReviewStats } from './../../types/user/adminstats';
// services/adminService.ts
import { env } from "@/env";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { TMealStats, TUserStats } from "@/types/user/adminstats";
import { cookies } from "next/headers";

const api_url = env.API_URL;

export const adminService = {
  getUserStats: async () => {
    try {
      const cookiestore = await cookies();
      const res = await fetch(`${api_url}/api/admin/users/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      });
      const body = await res.json();
      const result = body as ApiResponse<TUserStats>;
      if (!res.ok) {
        const error = body as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve user stats failed",
        };
      }
      return result;
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  //  Meals
  getMealsStats: async () => {
    try {
      const cookiestore = await cookies();
      const res = await fetch(`${api_url}/api/admin/meals/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      const result = data as ApiResponse<TMealStats>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve meals stats failed",
        };
      }
      return result;
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  //  Orders
  getOrdersStats: async () => {
    try {
      const cookiestore = await cookies();
      const res = await fetch(`${api_url}/api/admin/orders/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      const result = data as ApiResponse<TUserStats>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve order stats failed",
        };
      }
      return result;
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  //Revenue
  getRevenueStats: async () => {
    try {
      const cookiestore = await cookies();
      const res = await fetch(`${api_url}/api/admin/revenue/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      const result = data as ApiResponse<TUserStats>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve revenue stats failed",
        };
      }
      return result;
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  // Reviews
  getReviewStats: async () => {
    try {
      const cookiestore = await cookies();
      const res = await fetch(`${api_url}/api/admin/reviews/stats`, {
          headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      });
      const body = await res.json();
      const result = body as ApiResponse<TReviewStats>;
      if(!res.ok){
        const error=body as ApiErrorResponse
        return {success:error.success,message:error.message || "retrieve review stats failed"}
      }
      return result
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  // Categories
  getCategoryStats: async () => {
    try {
      const cookiestore = await cookies();
      const res = await fetch(`${api_url}/api/admin/category/stats`, {
          headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
       const result = data as ApiResponse<TCategoryStats>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve category stats failed",
        };
      }
      return result;
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};
