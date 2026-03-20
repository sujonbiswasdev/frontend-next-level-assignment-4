import OrderDetails from '@/components/modules/orders/orderdetails';
import NotFound from '@/components/Notfound';
import { OrderService } from '@/services/order/order';


export async function generateStaticParams() {
  const data = await OrderService.getownorder();
  const orders = Array.isArray(data?.data) ? data.data : [];
  return orders.slice(0, 3).map((item: any) => ({
    id: item.id,
  }));
}


const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

  const { id } = await params;
  const res = await OrderService.getorderbyid(id);
  if (!res.data || !res.success) return NotFound();

  const order = res.data;
  return (
    <div>
      <OrderDetails orderdetails={order} />
    </div>
  )
}

export default OrderDetailsPage