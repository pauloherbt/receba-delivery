import qb from "../../../db";

export class RestaurantRepository{
    async createRestaurant(data) {
        return (await qb('restaurant').insert(data,"id"))[0];
    }
    async delete(restaurant_id){
        return (await qb('restaurant').delete("id").where({id:restaurant_id}))[0];
    }
}