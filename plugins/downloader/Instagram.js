// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let rin = async (m, {
    conn,
    text,
    Scraper
}) => {
    if (!text.includes('instagram')) throw '⚠️ Mana Link Ig Nya !';
    try {
        Scraper.Instagram(text).then(async (a) => {
            if (a.type === "image") {
                if (a.url.length > 1) {
                    let medias = []
                    for (let i of a.url) {
                        medias.push({
                            type: 'image',
                            data: {
                                url: i
                            }
                        });
                    };
                    await conn.sendAlbumMessage(m.chat, medias, {
                        caption: '✅ Done',
                        quoted: m
                    });
                } else {
                    await conn.sendMessage(m.chat, {
                        image: {
                            url: a.url[0]
                        },
                        caption: '✅ Done'
                    }, {
                        quoted: m
                    });
                }
            } else if (a.type === "video") {
                await conn.sendMessage(m.chat, {
                    video: {
                        url: a.url[0]
                    },
                    caption: '✅ Done'
                }, {
                    quoted: m
                });
            }
        });
    } catch (e) {
        console.error('error: ' + e);
        m.reply('Maaf Get Video nya gagal😹');
    };
};

rin.help = ["ig", "instagram", "igdl"].map(a => a + ' *[ Mendownload Foto/Video Instagram ]* ');
rin.tags = ["downloader"];
rin.command = ["ig", "instagram", "igdl"];
rin.limit = true;
rin.loading = true;

module.exports = rin;
