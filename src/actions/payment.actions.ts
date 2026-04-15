"use server"

import { PaymentService } from "@/services/payment.service";

export const getAllPayments = async (params?: Record<string, any>) => {
    const response = await PaymentService.getAllPayments(params);
    return response;
  };