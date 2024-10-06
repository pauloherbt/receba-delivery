/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("product",(tb)=>{
    tb.uuid('id',{primaryKey:true}).defaultTo(knex.fn.uuid());
    tb.string('name').notNullable();
    tb.decimal('value').notNullable();
    tb.string('image_url').nullable();
    tb.timestamps(true,true);
    tb.string("internal_code").nullable();
    tb.uuid('restaurant_id').notNullable().references("restaurant.id").onDelete('CASCADE');;
    tb.uuid('category_id').notNullable().references("category.id").onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("product");
};