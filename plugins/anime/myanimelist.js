// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let axios = require('axios')
let api = 'https://api.jikan.moe/v4'

let handler = async (m, {
    conn,
    Func,
    text
}) => {
    let message = `⚠️Masukan Nama Anime
Contoh: ${m.prefix + m.command} blue exorcist

\`[ Type ]\`
Manga
${m.prefix + m.command} blue exorcist --manga
${m.prefix + m.command} https://myanimelist.net/manga/13492/Ao_no_Exorcist

\`[ Character ]\`
${m.prefix + m.command} okumura, rin --character
${m.prefix + m.command} https://myanimelist.net/character/66171/Rin_Okumura --character
${m.prefix + m.command} https://myanimelist.net/character/117909/Izuku_Midoriya`

    if (!text) return m.reply(message);
    const isManga = m.args.includes('--manga');
    const isCharacter = m.args.includes('--character');
    const isTheme = m.args.includes('--theme');
    let input = text.replace(/--\w+(\=\w+)?/g, "").trim();

    const idExtract = async (url) => {
        const regex = /https?:\/\/myanimelist\.net\/(?:\w+\/)?(?:anime|manga|character|people|club|forum|news|featured)\/?(?:[^\/]+\/)?(\d+)/;
        const match = url.match(regex);
        return match[1];
    };
    if (!isManga && !isCharacter && !isTheme) {
        if (Func.isUrl(text)) {
            if (/https:\/\/myanimelist\.net\/character\//.test(text)) {
                if (!/https:\/\/myanimelist\.net\/character\//.test(text)) return m.reply('⚠️ Mana Link Character Nya !')
                const id = await idExtract(text);
                const get = await axios.get(api + '/characters/' + id);
                const character = get.data;
                if (!character) return m.reply('❌ Maaf Character Yg Anda Cari Tidak Di Temukan');
                const message = `📒Detail Character
> • *Name:* ${character.data.name || ''}
> • *Name Jepang:* ${character.data.name_kanji || ''}
> • *Nickname:*
${character.data.nicknames.map(a => `${a}`).join("\n") || ''}
> • *Id:* ${character.data.mal_id || ''}
> • *Favorite:* ${character.data.favorites || ''}
> • *About:*
${character.data.about || ''}
> • *Url:* ${character.data.url || ''}`;
                await conn.sendMessage(m.chat, {
                    image: {
                        url: character.data.images.jpg.image_url
                    },
                    caption: message
                }, {
                    quoted: m
                });
            }
        } else {
            const get = await axios.get(api + '/anime', {
                timeout: 5000,
                params: {
                    q: text,
                    limit: 20
                }
            })
            const data = get.data
            let message = `🔍 Search Anime
${data.data.map((a, i) => `\`[ ${i + 1} ]\`\n> • *Title:* ${a.title || ''} alias (${a.title_english || ''})\n> • *Id:* ${a.mal_id || ''}\n> • *Score:* ${a.score || ''}\n> • *YouTube Url:* ${a.trailer.url || 'gada'}\n> • *Link:* ${a.url || ''}`).join("\n\n")}`
            if (!data.data.length > 0) throw '❌ Maaf Yang Anda Search Tidak Di Temukan!'
            const random = data.data[Math.floor(Math.random() * data.data.length)] || 'null'
            if (!random) throw '❌ Maaf Error Coba Lah Beberapa Kali Lagi !'
            conn.sendAliasMessage(m.chat, {
                text: message,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 99999,
                    externalAdReply: {
                        title: random.title + ' alias ' + `( ${random.title_english} )`,
                        body: random.title_english,
                        mediaType: 1,
                        thumbnailUrl: random.images.jpg.image_url,
                        renderLargerThumbnail: false,
                        sourceUrl: random.url
                    }
                }
            }, data.data.map((a, i) => ({
                alias: `${i + 1}`,
                response: `${m.prefix + m.command} ${a.url} --character`
             }, {
                alias: `theme ${i + 1}`,
                response: `${m.prefix + m.command} ${a.url} --theme`
            })), m)
        }
    }

    if (isTheme) {
        const id = await idExtract(input)
        const get = await axios.get(`${api}/anime/${id}/themes`, {
            timeout: 5000,
        });
        const data = get.data;
        let message = `📒 List Theme
${data.data.openings.map((a, i) => `> • Opening:\n${'> • ' + a || ''}`).join("\n")}
${data.data.endings.map((a, i) => `> • Ending:\n${'> • ' + a || ''}`).join("\n")}`;
        m.reply(message)
    } else if (isManga) {
        const get = await axios.get(api + '/manga', {
            timeout: 5000,
            params: {
                q: input,
                limit: 20
            }
        });
        const data = get.data;
        let message = `🔍 Search Anime
${data.data.map((a, i) => `\`[ ${i + 1} ]\`\n> • *Title:* ${a.title || ''} alias (${a.title_english || ''})\n> • *Id:* ${a.mal_id || ''}\n> • *Link:* ${a.url || ''}`).join("\n\n")}`;
        if (!data.data.length > 0) throw '❌ Maaf Yang Anda Search Tidak Di Temukan!';
        const random = data.data[Math.floor(Math.random() * data.data.length)] || 'null';
        if (!random) throw '❌ Maaf Error Coba Lah Beberapa Kali Lagi !';
        conn.sendAliasMessage(m.chat, {
            text: message,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 99999,
                externalAdReply: {
                    title: random.title + ' alias ' + `( ${random.title_english} )`,
                    body: random.title_english,
                    mediaType: 1,
                    thumbnailUrl: random.images.jpg.image_url,
                    renderLargerThumbnail: false,
                    sourceUrl: random.url
                }
            }
        }, data.data.map((a, i) => ({
            alias: `${i + 1}`,
            response: `${m.prefix + m.command} ${a.url}`
        })), m);
    } else if (isCharacter) {
        if (Func.isUrl(input)) {
            if (!/https:\/\/myanimelist\.net\/anime\//.test(input)) return m.reply('⚠️ Mana Link Character Nya !');
            const id = await idExtract(input);
            const get = await axios.get(`${api}/anime/${id}/characters`, {
                timeout: 5000,
            })
            const data = get.data
            let message = `📒 List Character
${data.data.map((a, i) => `\`[ ${i + 1} ]\`\n> • *Title:* ${a.character.name || ''} favorite (${a.character.favorites || ''})\n> • *Id:* ${a.character.mal_id || ''}\n> • *Link:* ${a.character.url || ''}`).join("\n\n")}`;
            if (!data.data.length > 0) throw '❌ Maaf Yang Anda Search Tidak Di Temukan!';
            const random = data.data[Math.floor(Math.random() * data.data.length)] || 'null';
            if (!random) throw '❌ Maaf Error Coba Lah Beberapa Kali Lagi !';
            conn.sendAliasMessage(m.chat, {
                text: message,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 99999,
                    externalAdReply: {
                        title: random.character.name,
                        body: random.character.favorites,
                        mediaType: 1,
                        thumbnailUrl: random.character.images.jpg.image_url,
                        renderLargerThumbnail: false,
                        sourceUrl: random.character.url
                    }
                }
            }, data.data.map((a, i) => ({
                alias: `${i + 1}`,
                response: `${m.prefix + m.command} ${a.character.url}`
            })), m);
        } else {
            const get = await axios.get(api + '/characters', {
                timeout: 5000,
                params: {
                    q: input,
                    limit: 20
                }
            });
            const data = get.data;
            let message = `🔍Search Character
${data.data.map((a, i) => `\`[ ${i + 1} ]\`\n> • *Title:* ${a.name || ''} alias (${a.name_kanji || ''})\n> • *Id:* ${a.mal_id || ''}\n> • *Link:* ${a.url || ''}`).join("\n\n")}`;
            if (!data.data.length > 0) throw '❌ Maaf Yang Anda Search Tidak Di Temukan!';
            const random = data.data[Math.floor(Math.random() * data.data.length)] || 'null';
            if (!random) throw '❌ Maaf Error Coba Lah Beberapa Kali Lagi !';
            conn.sendAliasMessage(m.chat, {
                text: message,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 99999,
                    externalAdReply: {
                        title: random.name + ' alias ' + `( ${random.name_kanji} )`,
                        body: random.name_kanji,
                        mediaType: 1,
                        thumbnailUrl: random.images.jpg.image_url,
                        renderLargerThumbnail: false,
                        sourceUrl: random.url
                    }
                }
            }, data.data.map((a, i) => ({
                alias: `${i + 1}`,
                response: `${m.prefix + m.command} ${a.url}`
            })), m);
        }
    }
};

handler.tags = ["anime"];
handler.command = ["myanimelist", "mal"];
handler.help = ["myanimelist", "mal"].map(a => a + ' *[ Masukan Link/Query ]* ');
handler.limit = true;
handler.loading = true;

module.exports = handler;
