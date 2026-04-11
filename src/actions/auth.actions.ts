import { ForgotPasswordEmailOTP, loginUser, Logout } from "@/services/auth.service"
import { Ilogin } from "@/types/auth.type"
import { resendVerificationCode } from "@/services/auth.service";
import { verifyEmail } from "@/services/auth.service";

export const userLogin=async(logindata:Ilogin)=>{
  return await loginUser(logindata)
}
export const userLogout=async()=>{
  return await Logout()
}



export const userVerifyEmail = async (verifyData: { email: string; otp: string }) => {
  return await verifyEmail(verifyData);
};


export const resendVerificationCodeAction = async ({ email }: { email: string }) => {
  return await resendVerificationCode({ email });
};
export const forgotPasswordEmailOTPAction = async ({ email }: { email: string }) => {
  return await ForgotPasswordEmailOTP({ email });
};