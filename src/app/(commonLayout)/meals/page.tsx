import { getMeals } from '@/actions/blog.meals'
import { getCategory } from '@/actions/categories/category'
import MealsCard from '@/components/meals/get-meals'
import { TGetCategory } from '@/types/category'
import { IGetMealData } from '@/types/meals/mealstype'
import { Ipagination } from '@/types/meals/pagination'
interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}

const GetMeals = async ({ searchParams }: PageProps) => {
  const search =await searchParams
  const response = await getMeals(search);

  if (!response || !response.success) {
  return (
    <div className="p-4 text-red-500">
      No data found
    </div>
  );
}

  const categorydata = await getCategory()
    if (!categorydata) {
    return (
      <div className="p-4 text-red-500">
        Failed to load category
      </div>
    );
  }
  return (
    <div className="">
      
      <MealsCard initialMeals={response.data?.data as IGetMealData[]} initialcategory={categorydata.data?.data as TGetCategory[]} pagination={response.data?.pagination as Ipagination} />
    </div>
  )
}

export default GetMeals