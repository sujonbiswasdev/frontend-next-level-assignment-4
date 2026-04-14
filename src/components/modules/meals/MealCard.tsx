"use client";
import { TResponseMeals } from "@/types/meals.type";
import { manageCartStore } from "@/store/CartStore";
import { useRouter } from "next/navigation";
import { TResponseproviderData } from "@/types/provider.type";
import { cn } from "@/lib/utils";
import { TUser } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";

type MealCardProps = {
  meal: TResponseMeals<{ provider: TResponseproviderData<{ user: TUser }> }>;
  className?: string;
};

const MealCard = ({ meal, className }: MealCardProps) => {
  const { addToCart } = manageCartStore();
  const router = useRouter();
  const fullStars = Math.floor(Number(meal.avgRating));
  const hasHalfStar = Number(meal.avgRating) % 1 >= 0.5;
  const restaurantName = meal.provider?.restaurantName || "Unknown Restaurant";
  const providerInitials = restaurantName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={cn(
        "h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl",
        className
      )}
    >
      <div className="relative aspect-4/3 w-full bg-gray-100">
          {meal.image ? (
            <Image
              fill
              src={meal.image}
              alt={meal.meals_name}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 text-base sm:text-lg">
              No Image
            </div>
          )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800">
          {meal.category_name}
        </span>
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white",
            meal.isAvailable ? "bg-emerald-500" : "bg-red-500"
          )}
        >
          {meal.isAvailable ? "Available" : "Sold Out"}
        </span>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="line-clamp-1 text-lg font-bold text-gray-900 sm:text-xl">
            {meal.meals_name}
          </h2>
          <span className="shrink-0 text-xl font-bold text-amber-600">
            ${meal.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <p className="truncate text-xs text-gray-500 sm:text-sm">
            {meal.cuisine}
            {meal.dietaryPreference && <> • {meal.dietaryPreference}</>}
          </p>
          <div className="flex shrink-0 items-center">
            {Array.from({ length: 5 }).map((_, i) => {
              if (i < fullStars) {
                return (
                  <span key={`full-${i}`} className="text-xs text-yellow-400 sm:text-sm">
                    ★
                  </span>
                );
              }
              if (i === fullStars && hasHalfStar) {
                return (
                  <span key={`half-${i}`} className="text-xs text-yellow-300 sm:text-sm">
                    ★
                  </span>
                );
              }
              return (
                <span key={`empty-${i}`} className="text-xs text-gray-300 sm:text-sm">
                  ★
                </span>
              );
            })}
            <span className="ml-1 text-[10px] text-gray-500 sm:text-xs">
              ({meal.totalReviews || 0})
            </span>
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
          {meal.description}
        </p>

        <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Provider</span>
            <span className="text-xs font-semibold text-blue-700">
              Delivery: ৳{Number(meal.deliverycharge ?? 0).toFixed(0)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {meal.provider?.user.image ? (
              <Link href={`/providers/${meal.provider.id}`}>
                <Image
                  width={36}
                  height={36}
                  src={meal.provider.user.image as string}
                  alt={meal.provider.user.name || restaurantName}
                  className="size-9 rounded-full border border-gray-200 object-cover"
                />
              </Link>
            ) : (
              <div className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-xs font-bold text-gray-700">
                {providerInitials || "NA"}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {restaurantName}
              </p>
              <p className="truncate text-xs text-gray-500">
                {meal.provider?.address || "Address not available"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push(`/meals/${meal.id}`)}
            className={cn(
              "w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
            )}
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() =>
              addToCart({
                id: meal.id,
                mealid: meal.id,
                name: meal.meals_name,
                restaurantName: meal.provider?.restaurantName || "Unknown Restaurant",
                price: meal.price,
                deliverycharge: meal.deliverycharge ?? 0,
                image: meal.image as string,
                isAvailable: meal.isAvailable,
                quantity: 1,
              })
            }
            disabled={!meal.isAvailable}
            className={cn(
              "w-full rounded-md px-4 py-2 text-sm font-semibold transition",
              meal.isAvailable
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default MealCard;
