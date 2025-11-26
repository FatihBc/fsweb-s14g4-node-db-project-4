exports.up = function (knex) {
  return knex.schema.createTable("adim_malzeme", (table) => {
    table.increments("adim_malzeme_id").primary();
    table
      .integer("adim_id")
      .unsigned()
      .notNullable()
      .references("adim_id")
      .inTable("adim")
      .onDelete("CASCADE");
    table
      .integer("malzeme_id")
      .unsigned()
      .notNullable()
      .references("malzeme_id")
      .inTable("malzeme")
      .onDelete("CASCADE");
    table.float("miktar").notNullable();
    table.integer("sirasi").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("adim_malzeme");
};
