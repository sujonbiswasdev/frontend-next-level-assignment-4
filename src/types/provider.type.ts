import { IGetMealData } from "./meals/mealstype"
import { TUser } from "./user/user"

export type TGetProviderProfileWithMeals ={
    result: {
      id: string,
      userId: string,
      restaurantName: string,
      address: string,
      description: string,
      image:string | null,
      createdAt: string,
      updatedAt: string,
      user: TUser,
      meals:IGetMealData[],
      totalReview: number,
      averageRating: number
    }
  }
  // get provider info
  export interface IProviderInfo {
  id: string;
  userId: string;
  restaurantName: string;
  address: string;
  description: string;
  user:TUser;
  meals?:IGetMealData[]
  rating?:{totalReview: number, averageRating: number};
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

// provider revenue stats

export interface IProviderRevenueStats{
    totalrevenue: { _sum: {totalPrice:number} },
    todaysRevenue: { _sum: {totalPrice:number}},
    monthlyRevenue: { _sum:{totalPrice:number} },
    avgrevenue: { _avg: {totalPrice:number}},
    topProvidersrevenue: {providerId:string}[]
}


// provider meals stats
export interface IProviderMealStats{
    totalmeals: number
    totalavailabemeals: number
    totalunavailabemeals: number
}
