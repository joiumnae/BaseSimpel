const fs = require('node:fs');

const config = {
    owner: ["62895328876970"],
    name: "cellosxc",
    ownername: 'cellos', 
    ownername2: 'cello',
    image: { url: 'https://i.pinimg.com/1200x/a0/91/28/a09128ba3e6cb7b34f6df2f2c9938410.jpg' }, //thumbnail: fs.readFileSync('./image/tambahkan-ft-trus-kasih-nama')
    thumbnail: {
      thumbnailUrl: 'https://i.pinimg.com/1200x/a0/91/28/a09128ba3e6cb7b34f6df2f2c9938410.jpg'
      //thumbnail: fs.readFileSync('./image/tambahkan-ft-trus-kasih-nama')
    },
    prefix: [".", "?", "!", "/", "#"], //Tambahin sendiri prefix nya kalo kurang
    wagc: [ "https://chat.whatsapp.com/CsDZZL74jKmF0sRMKr4tPY", "https://chat.whatsapp.com/DfffgArbTUu46nqCgmCbE0" ],
    saluran: '120363334736301537@newsletter', 
    jidgroupnotif: '120363266755712733@g.us', 
    saluran2: '120363335701540699@newsletter', 
    jidgroup: '120363267102694949@g.us', 
    wach: 'https://chat.whatsapp.com/CsDZZL74jKmF0sRMKr4tPY', 
    sessions: "sessions",
    groq: {
     api: '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'
    },
    link: {
     tt: "https://www.tiktok.com/@joiudesu/"
    },
    sticker: {
      packname: "〆 Rin-Kun",
      author: "By: Deku/Dxyz 〆"
    },
   messages: {
      wait: "*( Loading )* Tunggu Sebentar Ya Anj...",
      owner: "*( Denied )* Lu bukan owner gua kocak !",
      premium: "*( Denied )* Fitur khusus premium, beli prem dlu sana",
      group: "*( Denied )* Fitur khusus group kocak",
      botAdmin: "*( Denied )* Lu siapa bukan Admin group",
      grootbotbup: "*( Denied )* Jadiin Yuta-Botz admin dulu baru bisa akses",
   },
   database: "rin-db",
   tz: "Asia/Jakarta"
}

module.exports = config

let file = require.resolve(__filename);
fs.watchFile(file, () => {
   fs.unwatchFile(file);
  delete require.cache[file];
});
