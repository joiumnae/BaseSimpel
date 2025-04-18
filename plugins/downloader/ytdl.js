// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let yukio = async (m, {
    conn,
    text,
    Scraper,
    Uploader,
    Func
}) => {
    switch (m.command) {
        case 'ytmp4':
        case 'ytv': {
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
            const ytdl = await Scraper.savetube.download(result.url, '720');
            const getArray = await axios.get(ytdl.result.download, {
                responseType: 'arraybuffer'
            });
            if (size > 100 * 1024 * 1024) {
                await sock.sendMessage(m.cht, {
                    document: {
                        url: ytdl.result.download
                    },
                    mimetype: "audio/mpeg",
                    fileName: `${result.title}.mp3`,
                }, {
                    quoted: m
                });
            } else {
                conn.sendMessage(m.chat, {
                    video: {
                        url: ytdl.result.download
                    },
                    caption: 'Title: ' + result.title,
                }, {
                    quoted: m
                });
            }
        }
        break;
        case 'ytmp3':
        case 'yta': {
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
            const ytdl = await Scraper.savetube.download(result.url, 'mp3');
            const getArray = await axios.get(ytdl.result.download, {
                responseType: 'arraybuffer'
            });
            const tmp = await Uploader.tmpfiles(getArray.data);
            const size = await Func.getSize(tmp);
            if (getArray > 100 * 1024 * 1024) {
                await sock.sendMessage(m.cht, {
                    document: {
                        url: ytdl.result.download
                    },
                    mimetype: "audio/mpeg",
                    fileName: `${result.title}.mp3`,
                }, {
                    quoted: m
                });
            } else {
                conn.sendMessage(m.chat, {
                    audio: {
                        url: ytdl.result.download
                    },
                    mimetype: 'audio/mpeg',
                    contextInfo: {
                        isForwarded: true,
                        forwardingScore: 99999,
                        externalAdReply: {
                            title: result.title,
                            body: result.timestamp + ' / ' + size + ' / ' + ytdl.result.format,
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
        }
        break;
    }
};

yukio.help = ["ytmp3", "ytmp4", "yta", "ytv"].map(v => v + ' *[ Request Lagu Yt Yg Pengen Di Putar ]* ');
yukio.tags = ["downloader"];
yukio.command = ["ytmp3", "ytmp4", "yta", "ytv"];
yukio.loading = true;
yukio.limit = true;

module.exports = yukio;
