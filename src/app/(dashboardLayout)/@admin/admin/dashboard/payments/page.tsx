import { getAllPayments } from '@/actions/payment.actions';
import PaymentContent from '@/components/modules/payment/PaymentContent';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ErrorFallback from '@/components/shared/ErrorFallback';
import { getSession } from '@/services/auth.service';
import { IGetMealData } from '@/types/meals.type';
import { TResponseOrderData } from '@/types/order/order.type';
import { Ipagination } from '@/types/pagination.type';
import { TResponsePayment } from '@/types/payment.type';
import { TUser } from '@/types/user.type';

import React from 'react'


const PaymentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = await searchParams;
  const userinfo = await getSession();
  if (!userinfo || !userinfo.data || !userinfo.success) {
    return (
      <ErrorFallback
        title="Authentication Error"
        message="You must be signed in to view payment information."
      />
    );
  }
  const role = userinfo.data.role;
  const payments = await getAllPayments(search);
  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback title="Loading payments failed" message="Something went wrong while loading payments." />}>
        <PaymentContent
          pagination={payments.pagination as Ipagination}
          payments={payments.data as TResponsePayment<{ meal:IGetMealData; order: TResponseOrderData ,user:TUser}>[] || []}
          role={role as string}
        />
      </ErrorBoundary>
    </div>
  );
};

export default PaymentPage;