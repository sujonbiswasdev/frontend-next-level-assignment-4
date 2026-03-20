import { getownorder } from '@/actions/order.action';
import CustomerOrderTable from '@/components/modules/orders/customerordertable'
import { IGetOrderData } from '@/types/order/order.type';

const MyOrders =async () => {
     const res = await getownorder();
       if (!res.data ||!res.success) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  const orders = res.data as IGetOrderData[];
  return (
    <div className=''>
     <CustomerOrderTable initialorder={orders}/>
    </div>
  )
}

export default MyOrders
