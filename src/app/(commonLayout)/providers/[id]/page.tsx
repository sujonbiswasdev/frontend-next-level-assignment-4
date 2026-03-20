import { getProviderwithMeals } from '@/actions/provider/provider.action';
import ProviderPage from '@/components/provider/singleprovider';
import { TGetProviderProfileWithMeals } from '@/types/provider.type';
const SignleProviderwithMenu = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params;
    const res = await getProviderwithMeals(id);
      if (!res.success || res.error ||!res.data?.result) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
    const providerData = res.data as TGetProviderProfileWithMeals;

  return (
    <div>
     <ProviderPage data={providerData }/>
    </div>
  )
}

export default SignleProviderwithMenu
