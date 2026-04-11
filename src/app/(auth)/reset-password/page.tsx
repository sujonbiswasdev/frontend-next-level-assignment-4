import VerifyOtp from '@/components/modules/auth/EmailVerifyOtp'
import React from 'react'

const ResetPasswordPage = () => {
  return (
    <div>
        <VerifyOtp type="forget-password"/>
    </div>
  )
}

export default ResetPasswordPage