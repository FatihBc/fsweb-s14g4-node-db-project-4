exports.up = function (knex) {
  return knex.schema.createTable("adim", (table) => {
    table.increments("adim_id").primary();
    table.integer("adim_sirasi").notNullable();
    table.string("adim_talimati").notNullable();
    table
      .integer("tarif_id")
      .unsigned()
      .notNullable()
      .references("tarif_id")
      .inTable("tarif")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("adim");
};
