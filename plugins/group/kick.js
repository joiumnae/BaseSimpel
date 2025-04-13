// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

module.exports = {
  help: ["kick", "kik", "dor", "tendang"].map(v => v + ' *[ 🔴 Mengeluarkan anggota dari grup ]* '),
  tags: ["group"],
  command: ["kick", "kik", "dor", "tendang"],
  group: true,
  admin: true,
  botAdmin: true,
  code: async (m, { conn, text }) => {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
        ? m.mentions[0]
        : false;

    if (!who) {
      throw `*⚠️ Perintah Tidak Lengkap!*\n\n> *Gunakan salah satu cara berikut:*\n  • Tag anggota dengan: @username\n  • Balas pesan anggota yang ingin dikeluarkan.\n\n📌 _Pastikan kamu memiliki hak sebagai admin grup._`;
    }

    let user = await sock.onWhatsApp(who);
    if (!user[0].exists) {
      throw `*❌ Anggota Tidak Ditemukan!*\n\n> Akun WhatsApp ini tidak terdaftar atau sudah tidak aktif.`;
    }

    await conn
      .groupParticipantsUpdate(m.cht, [who], "remove")
      .then(() => {
        m.reply(
          `*✅ Berhasil!* 🥾\n\n> @${who.split("@")[0]} telah dikeluarkan dari grup.\n\n📌 _Gunakan fitur ini untuk menjaga kenyamanan grup._`,
        );
      })
      .catch((err) => {
        m.reply(
          `*❌ Gagal!*\n\n> Tidak dapat mengeluarkan @${who.split("@")[0]} dari grup.\n📌 _Pastikan bot memiliki hak admin untuk melakukan perubahan ini._`,
        );
      });
  },
};
