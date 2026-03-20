import z from "zod";
import { TGetCategory } from "../category";
import { TUser } from "../user/user";
import { Ipagination } from "./pagination";
import { CreateMealData, UpdatemealData } from "@/validations/meal.validations";
import { IProviderInfo, TGetProviderProfileWithMeals } from "../provider.type";
import { IgetReviewData } from "../reviews.type";
export const cuisines = [
  "BANGLEDESHI",
  "ITALIAN",
  "CHINESE",
  "INDIAN",
  "MEXICAN",
  "THAI",
  "JAPANESE",
  "FRENCH",
  "MEDITERRANEAN",
  "AMERICAN",
  "MIDDLE_EASTERN"
] as const;

export const dietaryPreferences = [
  "HALAL",
  "VEGAN",
  "VEGETARIAN",
  "ANY",
  "GLUTEN_FREE",
  "KETO",
  "PALEO",
  "DAIRY_FREE",
  "NUT_FREE",
  "LOW_SUGAR"
] as const;

// create meal
export type ICreateMealsData=z.infer<typeof CreateMealData>

export type Cuisine = typeof cuisines[number];
export type DietaryPreference = typeof dietaryPreferences[number];


export interface ReviewCustomer {
  id: string;
  name: string | null;
  image: string | null;
  email: string;
}
// update meal
export type IUpdateMealsData = z.infer<typeof UpdatemealData>;

export interface IGetAllmeals{
  data:IGetMealData[],
  pagination:Ipagination
}

export interface MealReview {
  id: string
  comment: string
  rating: number
  parentId: string | null
  customer?: ReviewCustomer
  status:"APPROVED" | "REJECTED"
  replies: MealReview[] 
}

export interface IGetMealData {
  id: string;
  meals_name: string;
  description: string | null;
  image: string | null;
  price: number;
  isAvailable: boolean;
  dietaryPreference: DietaryPreference;
  providerId: string;
  category_name: string;
  cuisine: Cuisine;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  provider: IProviderInfo;
  reviews: MealReview[];
  providerRating?:{
    averageRating:number
    totalReview:number
  };
  averageRating?:number
  totalReview?:number
  category:TGetCategory
}

 export interface providerRating{
    averageRating:number
    totalReview:number
  };




export type UpdateMealsData = {
  meals_name?: string;
  description?: string;
  image?: string;
  price?: number;
  isAvailable?: boolean;
  dietaryPreference?: DietaryPreference;
  category_name?: string;
  cuisine?: Cuisine;
};
