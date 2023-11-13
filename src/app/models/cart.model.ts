
export interface Cart{
  // [x: string]: number
  items:Array<CartItem>
}
export interface CartItem {
  quantity:number,
  id:number,
  amount: number,
  imageUrl:string,
  title:string
}
