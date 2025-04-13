// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

module.exports = {
  command: ["promote", "jadiadmin", "newking"],
  help: ["promote", "jadiadmin", "newking"].map(v => v + ' *[ 👑 Menjadikan member sebagai admin grup ]* '),
  tags: ["group"],
  group: true,
  admin: true,
  botAdmin: true,
  code: async (m, { conn, text }) => {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
        ? m.mentions[0]
        : false;

    if (!who)
      throw `*🚫 Perintah Gagal!*\n\n> Tag atau balas pesan member yang ingin dijadikan admin.`;

    let user = await conn.onWhatsApp(who);
    if (!user[0].exists)
      throw `*❌ Error!*\n\n> Nomor tersebut tidak terdaftar di WhatsApp.`;

    await conn
      .groupParticipantsUpdate(m.cht, [who], "promote")
      .then(() => {
        let name = who.split("@")[0];
        m.reply(
          `*✅ Promosi Berhasil!*\n\n> 🎉 Selamat kepada *@${name}* karena telah menjadi admin grup!\n\n📌 _Gunakan jabatan ini dengan bijak._`,
          { mentions: [who] },
        );
      })
      .catch(() => {
        m.reply(
          `*❌ Gagal Memproses!*\n\n> Pastikan bot memiliki hak admin untuk melakukan perubahan ini.`,
        );
      });
  },
};
