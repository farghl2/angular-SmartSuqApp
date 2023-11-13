export interface GoodsModel {
      title?:string, price?:number,  category?:string,  imageUrl?:string
}

export interface goodId extends GoodsModel {
     id?:string;
}
