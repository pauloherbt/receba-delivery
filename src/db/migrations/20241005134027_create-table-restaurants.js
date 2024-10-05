/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("restaurant",(tb)=>{
        tb.uuid("id",{primaryKey:true}).defaultTo(knex.fn.uuid());
        tb.string("name").notNullable();
        tb.string("address").notNullable();
        tb.string("image_url").nullable();
        tb.timestamps({useTimestamps:true,defaultToNow:true})
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("restaurants");
};
