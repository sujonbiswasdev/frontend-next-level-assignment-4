import { env } from "@/env"
import { OrderStatsResult } from "@/types/order/order.type.stats"
import { IProviderMealStats, IProviderRevenueStats } from "@/types/provider.type"
import { ApiErrorResponse, ApiResponse } from "@/types/response.type"
import { cookies } from "next/headers"

const api_url=env.API_URL
export const providerServiceStats={
    getrenuestats:async()=>{
        try {
            const cookiestore=await cookies()
            const response = await fetch(`${api_url}/api/provider/revenue/stats`,
                {
                 headers:{
                         Cookie: cookiestore.toString(),
                    },
                    cache:"no-store",
                    credentials:"include"
                },
            )
             const body = await response.json()
             const result = body as ApiResponse<IProviderRevenueStats>
            if (!response.ok) {
                const error=body as ApiErrorResponse
                   return {success:error.success,message:error.message||"retrieve revenue stats failed"}
                }
           return result
          
        } catch (error) {
            return{
                data:null,
                error:error instanceof Error ? error.message : "Unknown error"
            }
        }
    },
    getProvidermealsStats:async()=>{

         try {
            const cookiestore=await cookies()
            const response = await fetch(`${api_url}/api/provider/meals/stats`,
                {
                 headers:{
                         Cookie: cookiestore.toString(),
                    },
                    cache:"no-store",
                    credentials:"include"
                },
            )
             const body = await response.json()
              const result = body as ApiResponse<IProviderMealStats>
            if (!response.ok) {
                const error=body as ApiErrorResponse
                   return {success:error.success,message:error.message||"retrieve meals stats failed"}
                }
           return result
          
        } catch (error) {
            return{
                data:null,
                error:error instanceof Error ? error.message : "Unknown error"
            }
        }

    },
    getownorderstats:async()=>{
          try {
            const cookiestore=await cookies()
            const response = await fetch(`${api_url}/api/provider/orders/stats`,
                {
                 headers:{
                         Cookie: cookiestore.toString(),
                    },
                    cache:"no-store",
                    credentials:"include"
                },
            )
             const body = await response.json()
             const result = body as ApiResponse<OrderStatsResult>
            if (!response.ok) {
                const error=body as ApiErrorResponse
                    return {success:error.success,message:error.message}
                }
            return result
        } catch (error) {
            return{
                data:null,
                error:error instanceof Error ? error.message : "Unknown error"
            }
        }
    }
}