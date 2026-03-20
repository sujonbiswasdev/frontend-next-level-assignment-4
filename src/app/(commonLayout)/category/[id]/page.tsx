import { singlecategory } from "@/actions/categories/category"
import Singlecategory from "@/components/category/singlecategory";
import { TGetCategory } from "@/types/category";

const SingleCategoryPage = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params
    const categorybyId=await singlecategory(id)
    console.log(categorybyId,'categoryid')
 if (!categorybyId.success || !categorybyId.data || categorybyId.error) {
    return (
      <div className="p-4 text-red-500">
       fetch failed to single category
      </div>
    );
  }
  return (
    <div>
        <Singlecategory category={categorybyId.data.data as TGetCategory}/>
    </div>
  )
}

export default SingleCategoryPage
