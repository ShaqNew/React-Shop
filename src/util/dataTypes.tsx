
export interface IItem {
    title: string
    image: string
    price: number
    id: number
    description: string
  }
  
export type TItemList = IItem[]
  
export interface IState {
    wishlistItems: TItemList,
    basketListItems: TItemList
  }
  