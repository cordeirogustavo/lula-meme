export interface IProductService {
  buyProduct(product: string, buy: boolean): boolean;
  isExpensive(product: string, isExpensive: boolean): boolean;
  productWillExpire(): boolean;
}
