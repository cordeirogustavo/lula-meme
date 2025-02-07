import { ISupermarketService } from "./supermarket.interface";

export class SupermarketService implements ISupermarketService {
  constructor() {}

  goToSupermarket(location: string): boolean {
    console.log(`Go to supermarket in ${location}`);
    return true;
  }

  everyoneHasConscience(hasConscience: boolean): boolean {
    return hasConscience;
  }

  reducePrice(willReduce: boolean): boolean {
    if (willReduce) {
      console.log("Supermarket will reduce product price.");
    } else {
      console.log(
        "Supermarket will not reduce product price. The product will expire. LULA WINS!!"
      );
    }
    return willReduce;
  }
}
