import { IProductService } from "./product.interface";

export class ProductService implements IProductService {
  constructor() {}

  buyProduct(product: string, buy: boolean): boolean {
    if (buy) {
      console.log(`Buy ${product}`);
    } else {
      console.log(`Do not buy ${product}`);
    }
    return buy;
  }

  isExpensive(product: string, isExpensive: boolean): boolean {
    console.log(`Suspect Is ${product} expensive? ** ${isExpensive} **`);
    return isExpensive;
  }

  productWillExpire(): boolean {
    console.log(`Product will expire?`);
    return true;
  }
}
