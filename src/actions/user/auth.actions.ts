"use server"

import { loginUser } from "@/services/users/auth.service"
import { Ilogin } from "@/types/user/auth.type"

export const userLogin=async(logindata:Ilogin)=>{
  return await loginUser(logindata)
}
