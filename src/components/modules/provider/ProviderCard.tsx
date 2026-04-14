"use client";

import ImageCard from "@/components/shared/ImageCardSkeleton";
import { TResponseproviderData } from "@/types/provider.type";
import { TUser } from "@/types/user.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  data: TResponseproviderData<{user:TUser}>;
};

const ProviderCard: React.FC<Props> = ({ data }) => {
  console.log(data,'data')
  const router = useRouter();
  const {
    restaurantName,
    address,
    description,
    user,
  } = data;

  const avgRating = data?.avgRating ?? 0;
  const totalReview = data?.totalReviews ?? 0;
  const providerImage = user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const ownerName = user?.name || "Unknown Owner";
  const ownerEmail = user?.email || "No email";

  return (
    <div className="mx-auto mt-7 w-full max-w-sm overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative w-full h-48 overflow-hidden">
        {user?.image ? (
          <ImageCard src={providerImage} alt={ownerName} />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-800">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow text-sm font-medium flex items-center gap-1">
          ⭐ <span>{avgRating || "N/A"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-3">
         <Link href={`/providers/${data.id}`}>
         <img
            src={providerImage}
            alt="owner"
            className="w-10 h-10 rounded-full object-cover border"
          />
         </Link>
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {restaurantName || "Unknown Restaurant"}
            </h2>
            <p className="text-xs text-gray-500">
              by {ownerName}
            </p>
            <p className="text-[11px] text-gray-400">{ownerEmail}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2 truncate">
          📍 {address || "No address provided"}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {description || "No description provided"}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500">
            {totalReview} reviews
          </span>

          <button onClick={()=>router.push(`/providers/${data.id}`)} className="px-4 py-1.5 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;