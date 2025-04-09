// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let yukio = async (m, {
    conn,
    text,
    Scraper,
    Func
}) => {
    if (!text) throw '⚠️Masukan Nama Lagu Yg Pengen Anda Cari !'
    const {
        all
    } = await require('yt-search')({
        search: text,
        hl: 'id',
        gl: 'ID'
    });
    if (!all && all.length > 0) throw '⚠️Maaf Lagu Yang Anda Search Tidak Di Temukan !'
    const result = all[0];
    let caption = `🔍 Search Play
> • *Title:* ${result.title || ''}
> • *Id:* ${result.videoId || ''}
> • *Ago:* ${result.ago || ''}
> • *Author:* ${result.author.name || ''}
> • *Url:* ${result.url || ''}`;
    conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
            isForwarded: true,
            forwardingScore: 99999,
            externalAdReply: {
                title: result.title,
                body: result.timestamp + ' / ' + result.author.name + ' / ' + result.type,
                mediaType: 1,
                thumbnailUrl: result.thumbnail,
                renderLargerThumbnail: true,
                sourceUrl: result.url
            }
        }
    }, {
        quoted: m
    });
    const ytdl = await Scraper.amdl(result.url, 'audio', '320k')
    const size = await Func.getSize(ytdl.download);
    conn.sendMessage(m.chat, {
        audio: {
            url: ytdl.download
        },
        mimetype: 'audio/mpeg',
        contextInfo: {
            isForwarded: true,
            forwardingScore: 99999,
            externalAdReply: {
                title: result.title,
                body: result.timestamp + ' / ' + size + ' / ' + ytdl.format,
                mediaType: 1,
                thumbnailUrl: result.thumbnail,
                renderLargerThumbnail: false,
                sourceUrl: result.url
            }
        }
    }, {
        quoted: m
    });
};

yukio.help = ["play"].map(v => v + ' *[ Request Lagu Yt Yg Pengen Di Putar ]* ');
yukio.tags = ["downloader", "internet"];
yukio.command = ["play"];
yukio.loading = true;
yukio.limit = true;

module.exports = yukio;