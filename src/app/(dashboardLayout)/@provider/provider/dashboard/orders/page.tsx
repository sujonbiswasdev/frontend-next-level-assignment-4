import { getownorder } from '@/actions/order.action';
import OrderTable from '@/components/modules/orders/orderTable';
import Notfounddata from '@/components/Notfounddata';
import { TResponseOrderData } from '@/types/order/order.type';
import { Ipagination } from '@/types/pagination.type';
import React from 'react'

const OrderHistory = async() => {

    const res = await getownorder();
      if (!res.data || !res.success) {
    return (
      <Notfounddata content='No orders found.' btntext='dashboard' path='/provider/dashboard' emoji="📦" />
 
    );
  }
      const orders = res.data as TResponseOrderData[]
      const pagination=res.pagination as Ipagination
  return (
    <div>
      <OrderTable pagination={pagination} initialorder={orders}/>
    </div>
  )
}

export default OrderHistory
