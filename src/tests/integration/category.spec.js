import qb from "../../db";
import { CategoryRepository } from "../../domain/repositories/category-repository";
import { createRestaurant } from "./helpers";
import { afterAll, afterEach, beforeAll, expect } from "@jest/globals";

describe("category creation", () => {
  beforeAll(async () => {
    await qb("category").delete();
  });

  afterEach(async () => {
    // Iniciar uma nova transação antes de cada teste
    await qb("category").delete();
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
});
