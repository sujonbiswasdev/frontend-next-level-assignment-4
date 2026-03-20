import { revalidateTag } from 'next/cache';
import { env } from "@/env"
import { cookies } from "next/headers"
import { TUpdateUserInput, TUser } from '@/types/user/user';
import { ApiErrorResponse, ApiResponse } from '@/types/response.type';

const api_url=env.API_URL

export const userService={
    updateUser:async(updateUser:TUpdateUserInput)=>{  
  try {
    const cookieStore = await cookies()
    const res = await fetch(`${api_url}/api/user/profile/update`, {
      method: "PUT",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(updateUser),
    });
    revalidateTag("userdata",'max')
    const data= await res.json();
    const result =data as ApiResponse<TUser> 
    if (!res.ok) {
      const error=data as ApiErrorResponse
       return { message: error.message || "An error occurred while updating" }
    }
    return { success: true, message: "user updated successfully", result };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || "An error occurred while updating" };
  }
    },
     DeleteUserown: async () => {
            try {
                const cookieStore = await cookies()
                const res = await fetch(`${api_url}/api/user/profile/own`, {
                    method:"DELETE",
                    credentials: "include",
                    headers: {
                        Cookie: cookieStore.toString()
                    },
                    next:{
                        tags:['userdata']
                    }
                })
                const body = await res.json()
                const result = body as ApiResponse<TUser>
                if(!res.ok){
                  const error= body as ApiErrorResponse
                  return {
                    message:error.message || "user deleted successfully"
                  }
                }
             return {result,message: result.message||"user deleted successfully"}
            } catch (error: any) {
                return {
                    data: null,
                    error: error.message
                }
            }
    
        },
    

}