import Footer from '@/components/shared/footer'
import { Navbar } from '@/components/shared/Navbar'
import { getSession } from '@/services/service'
import { User } from '@/types/user/user'
import React from 'react'

const CommonLayout = async({children}:{children:React.ReactNode}) => {
  const userdata=await getSession()
  return (
    <div className='px-2 sm:px-4 lg:px-8'>
        <Navbar user={userdata?.data?.result as User} className='flex mx-auto'/>
      {children}
      <Footer/>
    </div>
  )
}

export default CommonLayout
