# **Rin Base Simple** 
<p align="center">
  <img title="Rin-Okumura-Simple" src="https://i.pinimg.com/1200x/a3/bd/7b/a3bd7b04fa983dffc8f5341e8b2a3911.jpg">
</p>

|                                          Creator                                                |
| :---------------------------------------------------------------------------------------------: |
| [![LeooxzyDekuu](https://github.com/LeooxzyDekuu.png?size=500)](https://github.com/LeooxzyDekuu)|
| [LeooxzyDekuu](https://github.com/LeooxzyDekuu)                                                 |

## Informasi

## Belum Bisa Regex Sih Bg🗿

**Simple WhatsApp bot Using Library Baileys**
| Fitur             | run/start | files | 
| :--------         | :-------: | :---: | 
| Plugin            | ❌        | ✅    |
| Case              | ❌        | ✅    |
| Scraper           | ❌        | ✅    |
| Auto ClearSesi    | ❌        | ❌    |
| Main              | ✅        | ✅    |
| Panel             | ✅        | ❌    |
| Termux            | ✅        | ✅    |

| emoji   | meaning                 |
| :-----: | :---------------------- |
| ✅      | Fitur tersedia          |
| ➖      | unreasonable/impossible |
| ❌      | Fitur belum/tidak ada   |

---

## ⚙️ Settings Bot ***( settings.js )***

```javascript
const config = {
    owner: ["6282172589188"],
    name: "Rin-Kun",
    ownername: 'Leooxzy', 
    ownername2: 'Dxyz',
    image: { url: 'https://i.pinimg.com/1200x/a0/91/28/a09128ba3e6cb7b34f6df2f2c9938410.jpg' }, //thumbnail: fs.readFileSync('./image/tambahkan-ft-trus-kasih-nama')
    thumbnail: {
      thumbnailUrl: 'https://i.pinimg.com/1200x/a0/91/28/a09128ba3e6cb7b34f6df2f2c9938410.jpg'
      //thumbnail: fs.readFileSync('./image/tambahkan-ft-trus-kasih-nama')
    },
    prefix: [".", "?", "!", "/", "#"], //Tambahin sendiri prefix nya kalo kurang
    wagc: [ "https://chat.whatsapp.com/JyeT1hdCPJeLy95tzx5eyI", "https://chat.whatsapp.com/DfffgArbTUu46nqCgmCbE0" ],
    saluran: '120363279195205552@newsletter', 
    jidgroupnotif: '120363266755712733@g.us', 
    saluran2: '120363335701540699@newsletter', 
    jidgroup: '120363267102694949@g.us', 
    wach: 'https://whatsapp.com/channel/0029VadFS3r89inc7Jjus03W', 
    sessions: "sessions",
    groq: {
     api: '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'
    },
    link: {
     tt: "https://www.tiktok.com/@leooxzy_ganz/"
    },
    sticker: {
      packname: "〆 Rin-Kun",
      author: "By: Deku/Dxyz 〆"
    },
   messages: {
      wait: "*( Loading )* Tunggu Sebentar...",
      owner: "*( Denied )* Kamu bukan owner ku !",
      premium: "*( Denied )* Fitur ini khusus user premium",
      group: "*( Denied )* Fitur ini khusus group",
      botAdmin: "*( Denied )* Lu siapa bukan Admin group",
      grootbotbup: "*( Denied )* Jadiin Yuta-Botz admin dulu baru bisa akses",
   },
   database: "hanako-db",
   tz: "Asia/Jakarta"
}

module.exports = config
```

## 👨‍💻 How to install/run


```bash
$ git clone https://github.com/FrankXz12/HanakoBotz
$ cd HanakoBotz
$ npm install
$ npm start
```

## ☘️ Example Features
Berikut cara menambahkan fitur pada bot ini

### 1. Plugins

```javascript

module.exports = {
    help: ["tes", "tesbot", "testing"].map(v => v + ' *[ Testing Bot ]* '), //Mengetahui Nama Command Di Menu
    tags: ["main"], //- Category Tags
    command: ["tes", "tesbot", "testing"], //- Nama Fitur
    owner: false, //-  Apakah Fitur ini khusus owner ?
    group: false, // - Apakah Fitur ini khusus group ?
    description: "Tes bot saja", //- Penjelasan tentang fitur nya
    loading: true, //- Ingin menambahkan loading messages ?
    code: async (m, {
      sock,
      client,
      conn,
      DekuGanz,
      Func,
      Scraper,
      text,
      config
    }) => {
      m.reply("> Bot Online ✓")
  }
}

```

### 2. Plugins

```javascript
let yukio = async (m, {
  sock,
  client,
  conn,
  DekuGanz,
  Func,
  Scraper,
  text,
  config
 }) => {
  m.reply("> Bot Online ✓")
}

yukio.help: ["tes", "tesbot", "testing"].map(v => v + ' *[ Testing Bot ]* '); //Mengetahui Nama Command Di Menu
yukio.tags: ["main"], //- Category Tags
yukio.command: ["tes", "tesbot", "testing"]; //- Nama Fitur
yukio.owner: false; //-  Apakah Fitur ini khusus owner ?
yukio.group: false; // - Apakah Fitur ini khusus group ?
yukio.loading: true; //- Ingin menambahkan loading messages ?

module.exports = yukio;
```
## **All Contributors**  
[![AxellNetwork](https://github.com/AxellNetwork.png?size=100)](https://github.com/AxellNetwork) | [![AndhikaGG](https://github.com/AndhikaGG.png?size=100)](https://github.com/AndhikaGG)  [![LeooxzyDekuu](https://github.com/LeooxzyDekuu.png?size=100)](https://github.com/LeooxzyDekuu)  
---|---  
[LeooxzyDekuu](https://github.com/LeooxzyDekuu) | 
[AxellNetwork](https://github.com/AxellNetwork) | [AndhikaGG](https://github.com/AndhikaGG)  
Remake Base | Base Script | Penyumbang fitur

---

## 📢 Jgn Lupa Follow Channel dan Join Group ya

<p>Base Sc: <a href="https://whatsapp.com/channel/0029Vb0YWvYJ3jusF2nk9U1P">Klik disini</a></p>

<p>Ch-1 (utama): <a href="https://whatsapp.com/channel/0029VadFS3r89inc7Jjus03W">Klik disini</a></p>

<p>Ch-2: <a href="https://whatsapp.com/channel/0029VateyJuKWEKhJMRKEL20">Klik disini</a></p>
