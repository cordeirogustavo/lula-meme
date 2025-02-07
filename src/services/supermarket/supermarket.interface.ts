export interface ISupermarketService {
  goToSupermarket(location: string): boolean;
  everyoneHasConscience(hasConscience: boolean): boolean;
  reducePrice(willReduce: boolean): boolean;
}
