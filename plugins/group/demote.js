// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

module.exports = {
  command: ["demote", "jadimember"],
  tags: ["group"],
  help: ["demote", "jadimember"].map(v => v + ' *[ Untuk mengubah admin menjadi member ]* '),
  group: true,
  admin: true,
  botAdmin: true,
  code: async (m, { conn, text }) => {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
        ? m.mentions[0]
        : false;
    if (!who) throw "> Tag/Balas pesan member yang mau di demote";
    let user = await conn.onWhatsApp(who);
    if (!user[0].exists) throw "> Member tidak terdaftar di WhatsApp";
    await conn
      .groupParticipantsUpdate(m.cht, [who], "demote")
      .then((a) => m.reply("Jabatan mu turun king😹"));
  },
};
