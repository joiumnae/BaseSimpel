// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

class RinOkumura {
    constructor() {
        this.help = ["tiktok", "tt", "ttdl"].map(v => v + ' *[ Buat Downloader Tiktok ]* ')
        this.tags = ["downloader"]
        this.command = ["tiktok", "tt", "ttdl"]
        this.loading = true
        this.limit = true
    }
    code = async (m, {
        conn,
        text,
        Scraper
    }) => {
        if (!text.includes('tiktok')) throw '⚠️Masukan Link TikTok !'
        const isHd = m.args.includes("--hd");
        const input = text.replace(/--\w+(\=\w+)?/g, "").trim();
        const musically = await Scraper.musicaldown(input);

        let caption = `📁 Downloader Tiktok
> • *Title:* ${musically.desc || ''}
> • *Author:* ${musically.author || ''}`;

        if (!isHd) {
            if (musically.type === "video") {
                caption += `\n> • *Type:* Video\n Reply Pesan Kalau Mau Hd Video Ketik 'hd'`;
                await conn.sendAliasMessage(m.chat, {
                    video: {
                        url: musically.video
                    },
                    caption
                }, [{
                    alias: 'hd',
                    response: '.tiktok ' + input + ' --hd'
                }], m);
                await conn.sendMessage(m.chat, {
                    audio: {
                        url: musically.audio
                    },
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                });
            } else if (musically.type === "slide") {
                caption += `\n> • *Type:* Image`
                if (musically.image.length > 1) {
                    let medias = []
                    for (let i of musically.image) {
                        medias.push({
                            type: 'image',
                            data: {
                                url: i
                            }
                        });
                    };
                    await conn.sendAlbumMessage(m.cht, medias, {
                        caption: caption,
                        quoted: m
                    });
                } else {
                    await sock.sendMessage(m.cht, {
                        image: {
                            url: musically.image[0]
                        },
                        caption
                    }, {
                        quoted: m
                    });
                    await conn.sendMessage(m.chat, {
                        audio: {
                            url: musically.audio
                        },
                        mimetype: 'audio/mpeg'
                    }, {
                        quoted: m
                    });
                };
            }
        } else if (isHd) {
            caption += `\n> • *Type:* Video\n Reply Pesan Kalau Mau Hd Video Ketik 'hd'`
            await conn.sendMessage(m.chat, {
                video: {
                    url: musically.video_hd
                },
                caption
            }, {
                quoted: m
            });

            await conn.sendMessage(m.chat, {
                audio: {
                    url: musically.audio
                },
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            });
        }
    };
};

module.exports = new RinOkumura()
