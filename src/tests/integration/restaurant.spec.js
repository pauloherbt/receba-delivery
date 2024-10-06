import qb from "../../db";
import { RestaurantRepository } from "../../domain/repositories/restaurant-repository";
import { afterEach, beforeAll, expect } from "@jest/globals";

describe("restaurant creation", () => {
  beforeAll(async () => {
    await qb("restaurant").delete();
  });

  afterEach(async () => {
    // Iniciar uma nova transação antes de cada teste
    await qb("restaurant").delete();
  });
  
  afterAll(async ()=>{
    await qb.destroy();
  })

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
    const restRepo = new RestaurantRepository();
    try{
      await restRepo.createRestaurant(mockedRestaurant)
    }
    catch(err){
      expect(err).toBeDefined();
    }
  });
});
