import readline from "readline";
import { ProductService, SupermarketService } from "./services";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getTrueOrFalse = async (query: string): Promise<boolean> => {
  const answer = (await askQuestion(query)).toUpperCase();
  return answer === "Y";
};

const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) =>
    rl.question(query, (answer) => resolve(answer.toUpperCase()))
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
  const city = await askQuestion("Enter the city: ");
  const wentToSupermarket = supermarketService.goToSupermarket(city);
  const productName = await askQuestion("Enter the product name: ");
  const isExpensive = await getTrueOrFalse(
    `Suspect is '${productName}' expensive? Y/N: `
  );
  if (wentToSupermarket) {
    if (!isExpensive) {
      return finallyStrategy(productService.buyProduct(productName, true));
    }
    const hasConscience = await getTrueOrFalse(
      "Everyone has conscience? Y/N: "
    );
    if (
      supermarketService.everyoneHasConscience(hasConscience) &&
      !productService.buyProduct(productName, false)
    ) {
      let tryToReducePrice = await getTrueOrFalse("Try to reduce price? Y/N: ");

      while (!tryToReducePrice) {
        if (supermarketService.reducePrice(tryToReducePrice)) {
          return productService.productWillExpire();
        }
        tryToReducePrice = await getTrueOrFalse("Try to reduce price? Y/N: ");
      }
      return finallyStrategy(supermarketService.reducePrice(tryToReducePrice));
    }
  }
  return finallyStrategy(true);
};

(async () => {
  await reducePriceStrategy();
})();
