import readline from "readline";
import { ProductService, SupermarketService } from "./services";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) =>
    rl.question(query, (answer) => resolve(answer))
  );
};

const finallyStrategy = (result: boolean): boolean => {
  console.log("Strategy works successfully!! LULA WINS!!");
  rl.close();
  return result;
};

const reducePriceStrategy = async (): Promise<boolean> => {
  console.log("Starting Lula Strategy");

  const productService = new ProductService();
  const supermarketService = new SupermarketService();

  const city = (await askQuestion("Enter the city: ")).toUpperCase();
  const wentToSupermarket = supermarketService.goToSupermarket(city);

  const productName = (
    await askQuestion("Enter the product name: ")
  ).toUpperCase();
  const isExpensive =
    (
      await askQuestion(`Suspect is '${productName}' expensive? Y/N: `)
    ).toUpperCase() === "Y";
  if (wentToSupermarket) {
    if (!isExpensive) {
      return finallyStrategy(productService.buyProduct(productName, true));
    }
    const hasConscience =
      (await askQuestion("Everyone has conscience? Y/N: ")).toUpperCase() ===
      "Y";
    if (
      supermarketService.everyoneHasConscience(hasConscience) &&
      !productService.buyProduct(productName, false)
    ) {
      let tryToReducePrice =
        (await askQuestion("Try to reduce price? Y/N: ")).toUpperCase() === "Y";

      while (!tryToReducePrice) {
        if (supermarketService.reducePrice(tryToReducePrice)) {
          return productService.productWillExpire();
        }
        tryToReducePrice =
          (await askQuestion("Try to reduce price? Y/N: ")).toUpperCase() ===
          "Y";
      }

      return finallyStrategy(supermarketService.reducePrice(tryToReducePrice));
    }
  }
  return finallyStrategy(true);
};

(async () => {
  await reducePriceStrategy();
})();
