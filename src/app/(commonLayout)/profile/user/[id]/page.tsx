import { getuserbyid } from '@/actions/user.actions'
import SingleProfile from '@/components/singleprofile'
import { TUser } from '@/types/user.type'
import React from 'react'

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = await params
    const userprofile = await getuserbyid(id.id)
       if (!userprofile?.data || !userprofile.success) {
        return (
            <div className="p-4 text-red-500">
                Failed to load users
            </div>
        );
    }
    return (
        <div className='mt-6 sm:mt-10 lg:mt-14 xl:mt-20'>
            <SingleProfile user={userprofile.data as TUser} />
        </div>
    )
}

export default UserProfile
