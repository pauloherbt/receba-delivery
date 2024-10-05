import qb from "../../../db";

export class RestaurantRepository{
    async createRestaurant(data) {
        return await qb('restaurant').insert(data,"id");
    }
}