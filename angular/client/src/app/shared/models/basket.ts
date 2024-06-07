export interface Basket {
    id: string
    items: BasketItem[]
  }
  
export interface BasketItem {
  id: number
  productName: string
  price: number
  quanitity: number
  pictureUrl: string
  brand: string
  type: string
}
  