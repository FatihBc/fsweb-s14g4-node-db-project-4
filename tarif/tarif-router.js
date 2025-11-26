const express = require("express");
const router = express.Router();
const db = require("../db"); // Burada 'db' olarak import et
const { idyeGoreTarifGetir } = require("../data-access");

router.get("/:id", async (req, res) => {
  try {
    const tarif = await idyeGoreTarifGetir(req.params.id);
    if (!tarif) {
      return res.status(404).json({ message: "Tarif bulunamadı" });
    }
    res.json(tarif);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { tarif_isim, adimlar } = req.body;

  try {
    await db.transaction(async (trx) => {
      const [tarif_id] = await trx("tarif").insert({ tarif_isim });

      for (const adim of adimlar) {
        const [adim_id] = await trx("adim").insert({
          adim_sirasi: adim.adim_sirasi,
          adim_talimati: adim.adim_talimati,
          tarif_id,
        });

        if (adim.icindekiler) {
          for (const malzeme of adim.icindekiler) {
            await trx("adim_malzeme").insert({
              adim_id,
              malzeme_id: malzeme.malzeme_id,
              miktar: malzeme.miktar,
              sirasi: malzeme.sirasi || 1,
            });
          }
        }
      }

      res.status(201).json({ message: "Tarif başarıyla eklendi", tarif_id });
    });
  } catch (err) {
    res.status(500).json({ message: "Tarif eklenemedi", error: err.message });
  }
});

module.exports = router;
