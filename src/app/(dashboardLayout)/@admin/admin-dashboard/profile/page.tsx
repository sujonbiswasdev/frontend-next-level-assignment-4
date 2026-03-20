import ProfileModal from "@/components/profilemodel";
import { getSession } from "@/services/users/auth.service";
import { TUser } from "@/types/user/user";

export default async function ProfilePage() {
  const session = await getSession();
    if (!session?.data || session.error ||!session || !session.success) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  const userinfo = session.data as TUser
  return <ProfileModal user={userinfo as TUser}/>;
}