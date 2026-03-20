'use server'
import { IModerateData, reviewService } from "@/services/review";
import { IUpdatereviewData } from "@/types/reviews.type";

export const createReviewAction = async (mealid:string,data:any) => {
  return await reviewService.createReview(mealid,data);
};

export const deleteReviewAction = async (reviewId: string) => {
  return await reviewService.deleteReview(reviewId);
};

export const moderateReviewAction = async (reviewId: string, data: IModerateData) => {
  return await reviewService.moderateReview(reviewId, data);
};

export const reviewUpdate = async (reviewId: string, data:IUpdatereviewData) => {
  return await reviewService.reviewUpdate(reviewId, data);
};

export const getAllreview = async () => {
  return await reviewService.getAllReviews();
};