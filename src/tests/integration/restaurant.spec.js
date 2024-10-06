import qb from "../../db";
import { RestaurantRepository } from "../../domain/repositories/restaurant-repository";
import { afterEach, beforeAll, beforeEach, expect, test } from "@jest/globals";
import { createCategory, createRestaurant } from "./helpers";

describe("restaurant creation", () => {
  beforeAll(async () => {
    await qb("restaurant").delete();
  });

  afterEach(async () => {
    // Iniciar uma nova transação antes de cada teste
    await qb("restaurant").delete();
  });

  afterAll(async () => {
    await qb.destroy();
  });

  test("should create a  new Restaurant", async () => {
    const mockedRestaurant = {
      name: "Geleia Seca",
      address: "Rua Antunino Cunha - Bela Vista",
      image_url: "https://google.com",
    };
    const restRepo = new RestaurantRepository();
    const result = await restRepo.createRestaurant(mockedRestaurant);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("id");
  });

  test("should not  create a  new Restaurant when invalid fields", async () => {
    const mockedRestaurant = {
      address: "Rua Antunino Cunha - Bela Vista",
      image_url: "https://google.com",
    };
    try {
      await createRestaurant(mockedRestaurant);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  test("should delete a restaurant with no category associated", async () => {
    const restaurant = await createRestaurant();
    const result = await new RestaurantRepository().delete(restaurant.id);
    expect(result).toHaveProperty("id", restaurant.id);
    expect(
      await qb("restaurant").select().where({ id: restaurant.id })
    ).toEqual([]);
  });

  test("should delete a restaurant with category associated", async () => {
    const restaurant = await createRestaurant();
    const category = await createCategory({
      name: "Sucos",
      restaurant_id: restaurant.id,
    });
    const result = await new RestaurantRepository().delete(restaurant.id);
    expect(result).toHaveProperty("id", restaurant.id);
    expect(
      await qb("restaurant").select().where({ id: restaurant.id })
    ).toEqual([]);
    expect(await qb("category").select().where({ id: category.id })).toEqual(
      []
    );
  });

  test("should delete a restaurant with many category associated", async () => {
    const restaurant = await createRestaurant();
    //const category = await ;
    const cat = await Promise.all([
      createCategory({ name: "Sucos", restaurant_id: restaurant.id }),
      createCategory({ name: "Tortas", restaurant_id: restaurant.id }),
      createCategory({ name: "Pãoes", restaurant_id: restaurant.id }),
    ]);
    const idArray = cat.map(({ id }) => id);

    const result = await new RestaurantRepository().delete(restaurant.id);
    expect(result).toHaveProperty("id", restaurant.id);
    expect(
      await qb("restaurant").select().where({ id: restaurant.id })
    ).toEqual([]);
    expect(await qb("category").select().whereIn("id", idArray)).toEqual([]);
  });
});
