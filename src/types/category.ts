import { IGetMealData } from "./meals/mealstype";

// category create
export interface ICreateCategory {
  name: string;
  image: string; 
}

export interface IUpdateCategory {
  name?: string;
  image?: string; 
}



export type TGetCategory = {
  id:string,
  name: string
  image: string
  adminId:string
  createdAt:string
  meals: IGetMealData[]
  user: {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    bgimage: string
    phone: string | null
    role: string
    status: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
}