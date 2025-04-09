let yukio = async (m, {
    conn,
    text,
    Scraper,
    Func
}) => {
    switch (m.command) {
        case 'ytmp4': {
            if (!text.includes('youtu')) throw '⚠️Masukan Masukan Link Yt !'
            const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^\?&]+)(?:\?is=[^&]*)?(?:\?si=[^&]*)?(?:&.*)?/;
            const videoId = text.match(regex);
            const result = await require('yt-search')({
                videoId: videoId[1],
                hl: 'id',
                gl: 'ID'
            });
            if (!result) throw '⚠️Maaf Link Lagu Tidak Dapat Di Download'
            let caption = `📁 Download YouTube
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
            const ytdl = await Scraper.amdl(text, 'video', '720p');
            const size = await Func.getSize(ytdl.download);
            conn.sendMessage(m.chat, {
                video: {
                    url: ytdl.download
                },
                caption: 'Title: ' + result.title,
            }, {
                quoted: m
            });
        }
        break;
        case 'ytmp3': {
            if (!text.includes('youtu')) throw '⚠️Masukan Masukan Link Yt !';
            const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^\?&]+)(?:\?is=[^&]*)?(?:\?si=[^&]*)?(?:&.*)?/;
            const videoId = text.match(regex);
            const result = await require('yt-search')({
                videoId: videoId[1],
                hl: 'id',
                gl: 'ID'
            });
            if (!result) throw '⚠️Maaf Link Video Tidak Dapat Di Download'
            let caption = `📁 Download YouTube
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
            const ytdl = await Scraper.amdl(text, 'audio', '320k')
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
        }
        break;
    }
};

yukio.help = ["ytmp3", "ytmp4"].map(v => v + ' *[ Request Lagu Yt Yg Pengen Di Putar ]* ');
yukio.tags = ["downloader", "internet"];
yukio.command = ["ytmp3", "ytmp4"];
yukio.loading = true;
yukio.limit = true;

module.exports = yukio;
