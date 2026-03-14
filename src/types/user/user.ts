import { updateUserSchema, UpdateuserschemabyAdmin } from "@/validations/auth.validation"
import z from "zod"
// update user by admin
export type TUpdateuserbyAdmin = z.infer<typeof UpdateuserschemabyAdmin>


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
  role: TUserRoleType
  status:TUserStatusType
  phone: string | null;
  isActive: boolean;
  bgimage: string | null;
};

