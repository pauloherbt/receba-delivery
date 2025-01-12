import { CategoryRepository } from "../../../domain/repositories/category-repository";
import { ProductRepository } from "../../../domain/repositories/product-repository";
import { RestaurantRepository } from "../../../domain/repositories/restaurant-repository";

export async function createRestaurant(mockedRestaurant) {
  const mockedDefault = {
    name: "Geleia Seca",
    address: "Rua Antunino Cunha - Bela Vista",
    image_url: "https://google.com",
  };
  return await new RestaurantRepository().createRestaurant(mockedRestaurant ?? mockedDefault);
}

export async function createCategory(mockedCategory) {
  return await new CategoryRepository().create(mockedCategory);
}
export async function createProduct(mockedProduct) {
  return await new ProductRepository().create(mockedProduct);
}
