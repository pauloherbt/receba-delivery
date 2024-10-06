import qb from "../../../db";

export class CategoryRepository {
  async create(data) {
    return (await qb("category").insert(data, ["id","restaurant_id"]))[0];
  }
  async delete(category_id){
    return (await qb("category").delete(["id","restaurant_id"]).where({id:category_id}))[0];
  }
}
