"use client";
import Link from "next/link";
import { useState } from "react";
import { Pen, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { updateorderstatus } from "@/actions/order.action";
import { IgetReviewData } from "@/types/reviews.type";
import { deleteReviewAction, moderateReviewAction } from "@/actions/reviews.order";
import { IModerateData } from "@/services/review.service";
export interface IOrderUpdateStatus {
  status: string;
}

const ReviewsTable = ({
  initialreviews,
}: {
  initialreviews: IgetReviewData[];
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [reviews, setreviews] = useState(initialreviews);
  const [status, setStatus] = useState<IModerateData>({ status: "" });
  const handleUpdate = async (id: string, data: IModerateData) => {
    try {
      const toastId = toast.loading("review status updating.......");
      const res = await moderateReviewAction(id, data);
      if (!res.success || res.error || !res.data) {
        toast.dismiss(toastId);
        toast.error(res.message || "reviews status update failed");
        return;
      }
      toast.dismiss(toastId);
      toast.success(res.message || "reviews status updated successfully");
      setreviews((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: status.status } : order,
        ),
      );

      setEditingId(null);
      setStatus({ status: "" });
    } catch (error) {
      toast.error("Something went wrong.please try again");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const toastId = toast.loading("revieww deleting.......");
      const res = await deleteReviewAction(id);
      if (!res.success || !res.data) {
        toast.dismiss(toastId);
        toast.error(res.message || "review delete failed");
        return;
      }
      toast.dismiss(toastId);
      toast.success(res.message || "review deleted successfully");
      setreviews((prev) =>
        prev.filter((review) => (review.id !== id ? null : review)),
      );

      setEditingId(null);
      setStatus({ status: "" });
    } catch (error) {
      toast.error("Something went wrong.please try again");
    }
  };

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          reviews Management
        </h1>
        <div className="text-sm text-gray-500">
          Total reviews: {reviews.length}
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              {[
                "SL",
                "customerId",
                "MealId",
                "parentId",
                "rating",
                "status",
                "comment",
                "createdAt",
                "updatedAt",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-4 text-left whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {reviews.length > 0 ? (
              reviews.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-500">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/orders/${item.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.customerId.slice(0, 8)}...
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/meals/${item.mealId}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.mealId.slice(0, 8)}...
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {item.parentId ? item.parentId : "null"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.rating}</td>
                  <td className="px-6 py-4">
                    <Status
                      variant={item.status === "APPROVED" ? "success" : "error"}
                      className="px-3 py-1 rounded-full"
                    >
                      <StatusIndicator />
                      <StatusLabel>{item.status}</StatusLabel>
                    </Status>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.comment.slice(0, 10)}...
                  </td>

                  <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-2 flex items-center flex-wrap">
                    {editingId === item.id ? (
                      <div className="flex flex-col gap-2 flex-1">
                        <input
                          type="text"
                          placeholder="Update status(APPROVED,REJECTED)"
                          className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-[10px]"
                          value={status.status}
                          onChange={(e) =>
                            setStatus({ status: e.target.value })
                          }
                        />

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(item.id, status)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700 transition"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-200 p-1 rounded-lg hover:bg-gray-300 transition"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Pen
                        size={16}
                        className="text-blue-600 cursor-pointer hover:scale-110 transition"
                        onClick={() => setEditingId(item.id)}
                      />
                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition flex-1"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsTable;
