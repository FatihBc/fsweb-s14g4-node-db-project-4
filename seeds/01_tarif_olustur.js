exports.seed = async function (knex) {
  await knex("adim_malzeme").del();
  await knex("adim").del();
  await knex("malzeme").del();
  await knex("tarif").del();

  await knex("tarif").insert([
    { tarif_id: 1, tarif_isim: "Menemen" },
    { tarif_id: 2, tarif_isim: "Pilav" },
    { tarif_id: 3, tarif_isim: "Kuru Fasulye" },
  ]);

  await knex("malzeme").insert([
    { malzeme_id: 1, malzeme_isim: "Domates" },
    { malzeme_id: 2, malzeme_isim: "Yumurta" },
    { malzeme_id: 3, malzeme_isim: "Soğan" },
  ]);

  await knex("adim").insert([
    {
      adim_id: 1,
      adim_sirasi: 1,
      adim_talimati: "Soğanı doğrayın",
      tarif_id: 1,
    },
    {
      adim_id: 2,
      adim_sirasi: 2,
      adim_talimati: "Domatesleri ekleyin",
      tarif_id: 1,
    },
    {
      adim_id: 3,
      adim_sirasi: 3,
      adim_talimati: "Yumurtaları kırın",
      tarif_id: 1,
    },
  ]);

  await knex("adim_malzeme").insert([
    { adim_malzeme_id: 1, adim_id: 1, malzeme_id: 3, miktar: 1, sirasi: 1 },
    { adim_malzeme_id: 2, adim_id: 2, malzeme_id: 1, miktar: 2, sirasi: 1 },
    { adim_malzeme_id: 3, adim_id: 3, malzeme_id: 2, miktar: 3, sirasi: 1 },
  ]);
};
