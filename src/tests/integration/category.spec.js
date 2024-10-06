import qb from "../../db";
import { CategoryRepository } from "../../domain/repositories/category-repository";
import { createCategory, createProduct, createRestaurant } from "./helpers";
import { afterAll, afterEach, beforeAll, expect } from "@jest/globals";

describe("category creation", () => {
  beforeAll(async () => {
    await qb("category").delete();
  });

  afterEach(async () => {
    await qb("category").delete();
    await qb("restaurant").delete();
  });
  afterAll(async () => {
    await qb.destroy();
  });

  test("should create a  new category", async () => {
    const restaurant = await createRestaurant();
    const mockedCategory = {
      name: "Outros",
      restaurant_id: restaurant.id,
    };
    const catRepo = new CategoryRepository();
    const catResult = await catRepo.create(mockedCategory);
    expect(catResult).toBeDefined();
    expect(catResult).toHaveProperty("id");
    expect(catResult.restaurant_id).toBe(restaurant.id);
  });

  test("should not  create a  new category", async () => {
    const mockedCategory = {
      name: "Outros",
    };
    let result;
    try {
      result = await new CategoryRepository().create(mockedCategory);
    } catch (err) {
      expect(err).toBeDefined();
    }
    expect(result).toBeUndefined();
  });

  test("should delete a category with products attached", async () => {
    const restaurant = await createRestaurant();
    const mockedCategory = {
      name: "Outros",
      restaurant_id: restaurant.id,
    };
    const createdCategory = await createCategory(mockedCategory);
    const mockedProduct = {
      name:"Pastel",
      value:50,
      restaurant_id:restaurant.id,
      category_id: createdCategory.id
    }
    const createdProduct = await createProduct(mockedProduct);
    await new CategoryRepository().delete(createdCategory.id);
    expect(await qb('category').select('id').where({id:createdCategory.id})).toEqual([]);
    expect(await qb('product').select('id').where({id:createdProduct.id})).toEqual([]);
    expect(await qb('restaurant').select('id').where({id:restaurant.id}));
  });

});
