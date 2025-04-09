// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

module.exports = {
    help: ["self"].map(v => v + " *[ Ubah bot menjadi mode senyap ]* "),
    tags: ["owner"],
    command: ["self"],
    owner: true,
    code: async (m, {
        sock,
        config,
        plugin,
        Func,
        text
    }) => {
        try {
            pp = await sock.profilePictureUrl(m.sender, 'image')
        } catch (e) {
            pp = "https://file.btch.rf.gd/file/dlhruelxlqwdjeq28ilr.jpg"
            try {
                pp = "https://files.catbox.moe/px1m46.jpg"
            } catch (e) {}
        }
        const args = m.args
        if (!text)
            return sock.sendAliasMessage(m.cht, {
                text: `ℹ️ Select Option Number
> • 1. Mengaktifkan Self
> • 2. Mematikan Self`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    isForwarded: !0,
                    forwardingScore: 127,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: config.saluran,
                        newsletterName: Func.Styles(`${config.name} By Creator: ${config.ownername}`),
                        serverMessageId: -1
                    },
                    externalAdReply: {
                        title: Func.Styles(`Hai ${m.pushName} Apakabar Syg🥰`),
                        body: Func.Styles(`${m.pushName}`),
                        mediaType: 1,
                        thumbnailUrl: pp,
                        sourceUrl: "https://www.tiktok.com/@leooxzy_ganz/",
                    }
                }
            }, [{
                alias: '1',
                response: m.prefix + m.command + ' 1'
            }, {
                alias: '2',
                response: m.prefix + m.command + ' 2'
            }], m);
        if (args[0] === '1') {
            db.list().settings.self = true
            m.reply('Self Di Aktifkan')
        } else if (args[0] === '2') {
            db.list().settings.self = false
            m.reply('Self Di Matikan')
        }
    }
};
