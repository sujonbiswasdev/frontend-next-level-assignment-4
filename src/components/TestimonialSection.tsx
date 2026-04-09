"use client";
import { IProviderInfo } from "@/types/provider.type";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function TestimonialSection({
  testomonialdata,
}: {
  testomonialdata: IProviderInfo[];
}) {
  const providerdata=testomonialdata.map((item)=>item)
  const mealdata=providerdata.find((item)=>item.meals)
  // const mainReviews = mealdata.filter((r) => r.parentId == null);
  // const totalReviews = mainReviews.length;
  // const avg =
  //   totalReviews > 0
  //     ? mainReviews.reduce((sum: any, r: any) => sum + r.rating, 0) /
  //       totalReviews
  //     : 0;
  // const fullStars = Math.floor(Number(avg));
  // const hasHalfStar = Number(avg) % 1 >= 0.5;
  return (
    <section className="w-full py-16 px-4 bg-white shadow-sm space-y-1">
      <div className="max-w-[1440px] mx-auto">
        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {providerdata.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Profile */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="relative w-14 h-14">
                  <Image
                    src={item.user.image as string}
                    alt={item.user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="">restaurantName : {item.restaurantName} </p>
                  <p>role : {item.user.role}</p>
                </div>
              </div>
              <div>
                <p>{item.description}</p>
              </div>
              {/* Rating */}
              <div className="flex justify-between items-center gap-0.5">
                <div className="flex">
                  {/* {Array.from({ length: 5 }).map((_, i) => {
                    if (i<fullStars) {
                      return (
                        <Star
                          key={i}
                          className="w-[14px] text-amber-400 fill-amber-400"
                        />
                      );
                    }
                    if (i === fullStars && hasHalfStar) {
                      return (
                        <StarHalf
                          key={i}
                          className="w-[14px] text-amber-400 fill-amber-400"
                        />
                      );
                    }

                    return <Star key={i} className="w-[14px] text-gray-300" />;
                  })} */}

                  <div>
                    <span className="text-xs text-gray-600 ml-1">
                      ({Number(item?.averageRating).toFixed(1)})
                    </span>
                    {/* <span>({findReview?.totalReview}reviews)</span> */}
                  </div>
                </div>
                <Link
                  className="text-blue-700 hover:underline font-semibold"
                  href={`/providers/${item.id}`}
                >
                  Click
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
