// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

const path = require('path');
const axios = require('axios');
const {
    writeExif
} = require(process.cwd() + '/lib/sticker');

module.exports = {
    help: ['brat', 'bratgenerator'].map(v => v + ' *[ Buat Sticker Brat ]* '),
    tags: ['tools'],
    command: ['brat', 'bratgenerator'],
    limit: true,
    loading: true,
    code: async (m, {
        conn,
        text,
        config
    }) => {
        if (!text) throw '⚠️Masukan Teks Nya !';
        const {
            data: brat
        } = await axios.get('https://aqul-brat.hf.space/api/brat', {
            params: {
                text: text
            },
            responseType: 'arraybuffer'
        });

        const filename = path.join(process.cwd() + '/tmp/' + 'brat-' + Date.now() + '.webp');
        fs.writeFileSync(filename, brat);
        const webp = await fs.readFileSync(filename);

        let exif = {
            packName: config.sticker.packname,
            packPublish: config.sticker.author,
        };

        let sticker = await writeExif({
            mimetype: 'image',
            data: webp
        }, exif);

        await conn.sendMessage(m.chat, {
            sticker
        }, {
            quoted: m
        });
        fs.unlinkSync(filename);
    }
};
