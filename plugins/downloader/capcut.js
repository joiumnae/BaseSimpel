// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let axios = require('axios');

let handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw '⚠️Mau Link/Query !'
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    let result = text.match(urlRegex);
    if (result) {
        if (!/www.capcut.net/.test(text)) throw '⚠️Mana Link Url Nya !'
        const {
            data: download
        } = await axios.get('https://api.vreden.my.id/api/capcutdl', {
            params: {
                url: text
            }
        });
        if (!download.result) throw '⚠️Maaf Yg Anda Download Gagal';
        conn.sendMessage(m.chat, {
            video: {
                url: download.result.url
            },
            caption: download.result.title
        }, {
            quoted: m
        });
    } else {
        const {
            data: searchcc
        } = await axios.get('https://api.vreden.my.id/api/search/capcut', {
            params: {
                query: text
            }
        });
        if (!searchcc.result.media && !searchcc.result.media.length > 0) throw '⚠️Maaf Yg Anda Search Tidak Di Temukan';
        const random = searchcc.result.media[Math.floor(Math.random() * searchcc.result.media.length)];
        let cap = `🔍 Search Capcut
> • *Title:* ${random.templates.title || ''}
> • *Id:* ${random.templates.id || ''}
> • *Duration:* ${random.templates.duration | ''}
> • *Short_Title:* ${random.templates.short_titlr || ''}
> • *Link:* ${random.templates.video_templates || ''}`;

        await conn.sendMessage(m.chat, {
            video: {
                url: random.templates.url
            },
            caption: cap
        }, {
            quoted: m
        });
    };
};

handler.help = ["cc", "capcut"].map(v => v + ' *[ Query/Link ]* ');
handler.tags = ["downloader", "internet"];
handler.command = ["cc", "capcut"];
handler.limit = true
handler.loading = true

module.exports = handler;