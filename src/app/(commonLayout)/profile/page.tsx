import ProfileModal from "@/components/profilemodel";
import { getSession } from "@/services/service";
import { ApiResponse } from "@/types/response.type";
import { TUser } from "@/types/user/user";
export default async function ProfilePage() {
  const session = await getSession();
   const userinfo= session.data as ApiResponse<TUser>
    if (!userinfo) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return <ProfileModal user={userinfo}/>;
}