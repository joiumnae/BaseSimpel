// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

module.exports = {
    help: ["luminai", "lumin"].map(v => v + ' *[ Menanyakan Pertanyaan Di LuminAi ]* '),
    tags: ["ai"],
    command: ["luminai", "lumin"],
    limit: true,
    loading: true,
    code: async (m, {
        conn,
        text
    }) => {
        if (!text) throw '⚠️ Mau Menanyakan Apa?';
        const {
            key
        } = await conn.sendMessage(m.chat, {
            text: '⌛ Pertanyaan Anda... _Sedang Di Proses_ Please Wait...'
        }, {
            quoted: m
        });
        const {
            data: LuminAi
        } = await axios.post('https://luminai.my.id/', {
            content: text,
            user: "user-11022",
            webSearchMode: false
        }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });

        await conn.sendMessage(m.chat, {
            text: LuminAi.result,
            edit: key
        }, {
            quoted: m
        });
    }
};
