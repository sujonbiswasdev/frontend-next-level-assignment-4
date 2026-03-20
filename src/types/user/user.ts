import { UpdateUserCommonData, updateUserSchema, UpdateuserschemabyAdmin } from "@/validations/auth.validation"
import z from "zod"
import { Ipagination } from "../meals/pagination"
import { IProviderInfo } from "../provider.type"
// update user by admin
export type TUpdateuserbyAdmin = z.infer<typeof UpdateuserschemabyAdmin>

// update user common data
export type TUpdateUserCommonData=z.infer<typeof UpdateUserCommonData>


export type TUserRoleType = "Provider" | "Admin" | "Customer"

export type TUserStatusType = "activate" | "suspend"


export type TUpdateUserInput = z.infer<typeof updateUserSchema>;


// user type
export type TUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string
  status:string
  phone: string | null;
  isActive: boolean;
  bgimage: string | null;
  provider?:IProviderInfo
};


export interface IGetAllUserdata{
     data:TUser[],
     pagination: Ipagination
}
