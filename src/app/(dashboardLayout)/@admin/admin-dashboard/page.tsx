import { getCategoryStats, getMealsStats, getOrdersStats, getRevenueStats, getReviewStats, getUserStats } from "@/actions/user/adminstats"
import AdminStats from "@/components/modules/stats/Adminstats"
import { TMealStats, TOrderStats, TUserStats } from "@/types/user/adminstats"

const AdminPage = async() => {
  const userstats=await getUserStats()
  const mealsstats=await getMealsStats()
  const ordersStats=await getOrdersStats()
   const revenuestats=await getRevenueStats()
     const categoriesStats=await getCategoryStats()
      const reviewStats=await getReviewStats()
     if (!userstats || !mealsstats.success || !ordersStats.success || !revenuestats.success || !categoriesStats.success || !reviewStats.success) {
    return (
      <div className="p-4 text-red-500">
        Failed to load data
      </div>
    );
  }
 
  return (
    <div>
     <AdminStats usersStats={userstats.data as TUserStats} mealsStats={mealsstats.data as TMealStats} ordersStats={ordersStats.data as any} revenuestats={revenuestats.data as any} categoriesStats={categoriesStats.data  as any} reviewStats={reviewStats.data as any}/>
    </div>
  )
}

export default AdminPage
