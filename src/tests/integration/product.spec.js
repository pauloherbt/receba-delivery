import {describe,test,expect} from "@jest/globals";
import { createCategory, createRestaurant } from "./helpers";
import { ProductRepository } from "../../domain/repositories/product-repository";
import qb from "../../db";
describe("should create a product", ()=>{

    beforeAll(async () => {
        await qb("product").delete();
      });
    
      afterEach(async () => {
        // Iniciar uma nova transação antes de cada teste
        await qb("product").delete();
      });
      afterAll(async () => {
        await qb.destroy();
      });

    test("should create a new Product ", async () =>{
        const restaurant = await createRestaurant();
        const mockCategory = {
            name:"Sucos Doces",
            restaurant_id:restaurant.id
        } 
        const category = await createCategory(mockCategory);
        const mockProduct = {
            name:"Suco de uva",
            value: 55.2,
            category_id:category.id,
            restaurant_id:restaurant.id,
        }
        const result = await new ProductRepository().create(mockProduct);
        expect(result).toBeDefined();
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("restaurant_id",restaurant.id);
        expect(result).toHaveProperty("category_id",category.id);
    })
})