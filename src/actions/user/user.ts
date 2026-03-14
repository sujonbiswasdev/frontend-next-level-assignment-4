"use server"

import { userService } from "@/services/users/user"
import { TUpdateUserInput } from "@/types/user/user"

export const updateUser=async(userdata:TUpdateUserInput)=>{
  return await userService.updateUser(userdata)
}

export const deleteuserown=async()=>{
  return await userService.DeleteUserown()
}