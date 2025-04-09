const {
    writeExif
} = require(process.cwd() + "/lib/sticker");

let yukio = async (m, {
    conn,
    Func,
    config,
    text
}) => {
    const quoted = m.quoted ? m.quoted : m;
    switch (m.command) {
        case 's':
        case 'sticker':
        case 'stiker': {
            if (/image|video|webp/.test(quoted.msg.mimetype)) {
                let media = await quoted.download();
                if (quoted.msg?.seconds > 10)
                    throw "> *⚠️ Video lebih dari 10 detik tidak dapat dijadikan sticker*.";

                let exif;
                if (m.mentions.length !== 0) {
                    for (let id of m.mentions) {
                        await delay(1500);
                        let url = await sock.profilePictureUrl(id, "image");
                        let media = await axios
                            .get(url, {
                                responseType: "arraybuffer",
                            })
                            .then((a) => a.data);
                        let sticker = await writeExif(media, {
                            packName: config.sticker.packname,
                            packPublish: config.sticker.author,
                        });
                        await conn.sendMessage(m.chat, {
                            sticker
                        }, {
                            quoted: m
                        });
                    }
                } else if (/image|video|webp/.test(quoted.msg.mimetype)) {
                    exif = {
                        packName: config.sticker.packname,
                        packPublish: config.sticker.author,
                    };
                }

                let sticker = await writeExif({
                    mimetype: quoted.msg.mimetype,
                    data: media
                }, exif);

                await conn.sendMessage(m.chat, {
                    sticker
                }, {
                    quoted: m
                });
            } else {
                m.reply("> *📸 Balas dengan foto atau video untuk dijadikan sticker*.");
            };
        }
        break;
        case 'swm':
        case 'wm':
        case 'stickerwm': {
            const quoted = m.quoted ? m.quoted : m;
            let [packname, author] = text.split(/[,|\-+&]/)
            let exif = {
                packName: packname || '',
                packPublish: author || '',
            };

            let sticker = await writeExif({
                mimetype: quoted.msg.mimetype,
                data: await quoted.download()
            }, exif);

            await conn.sendMessage(m.chat, {
                sticker
            }, {
                quoted: m
            });
        }
        break;
    };
};

yukio.help = ["sticker", "s", "stiker", "swm", "stickerwm", "wm"].map(v => v + ' *[ Membuat Sticker/Mengubah Watermark Sticker ]* ');
yukio.tags = ["tools"];
yukio.command = ["sticker", "s", "stiker", "swm"];

module.exports = yukio;
