exports.up = function (knex) {
  return knex.schema.createTable("tarif", (table) => {
    table.increments("tarif_id").primary();
    table.string("tarif_isim").notNullable().unique();
    table.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tarif");
};
