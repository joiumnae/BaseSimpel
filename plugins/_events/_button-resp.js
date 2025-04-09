// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let handler = (m) => m;
handler.before = async (m, { sock, conn, client }) => {
    if (m.type === "interactiveResponseMessage" && m.quoted.fromMe) {
        sock.appendTextMessage(
            m,
            JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id,
            m,
        );
    }
}

module.exports = handler