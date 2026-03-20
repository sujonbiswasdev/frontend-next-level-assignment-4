"use server"

import { loginUser, Logout } from "@/services/users/auth.service"
import { Ilogin } from "@/types/user/auth.type"

export const userLogin=async(logindata:Ilogin)=>{
  return await loginUser(logindata)
}
export const userLogout=async()=>{
  return await Logout()
}
