// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let axios = require('axios')
let api = 'https://spotifyapi.caliphdev.com'

let handler = async (m, {
    conn,
    Func,
    text
}) => {
    if (!text) throw '⚠️ Masukan Link/Query !'
    if (Func.isUrl(text)) {
        if (!/open.spotify.com/.test(text)) throw '⚠️Mana Link Spotify Nya !';
        const {
            data: detail
        } = await axios(api + '/api/info/track', {
            post: 'GET',
            params: {
                url: text
            }
        });

        const caption = `📁 Spotify Downloader
> • *Title:* ${detail.title || ''}
> • *Artist:* ${detail.artist || ''}
> • *Album:* ${detail.album || ''}
> • *Url:* ${detail.url || ''}
> • *Link-Download:* ${api + '/api/download/track' + detail.url}`;
        m.reply(caption);

        const {
            data: audio
        } = await axios(api + '/api/download/track', {
            post: 'GET',
            params: {
                url: detail.url
            },
            responseType: 'arraybuffer'
        });

        conn.sendMessage(m.chat, {
            audio,
            mimetype: 'audio/mpeg'
        }, {
            quoted: m
        });
    } else {
        const {
            data: search
        } = await axios(api + '/api/search/tracks', {
            post: 'GET',
            params: {
                q: text
            }
        });
        if (!search && !search.length > 0) throw '⚠️ Maaf Lagu Yg Anda Search Tidak Di Temukan';

        let message = `🔍 Search Spotify\n\n`;
        message += search.map((a, i) => `\`[ ${i + 1} ]\`\n> • Title: ${a.title}\n> • Artist: ${a.artist}\n> • Url: ${a.url}`).join("\n\n");
        await conn.sendAliasMessage(m.chat, {
            text: message
        }, search.map((a, i) => ({
            alias: `${i + 1}`,
            response: `${m.prefix + m.command} ${a.url}`
        })), m);
    };
};

handler.help = ["spotify", "spdl"].map(v => v + ' *[ Download/Search Lagu ]* ');
handler.tags = ["downloader", "internet"];
handler.command = ["spotify", "spdl"];
handler.limit = true;
handler.loading = true;

module.exports = handler;
