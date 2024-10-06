import qb from "../../../db";

export class ProductRepository{

    async create(data) {
        return (await qb('product').insert(data,["id","restaurant_id","category_id"]))[0];
    }
}