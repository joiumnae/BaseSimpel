// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

const fetch = require("node-fetch");
const axios = require("axios");
const {
    html
} = require("js-beautify");
const {
    extension
} = require("mime-types");

module.exports = ({
    help: ["get", "fetch"].map(v => v + ' *[ Get Url Media/Fetching ]* '),
    tags: ["tools"],
    command: ["get", "fetch"],
    limit: true,
    loading: true,
    code: async (m, {
        conn,
        Func,
        text
    }) => {
        if (!text)
            throw "> ❌ Masukan atau reply URL yang ingin kamu ambil datanya";
        const {
            key
        } = await conn.sendMessage(m.chat, {
            text: '_Web Atau Downloader Url Segara Di Fetch..._ Mohon Bersabar Yaaah⌛'
        }, {
            quoted: m
        })

        async function getSize(url) {
            const axios = require('axios')
            const formatSize = async (size) => {
                function round(value, precision) {
                    var multiplier = Math.pow(10, precision || 0);
                    return Math.round(value * multiplier) / multiplier;
                }
                var kiloByte = 1024;
                var megaByte = kiloByte * kiloByte;
                var gigaByte = kiloByte * megaByte;
                var teraByte = kiloByte * gigaByte;
                if (size < kiloByte) {
                    return size + "B";
                } else if (size < megaByte) {
                    return round(size / kiloByte, 1) + "KB";
                } else if (size < gigaByte) {
                    return round(size / megaByte, 1) + "MB";
                } else if (size < teraByte) {
                    return round(size / gigaByte, 1) + "GB";
                } else {
                    return round(size / teraByte, 1) + "TB";
                }
            }

            if (!isNaN(url)) return formatSize(url);
            let header = await (await axios.get(url)).headers;
            let size = header["content-length"];
            return formatSize(size);
        }

        // Function Protector Cloudflare By: Nxyz
        async function checkCloudflare(url) {
            try {
                const response = await fetch(url);
                const headers = response.headers;
                const body = await response.text();

                // Deteksi dari headers
                const cfRay = headers.get('cf-ray'); // Periksa keberadaan header CF-Ray
                const server = headers.get('server'); // Periksa header Server

                // Deteksi dari data (opsional, tergantung konfigurasi Cloudflare)
                const cloudflareProtected = body.includes('Cloudflare') || body.includes('cf-turnstile');

                // Hasil deteksi
                const isCloudflare = !!cfRay || server === 'cloudflare' || cloudflareProtected;

                return {
                    isCloudflare: isCloudflare,
                    headers: {
                        cfRay: cfRay,
                        server: server,
                    },
                    bodyContainsCloudflare: cloudflareProtected,
                };
            } catch (error) {
                console.error('Error saat memeriksa Cloudflare:', error);
                return {
                    isCloudflare: false,
                    error: error.message,
                };
            }
        }
        const urls = Func.isUrl(text);
        if (!urls)
            throw "> ❌ Format URL tidak valid, pastikan URL yang dimasukkan benar";

        for (const url of urls) {
            try {
                const response = await fetch(url);
                const protector = await checkCloudflare(url)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const size = await getSize(url)
                const mime = response.headers.get("content-type").split(";")[0];
                let caption = ` *– 乂 Fetch Media*
🗓️ Kalender: ${response.headers.get('date') || ''}
🗃️ Type: ${response.headers.get('content-type') || ''}
💾 Size: ${size || ''}
🌐 Cloudflare: ${protector.isCloudflare ? '✅' : '❌'}
🔗 Url: ${url}`

                const reply = await conn.sendMessage(m.chat, {
                    text: caption,
                    edit: key
                }, {
                    quoted: m
                })

                let body;
                if (/\html/gi.test(mime)) {
                    body = await response.text();
                    await await conn.sendMessage(m.chat, {
                        document: Buffer.from(html(body)),
                        caption: '✅ Done',
                        fileName: "result.html",
                        mimetype: mime,
                    }, {
                        quoted: reply
                    }, );
                } else if (/\json/gi.test(mime)) {
                    body = await response.json();
                    m.reply(JSON.stringify(body, null, 2));
                } else if (/webp/gi.test(mime)) {
                    body = await response.arrayBuffer();
                    conn.sendFile(
                        m.chat,
                        Buffer.from(body),
                        `result.${extension(mime)}`,
                        '✅ Done',
                        reply,
                    );
                } else if (/image/gi.test(mime)) {
                    body = await response.arrayBuffer();
                    await conn.sendMessage(m.chat, {
                        image: Buffer.from(body),
                        caption: '✅Done'
                    }, {
                        quoted: reply
                    });
                } else if (/video/gi.test(mime)) {
                    body = await response.arrayBuffer();
                    await conn.sendMessage(m.chat, {
                        video: Buffer.from(body),
                        caption: '✅Done'
                    }, {
                        quoted: reply
                    });
                } else if (/audio/gi.test(mime)) {
                    body = await response.arrayBuffer();
                    await conn.sendMessage(m.chat, {
                        audio: Buffer.from(body),
                        mimetype: 'audio/mpeg'
                    }, {
                        quoted: reply
                    });
                } else {
                    body = await response.text();
                    m.reply(Func.jsonFormat(body));
                }
            } catch (error) {
                console.error("Error fetching URL:", error);
                await conn.sendMessage(m.chwt, {
                    text: '_❌ Website Gagal Di Fatching Reason:_ ' + error,
                    edit: key
                }, {
                    quoted: m
                })
            }
        }
    },
});