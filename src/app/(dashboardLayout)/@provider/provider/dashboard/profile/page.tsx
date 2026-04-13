import ProviderProfilePage from '@/components/modules/provider/profileCard'
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ErrorFallback from '@/components/shared/ErrorFallback';
import { getSession } from '@/services/auth.service';
import { TUser } from '@/types/user.type';

const ProviderProfile = async () => {
  const user = await getSession();
  if (!user || user.error || !user.success) {
    return (
      <div className="p-4 text-red-500">
        Failed to load provider profile
      </div>
    );
  }
  return (
    <ErrorBoundary fallback={<ErrorFallback title="Provider Profile Error" message="There was a problem loading the provider profile. Please try again later." />}>
      <div>
        <ProviderProfilePage userdata={user.data as TUser} />
      </div>
    </ErrorBoundary>
  );
};

export default ProviderProfile
