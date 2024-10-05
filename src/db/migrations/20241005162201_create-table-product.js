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
    tb.uuid('restaurant_id').notNullable();
    tb.uuid('category_id').notNullable();
    tb.foreign("restaurant_id").references("restaurant.id");
    tb.foreign("category_id").references("category.id");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("product");
};