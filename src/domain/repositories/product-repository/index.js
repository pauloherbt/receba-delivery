import qb from "../../../db";

export class ProductRepository{

    async create(data) {
        return (await qb('product').insert(data,["id","restaurant_id","category_id"]))[0];
    }
    async delete(productId){
        return (await qb('product').delete(["id","restaurant_id","category_id"]).where({id:productId}))[0];
    }
}