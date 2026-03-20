import {
  getownorderstats,
  getprovidermealsStats,
  getrevenueStats,
} from "@/actions/provider/stats";
import RevenueStats from "@/components/provider/stats";
import { OrderStatsResult } from "@/types/order/order.type.stats";
import {
  IProviderMealStats,
  IProviderRevenueStats,
} from "@/types/provider.type";

const ProviderStats = async () => {
  const revenuedata = await getrevenueStats();
  const mealsdata = await getprovidermealsStats();
  const ownorderdata = await getownorderstats();

  if (!revenuedata.success || !mealsdata.success || !ownorderdata.success) {
    return (
      <div className="p-4 text-red-500">Failed to load provider stats</div>
    );
  }
  return (
    <div>
      {/* ownorderstats={ownorderstats as OrderStatsApiResponse}  */}
      <RevenueStats
        stats={revenuedata.data as IProviderRevenueStats}
        mealstats={mealsdata.data as IProviderMealStats}
        ownorderstats={ownorderdata.data as OrderStatsResult}
      />
    </div>
  );
};

export default ProviderStats;
