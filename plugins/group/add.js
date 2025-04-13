// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

const bail = require("baileys");
const {
    generateWAMessageFromContent,
    proto,
    toNumber
} = bail;

module.exports = {
    help: ["add", "tambahkan"].map(v => v + ' *[ Menambahkan anggota ke grup ]* '),
    tags: ["group"],
    command: ["add", "tambahkan"],
    group: true,
    admin: true,
    botAdmin: true,
    code: async (m, {
        conn,
        text,
        Func
    }) => {
        const input = text ? text : m.quoted ? m.quoted.sender : m.mentions[0]
        if (!input) {
            throw "❗ *Format Salah*\nKirim perintah ini dengan format:\n> Ketik nomor pengguna yang ingin ditambahkan\n> Atau reply pesan pengguna dengan perintah ini.";
        }

        const p = await conn.onWhatsApp(input.trim());
        console.log(p);
        if (!p[0].exists) throw "⚠️ Pengguna tidak terdaftar di WhatsApp"
        const jid = p[0].jid
        const member = m.metadata.participants.find((u) => u.id === jid);
        if (member) {
            return m.reply("⚠️ Pengguna tersebut sudah menjadi anggota grup ini.");
        }

        const resp = await conm.groupParticipantsUpdate(m.cht, [jid], "add");
        for (let res of resp) {
            if (res.status === 421) {
                m.reply(
                    "⚠️ Tidak dapat menambahkan pengguna tersebut. Mereka telah membatasi undangan ke grup.",
                );
            } else if (res.status === 408) {
                await m.reply(
                    `✅ Undangan grup berhasil dikirim ke @${parseInt(res.jid)} karena pengguna baru saja keluar dari grup.`,
                );
                await conn.sendMessage(res.jid, {
                    text: "✨ Anda diundang kembali ke grup ini: https://chat.whatsapp.com/" +
                        (await conn.groupInviteCode(m.cht)),
                });
            } else if (res.status === 403) {
                await m.reply(
                    `✅ Undangan grup berhasil dikirim ke @${parseInt(res.jid)}.`,
                );
                const {
                    code,
                    expiration
                } = res.content.content[0].attrs;
                const pp = await conn.profilePictureUrl(m.cht).catch(() => null);
                const gp = await Func.fetchBuffer(pp);

                const msgs = generateWAMessageFromContent(
                    res.jid,
                    proto.Message.fromObject({
                        groupInviteMessage: {
                            groupJid: m.cht,
                            inviteCode: code,
                            inviteExpiration: toNumber(expiration),
                            groupName: m.metadata.subject,
                            jpegThumbnail: gp || null,
                            caption: `🌟 Hai @${res.jid.split("@")[0]}!\nAnda telah diundang oleh salah satu admin grup *${m.metadata.subject}*. Klik tombol di bawah untuk bergabung kembali!`,
                        },
                    }), {
                        userJid: conn.user.jid
                    },
                );

                await conn.copyNForward(jid, msgs);
            }
        }
    },
};
