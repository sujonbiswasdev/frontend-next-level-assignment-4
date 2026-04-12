import { singlecategory } from "@/actions/category"
import {  TResponseCategoryData } from "@/types/category";
import Singlecategory from "@/components/modules/category/singlecategory";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { TUser } from "@/types/user.type";
import {  IGetMealData } from "@/types/meals.type";
import ErrorFallback from "@/components/shared/ErrorFallback";
import Notfounddata from "@/components/Notfounddata";

const SingleCategoryPage = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params
    const categorybyId=await singlecategory(id)
    
    return (
      <>
        <title>Category Details</title>
        <ErrorBoundary fallback={<ErrorFallback message="fetch failed to single category" title="Category Error" />}>
          {(!categorybyId.success || !categorybyId.data || categorybyId.error) ? (
         <Notfounddata content="Category not found or could not be loaded." btntext="Go Home" path="/" emoji="😕" />
     
          ) : (
            <div>
              <Singlecategory category={categorybyId.data.data as TResponseCategoryData<{user:TUser,meals:IGetMealData[]}>}/>
            </div>
          )}
        </ErrorBoundary>
      </>
 
 
    );
}

export default SingleCategoryPage
