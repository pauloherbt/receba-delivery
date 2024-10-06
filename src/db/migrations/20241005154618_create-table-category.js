/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("category", (tb) => {
    tb.uuid("id",{primaryKey:true}).defaultTo(knex.fn.uuid());
    tb.string("name").notNullable();
    tb.timestamps({useTimestamps:true,defaultToNow:true});
    tb.uuid("restaurant_id").notNullable().references("restaurant.id").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("category");
};
