// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

module.exports = {
    help: [],
    tags: ['info'],
    command: ['menu', 'dekugg', 'rinmenu'],
    loading: true,
    code: async (m, {
        conn,
        Func,
        config,
        text
    }) => {
        const tagCount = {};
        const tagHelpMapping = {};
        Object.keys(pg.plugins)
            .filter((plugin) => !plugin.disabled)
            .forEach((plugin) => {
                const tagsArray = Array.isArray(pg.plugins[plugin].tags) ?
                    pg.plugins[plugin].tags : [];

                if (tagsArray.length > 0) {
                    const helpArray = Array.isArray(pg.plugins[plugin].help) ?
                        pg.plugins[plugin].help : [pg.plugins[plugin].help];

                    tagsArray.forEach((tags) => {
                        if (tags) {
                            if (tagCount[tags]) {
                                tagCount[tags]++;
                                tagHelpMapping[tags].push(...helpArray);
                            } else {
                                tagCount[tags] = 1;
                                tagHelpMapping[tags] = [...helpArray];
                            }
                        }
                    });
                }
            });

        const allTagsAndHelp = Object.keys(tagCount)
            .map((tags) => {
                const daftarHelp = tagHelpMapping[tags]
                    .map((helpItem, index, i) => {
                        return `${'.' + helpItem}`;
                    })
                    .join("\n");
                return Func.Styles(` -> ${tags.toUpperCase()}
${daftarHelp}`);
            }).join("\n\n");
        let caption = `Hai ${m.pushName}!

Saya senang sekali bertemu denganmu! Saya adalah Rin-Okumura, tapi kamu bisa memanggil saya Rin aja deh!

Bot WhatsApp saya sudah cukup bagus, bisa melakukan banyak hal seperti mengirim pesan, bermain permainan, dan bahkan bisa membantu kamu dengan pertanyaan atau masalahmu!

Apa yang ingin kamu lakukan hari ini, ${m.pushName}?
Command:
${allTagsAndHelp}`;

        await conn.sendMessage(m.chat, {
            image: config.image,
            caption: Func.Styles(caption), // Use this if you are using an image or video
            footer: `© ${config.name}`,
            buttons: [{
                buttonId: 'mmm',
                buttonText: {
                    displayText: 'Hmmm Menarik🤔'
                }
            }]
        }, {
            quoted: m
        });
    }
};
