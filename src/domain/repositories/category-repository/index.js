import qb from "../../../db";

export class CategoryRepository {
  async create(data) {
    return (await qb("category").insert(data, ["id","restaurant_id"]))[0];
  }
}
