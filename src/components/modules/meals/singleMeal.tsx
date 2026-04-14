'use client'
import Image from 'next/image'
import { Button } from '../../ui/button'
import { manageCartStore } from '@/store/CartStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Status, StatusIndicator, StatusLabel } from '../../ui/status'
import { Suspense, useState } from 'react'
import { Star, StarHalf } from 'lucide-react'
import { MealsForm } from './create-meals'
import ReviewForm from '../review/reviewform'
import { ReviewItem } from '../review/reviewitem'
import { IGetMealData, TResponseMeals } from '@/types/meals.type'
import { TUser } from '@/types/user.type'
import { TGetCategory } from '@/types/category'
import { IProviderInfo } from '@/types/provider.type'
import { IgetReviewData } from '@/types/reviews.type'
import ImageCard from '@/components/shared/ImageCardSkeleton'

const SignleMealByid = ({ meal,userinfo }: { meal:TResponseMeals<{category:TGetCategory,provider:IProviderInfo,reviews:IgetReviewData[],providerRating:any}>,userinfo:TUser}) => {
  console.log(meal,'meal')
  const addToCart = manageCartStore((state) => state.addToCart)
  const router = useRouter()
  const defaultIamge = 'https://res.cloudinary.com/drmeagmkl/image/upload/v1771962102/default_meal_kgc6mv.png'
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
  const starCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: meal.reviews.filter(r => Math.floor(r.rating) === star).length
  }));
   const fullStars = Math.floor(Number(meal.providerRating?.averageRating));
  const hasHalfStar = Number(meal.providerRating?.averageRating) % 1 >= 0.5;
  return (
    <div>
      <div className="bg-[#f8fafc] min-h-screen py-10 px-4">
        <div className="max-w-[1440px] mx-auto space-y-12">

          {/* HERO SECTION */}
          <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-xl">

        <Suspense fallback={<p>image loading..........</p>}>
                {meal.image ? (
          <ImageCard src={meal.image} alt={meal.meals_name} />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-800">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        )}
        </Suspense>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-10 left-10 text-white">
              <h1 className="text-3xl md:text-5xl font-bold">
                {meal.meals_name}
              </h1>
              <p className="mt-2 text-lg opacity-90">{meal.cuisine}</p>
            </div>

            <div className="absolute top-6 right-6">
              <span
                className={`px-5 py-2 rounded-full text-sm font-semibold shadow text-white ${meal.isAvailable ? "bg-green-500" : "bg-red-500"
                  }`}
              >
                {meal.isAvailable ? "Available" : "Sold Out"}
              </span>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* DESCRIPTION */}
              <section className="bg-white rounded-2xl shadow p-5 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">About This Meal</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 text-sm">
                  <div>
                    <span className="text-gray-500">Category</span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <img
                        src={meal.category.image}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                      />
                      <p className="font-semibold">{meal.category.name}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Dietary</span>
                    <p className="font-semibold">{meal.dietaryPreference}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Cuisine</span>
                    <p className="font-semibold">{meal.cuisine}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Price</span>
                    <p className="font-semibold">${meal.price?.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Delivery Charge</span>
                    <p className="font-semibold">${meal.deliverycharge?.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Created At</span>
                    <p className="font-semibold">{meal.createdAt?.slice(0, 10)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 px-2">Available : </span>
                    {meal.isAvailable ? (
                      <Status
                        variant="success"
                        className="bg-green-500 text-white px-3 py-1 rounded-full text-xs inline-flex items-center gap-1"
                      >
                        <StatusIndicator />
                        <StatusLabel>Available</StatusLabel>
                      </Status>
                    ) : (
                      <Status
                        variant="error"
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-xs inline-flex items-center gap-1"
                      >
                        <StatusIndicator />
                        <StatusLabel>Unavailable</StatusLabel>
                      </Status>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-500 px-2">Status : </span>
                    {(() => {
                      const status = meal.status;
                      const statusStyles: Record<string, string> = {
                        APPROVED: "bg-green-500 text-white",
                        PENDING: "bg-yellow-500 text-white",
                        REJECTED: "bg-red-500 text-white",
                      };
                      const variantMap: Record<string, string> = {
                        APPROVED: "success",
                        PENDING: "warning",
                        REJECTED: "error",
                      };
                      return (
                        <Status
                          variant={variantMap[status] as any  || "default"}
                          className={`px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 ${statusStyles[status] || "bg-gray-400 text-white"}`}
                        >
                          <StatusIndicator />
                          <StatusLabel> {status}</StatusLabel>
                        </Status>
                      );
                    })()}
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg mt-3 sm:mt-4">
                    {meal.description}
                  </p>
                </div>
              </section>

              {/* REVIEWS SECTION */}
              <section className="bg-white rounded-2xl shadow p-5 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Customer Reviews ({meal.totalReviews})
                </h2>
                {/* Rating Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div>
                    <div className="text-3xl sm:text-5xl font-bold text-orange-500">
                      {meal.avgRating !== undefined ? meal.avgRating.toFixed(1) : "0.0"}
                    </div>
                    <p className="text-gray-500 text-sm sm:text-base">Average Rating</p>
                  </div>
                  <div className="space-y-2">
                    {starCounts.map(({ star, count }) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="w-12 text-xs sm:text-sm">{star} star</span>
                        <div className="flex-1 h-2.5 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 transition-all"
                            style={{
                              width: `${meal.totalReviews ? (count / meal.totalReviews) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="w-6 text-xs sm:text-sm">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Individual Reviews */}
                <div className="space-y-6">
                  {meal.providerRating.totalReview === 0 && (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                  {meal.reviews.map((review: any) => (
                    <div key={review.id} className="border-t pt-5 flex flex-col gap-4 sm:flex-row">
                      <ReviewItem
                        user={userinfo}
                        review={review}
                        meal={meal}
                        activeReplyId={activeReplyId}
                        setActiveReplyId={setActiveReplyId}
                        totalLength={review.replies.length}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT SIDE - STICKY ORDER CARD */}
            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 flex flex-col gap-6">
                <div className="text-2xl sm:text-4xl font-extrabold text-orange-600">
                  ${meal.price?.toFixed(2)}
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 justify-between">
                  <Button
                    onClick={() => router.push("/cart")}
                    disabled={!meal.isAvailable}
                    className={`py-2 px-4 rounded-sm text-base sm:text-lg font-semibold transition ${meal.isAvailable
                      ? "bg-black hover:bg-gray-900 cursor-pointer text-white"
                      : "bg-gray-400 cursor-not-allowed text-white"
                    }`}
                  >
                    {meal.isAvailable ? "Order Now" : "Currently Unavailable"}
                  </Button>
                  <button
                    disabled={!meal.isAvailable}
                    onClick={() =>
                      addToCart({
                        id: meal.id as string,
                        mealid: meal.id as string,
                        name: meal.meals_name as string,
                        price: meal.price,
                        restaurantName: meal.provider.restaurantName,
                        deliverycharge: meal.deliverycharge ?? 0,
                        image: meal.image || defaultIamge,
                        isAvailable: meal.isAvailable,
                        quantity: 1,
                      })
                    }
                    className={`text-white px-4 py-2 rounded-lg transition hover:bg-gray-800 ${meal.isAvailable ? "cursor-pointer bg-black" : "cursor-not-allowed bg-black/50"}`}
                  >
                    Add to cart
                  </button>
                </div>

                {/* Provider */}
                <div className="border-t pt-5 sm:pt-6">
                  <h3 className="font-semibold mb-2">Provided By</h3>
                  <div className="flex items-center gap-4 justify-between flex-wrap">
                    <Link href={`/providers/${meal.provider?.id}`}>
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary shadow-md">
                        <Image
                          src={meal.provider.image || defaultIamge}
                          alt={meal.provider.restaurantName}
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        if (i < fullStars) {
                          return (
                            <Star key={i} className="w-4 text-amber-400 fill-amber-400" />
                          );
                        }
                        if (i === fullStars && hasHalfStar) {
                          return (
                            <StarHalf key={i} className="w-4 text-amber-400 fill-amber-400" />
                          );
                        }
                        return (
                          <Star key={i} className="w-4 text-gray-300" />
                        );
                      })}
                      <span className="text-xs sm:text-sm text-gray-500 ml-2">
                        ({meal.providerRating?.totalReview} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-2 space-y-1">
                    <div className="flex items-center flex-wrap gap-1.5">
                      <p className="text-gray-800">Restaurant:</p>
                      <p className="text-xs sm:text-sm text-gray-600 shadow-sm rounded-sm p-1">
                        {meal.provider?.restaurantName}
                      </p>
                    </div>
                    <div className="flex items-center flex-wrap gap-1.5">
                      <p className="text-gray-800">Address:</p>
                      <p className="text-xs sm:text-sm text-gray-600 shadow-sm rounded-sm p-1">
                        {meal.provider?.address}
                      </p>
                    </div>
                    <div className="flex items-center flex-wrap gap-1.5">
                      <p className="text-gray-800">Name:</p>
                      <p className="text-xs sm:text-sm text-gray-600 shadow-sm rounded-sm p-1">
                        {meal.provider.user.name}
                      </p>
                    </div>
                    <div className="flex items-center flex-wrap gap-1.5">
                      <p className="text-gray-800">Email:</p>
                      <p className="text-xs sm:text-sm text-gray-600 shadow-sm rounded-sm p-1">
                        {meal.provider.user.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-gray-800 text-xs sm:text-sm">isActive:</h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs sm:text-sm font-semibold ${meal.provider.user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {meal.provider.user.isActive ? (
                          <Status variant="success" className="bg-green-500 text-white inline-flex items-center">
                            <StatusIndicator />
                            <p className="ml-1">Active</p>
                          </Status>
                        ) : (
                          <Status variant="error" className="bg-red-400 text-white inline-flex items-center">
                            <StatusIndicator />
                            <p className="ml-1">Inactive</p>
                          </Status>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* meals form */}
            <div className="lg:col-span-1">
              <ReviewForm mealId={meal.id} />
            </div>
          </div>
 
        </div>
      </div>

    </div>
  )
}

export default SignleMealByid
