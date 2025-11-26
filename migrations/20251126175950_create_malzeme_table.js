exports.up = function (knex) {
  return knex.schema.createTable("malzeme", (table) => {
    table.increments("malzeme_id").primary();
    table.string("malzeme_isim").notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("malzeme");
};
