// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

const fs = require("node:fs");

module.exports = {
    help: ["scrape", "skrep", "scraper"].map(v => v + " *[ Untuk Pengelolaan Scraper bot ]* "),
    tags: ["owner"],
    command: ["scrape", "skrep", "scraper"],
    owner: true,
    code: async (m, {
        sock,
        config,
        plugin,
        Func,
        text
    }) => {
    let src = await scraper.list();
    if (!text)
      throw `> *- 乂 Cara Penggunaan*\n> *\`--get\`* Untuk mengambil Scrape\n> *\`--add\`* Untuk menambahkan Scrape\n> *\`--delete\`* Untuk menghapus Scrape\n\n> *- 乂 List Scraper yang tersedia :*\n${Object.keys(
        src,
      )
        .map((a, i) => `> *${i + 1}.* ${a}`)
        .join("\n")}`;

    if (text.includes("--get")) {
      let input = text.replace("--get", "").trim();
      if (!isNaN(input)) {
        let list = Object.keys(src);
        try {
          let file = scraper.dir + "/" + list[parseInt(input) - 1] + ".js";
          m.reply(fs.readFileSync(file.trim()).toString());
        } catch (e) {
          m.reply(
            `> Scrape ${list[parseInt(input) - 1]} Tidak ditemukan, cek kembali list Scrape yang kamu simpan`,
          );
        }
      } else {
        try {
          let file = scraper.dir + "/" + input + ".js";
          m.reply(fs.readFileSync(file.trim()).toString());
        } catch (e) {
          m.reply(
            `> Scrape ${input} Tidak ditemukan, cek kembali list Scrape yang kamu simpan`,
          );
        }
      }
    } else if (m.text.includes("--add")) {
      if (!m.quoted) throw "> Reply scrape yang mau kamu simpan";
      let input = m.text.replace("--add", "").trim();
      try {
        let file = scraper.dir + "/" + input + ".js";
        fs.writeFileSync(file.trim(), m.quoted.body);
        m.reply("> Berhasil Menyimpan scrape : " + input);
      } catch (e) {
        m.reply(`> Gagal menyimpan scrape, coba lagi`);
      }
    } else if (text.includes("--delete")) {
      let input = text.replace("--delete", "").trim();
      if (!isNaN(input)) {
        let list = Object.keys(src);
        try {
          let file = scraper.dir + "/" + list[parseInt(input) - 1] + ".js";
          fs.unlinkSync(file.trim());
          m.reply("> Scraper Berhasil dihapus");
        } catch (e) {
          m.reply(
            `> Scrape ${list[parseInt(input) - 1]} Tidak ditemukan, cek kembali list Scrape yang kamu simpan`,
          );
        }
      } else {
        try {
          let file = scraper.dir + "/" + input + ".js";
          fs.unlinkSync(file.trim());
          m.reply("> Scraper Berhasil dihapus");
        } catch (e) {
          m.reply(
            `> Scrape ${input} Tidak ditemukan, cek kembali list Scrape yang kamu simpan`,
          );
        }
      }
    }
  },
};
