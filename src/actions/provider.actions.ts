"use server"

import { providerService } from "@/services/provider.service"
import { IProviderInfo } from "@/types/provider.type"

export const getProviderwithMeals=async(id:string)=>{
    return await providerService.getprovidermeals(id)
  }
  
  export const getAlluserProvider=async(params:any)=>{
    return await providerService.getAllProviderUser(params)
  }
  export const getTopProviderUser = async () => {
    return await providerService.getTopProviderUser()
  }
export const updateProvider = async (updateProvider: Partial<IProviderInfo>) => {
  return await providerService.updateProvider(updateProvider);
}