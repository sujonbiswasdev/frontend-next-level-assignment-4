import Footer from "@/components/shared/footer";
import { Navbar } from "@/components/shared/Navbar";
import { getSession } from "@/services/users/auth.service";
import { TUser } from "@/types/user/user";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const userinfo = await getSession();
  const result = userinfo?.data;

  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-8">
      <Navbar user={result as TUser} className="flex mx-auto" />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout