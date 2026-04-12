import { singlecategory } from "@/actions/category"
import {  TResponseCategoryData } from "@/types/category";
import Singlecategory from "@/components/modules/category/singlecategory";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { TUser } from "@/types/user.type";
import {  IGetMealData } from "@/types/meals.type";

const SingleCategoryPage = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params
    const categorybyId=await singlecategory(id)
    
    return (
      <ErrorBoundary>
        {(!categorybyId.success || !categorybyId.data || categorybyId.error) ? (
          <div className="p-4 text-red-500">
            fetch failed to single category
          </div>
        ) : (
          <div>
            <Singlecategory category={categorybyId.data.data as TResponseCategoryData<{user:TUser,meals:IGetMealData[]}>}/>
          </div>
        )}
      </ErrorBoundary>
    );
}

export default SingleCategoryPage
