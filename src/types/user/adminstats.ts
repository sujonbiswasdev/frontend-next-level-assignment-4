
export type TUserStats = {
  totalUsers: number
  totalSuspendUser: number
  totalActivateUser: number
  totalAdmin: number
  totalCustomer: number
  totalprovider: number
  todaystats: number
  oneMonthago: number
  totalemailvarified: number
  totalactiveusers: number
  totalunactiveuser: number
}

export type TMealStats = {
  totalmeals: number
  totalavailabemeals: number
  totalunavailabemeals: number,
  totalapprovedmeals:number,
  totalpendingmeals:number,
  totalrejectedmeals:number
}

export type TOrderStats = {
  totalorders: number
  oneMonth: number
  totalcancelledmeals: number
  totalplacedmeals: number
  totalpreparingmeals: number
  totalreadymeals: number
  totaldeliveredmeals: number
  allearn: {
    _sum: {
      totalPrice: number | null
    }
  }
  totalquantity: {
    _sum: {
      quantity: number | null
    }
  }
  todayorders: number
}

export type TRevenueAggregation = {
  totalPrice: number | null
}

export type AvgRevenue = {
  _avg: TRevenueAggregation
}

export type SumRevenue = {
  _sum: TRevenueAggregation
}

export type TRevenueDashboardResponse = {
  avgrevenue: AvgRevenue
  monthlyRevenue: SumRevenue
  todaysRevenue: SumRevenue
  totalrevenue: SumRevenue
  topProvidersrevenue: TTopProviderRevenue[]
  success: boolean
}

export type TTopProviderRevenue = {
  providerId: string
  _sum: {
    totalPrice: number | null
  }
}


export type TReviewStats = {
  totalreviews: number
  todayreviews: number
  topRatedMeals: TopRatedMeal[]
}

export type TopRatedMeal = {
  mealId: string
  _avg: {
    rating: number | null
  }
}

export type TCategoryStats = {
  totalcategory: number
  totalcategory_name: { name: string }[]
  mealsPerCategory: {
    category_name: string
    _count: {
      _all: number
    }
  }[]
}


export type AdminStats = {
  userStats: TUserStats
  mealStats: TMealStats
  orderStats: TOrderStats
  revenueStats: TRevenueDashboardResponse
  reviewStats: TReviewStats
  categoryStats: TCategoryStats
}