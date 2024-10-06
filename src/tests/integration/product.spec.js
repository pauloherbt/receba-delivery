import { describe, test, expect } from "@jest/globals";
import { createCategory, createProduct, createRestaurant } from "./helpers";
import { ProductRepository } from "../../domain/repositories/product-repository";
import qb from "../../db";

describe("should create a product", () => {
  beforeAll(async () => {
    await qb("product").delete();
  });

  afterEach(async () => {
    // Iniciar uma nova transação antes de cada teste
    await qb("product").delete();
    await qb("restaurant").delete();
  });
  afterAll(async () => {
    await qb.destroy();
  });

  test("should create a new Product ", async () => {
    const restaurant = await createRestaurant();
    const mockCategory = {
      name: "Sucos Doces",
      restaurant_id: restaurant.id,
    };
    const category = await createCategory(mockCategory);
    const mockProduct = {
      name: "Suco de uva",
      value: 55.2,
      category_id: category.id,
      restaurant_id: restaurant.id,
    };
    const result = await new ProductRepository().create(mockProduct);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("restaurant_id", restaurant.id);
    expect(result).toHaveProperty("category_id", category.id);
  });

  test("should delete a Product ", async () => {
    const restaurant = await createRestaurant();
    const mockCategory = {
      name: "Sucos Doces",
      restaurant_id: restaurant.id,
    };
    const category = await createCategory(mockCategory);
    const mockProduct = {
      name: "Suco de uva",
      value: 55.2,
      category_id: category.id,
      restaurant_id: restaurant.id,
    };
    const createdProduct = await createProduct(mockProduct);

    const result = await new ProductRepository().delete(createdProduct.id);
    expect(result).toBeDefined();
    expect((await qb('product').select("id").where({id:createdProduct.id}))).toEqual([]);
    expect((await qb('restaurant').select("id").where({id:restaurant.id}))[0]).toHaveProperty("id",restaurant.id);
    expect((await qb('category').select("id").where({id:category.id}))[0]).toHaveProperty("id",category.id);
  });

});
