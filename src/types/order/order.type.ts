export interface IOrderItem {
  mealId: string
  price: number
  quantity: number
}

export interface ICreateOrderPayload {
  address: string
  phone: string
  first_name:string
  last_name:string
  items: IOrderItem[]
}
