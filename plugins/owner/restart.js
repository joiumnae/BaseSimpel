// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

module.exports = {
    help: ["restart", "r", "shutdown"].map(v => v + " *[ Untuk Restart Bot ]* "),
    tags: ["owner"],
    command: ["restart", "r", "shutdown"],
    owner: true,
    code: async (m, {
        sock,
        config,
        plugin,
        Func,
        text
    }) => {
      m.reply(`Restarting will be completed in seconds`)
      await sleep(3000)
      process.exit()
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}