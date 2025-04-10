// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

class Command {
    constructor() {
        this.help = ["remini", "hdr", "hd"].map (v => v + ' *[ Menjernihkan Foto ]* ')
        this.tags = ["tools"]
        this.command = ["remini", "hdr", "hd"]
        this.limit = true
        this.loading = true
    }
    code = async (m, {
        conn,
        Func,
        Uploader,
        Scraper,
        text,
        config
    }) => {

        /**
         * Contoh penggunaaan
         */
        let quoted = m.quoted ? m.quoted : m;
        if (!/image/.test(quoted.msg.mimetype) || !quoted.isMedia)
            throw `> Reply/Kirim photo yang mau di jernihkan`;
        try {
            const media = await quoted.download()
            const IMAGE = await Uploader.tmpfiles(media);
            const SETTINGS = {
                face_enhance: {
                    model: "remini"
                },
                background_enhance: {
                    model: "rhino-tensorrt"
                },
                bokeh: {
                    aperture_radius: "0",
                    highlights: "0.20",
                    vivid: "0.75",
                    group_picture: "true",
                    rescale_kernel_for_small_images: "true",
                    apply_front_bokeh: "false"
                },
                jpeg_quality: 90
            }
            const result = await Scraper.remini(IMAGE, SETTINGS); // Buffer atau Foto
            const Ukuran = await Func.getSize(result.no_wm)
            conn.sendMessage(m.cht, {
                image: {
                    url: result.no_wm
                },
                caption: Func.Styles(`📷 Photo Remini\n> • 📁 *Size: ${Ukuran}*`)
            }, {
                quoted: m
            })
        } catch (e) {
            m.reply('maaf terjadi error: ' + e)
        }
    }
}

module.exports = new Command();
