import { getmealsforadmin } from "@/actions/blog.meals"
import AdminMealsTable from "@/components/meals/adminmealsTable"

interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}
const AdminMealspage = async ({ searchParams }: PageProps) => {
  const search = await searchParams
  const res = await getmealsforadmin(search);
  if (!res) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div>
      <AdminMealsTable initialmeals={res} />
    </div>
  )
}

export default AdminMealspage
