// data-access.js
const db = require("./db");

async function idyeGoreTarifGetir(tarif_id) {
  // 1. Tarif bilgisi
  const tarif = await db("tarif").where({ tarif_id }).first();
  if (!tarif) return null;

  // 2. Adımlar
  const adimlar = await db("adim").where({ tarif_id }).orderBy("adim_sirasi");

  // 3. Her adım için malzemeleri ekle
  for (let adim of adimlar) {
    const malzemeler = await db("adim_malzeme as am")
      .join("malzeme as m", "am.malzeme_id", "m.malzeme_id")
      .select("m.malzeme_id", "m.malzeme_isim", "am.miktar", "am.sirasi")
      .where("am.adim_id", adim.adim_id)
      .orderBy("am.sirasi");

    adim.icindekiler = malzemeler;
  }

  return { ...tarif, adimlar };
}

module.exports = { idyeGoreTarifGetir };
