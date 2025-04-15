const axios = require("axios");
const cheerio = require("cheerio");

class MAL {
    MalSearchCharacter = function(character) {
        return new Promise(async (resolve, reject) => {
            try {
                let results = [];
                const {
                    data
                } = await axios.get('https://myanimelist.net/character.php?q=' + character);
                var $ = cheerio.load(data);
                $('table').each((i, u) => {
                    for (let i = 0; i < 10; i++) {
                        let b = $(u).find('tr > td.borderClass:nth-child(2)')[i];
                        let c = $(u).find('tr > td.borderClass:nth-child(1)')[i];
                        let d = $(u).find('tr > td.borderClass:nth-child(3)')[i];
                        let name = $(b).find('a').text().trim();
                        let alias_name = $(b).find('small').text().trim();
                        let url = $(b).find('a').attr('href');
                        let thumbnail = $(c).find('a > img').attr('data-src');
                        let anime = $(d).find('small > a:nth-child(1)').text().trim();
                        let manga = $(d).find('small > a:nth-child(2)').text().trim();
                        if (typeof url === 'undefined')
                            return;
                        results.push({
                            name: name ? name : 'No Name',
                            alias_name: alias_name ? alias_name : 'No Alias',
                            url: url ? url : 'No Url',
                            thumbnail: thumbnail ? thumbnail : 'https://i.ibb.co/G7CrCwN/404.png',
                            anime: anime ? anime : 'No In Anime',
                            manga: manga ? manga : 'No In Manga'
                        });
                    }
                });
                if (results.every(x => x === undefined))
                    return {
                        mess: 'No result found'
                    };
                resolve(results);
            } catch (error) {
                console.error(error.toString());
            }
        });
    }

    MalSearchManga = function(manga) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data
                } = await axios.get('https://myanimelist.net/manga.php?q=' + manga + '&cat=manga');
                let results = [];
                var $ = cheerio.load(data);
                $('div.js-categories-seasonal > table').each((i, u) => {
                    for (let i = 1; i < 10; i++) {
                        let b = $(u).find('td.borderClass:nth-child(2)')[i];
                        let c = $(u).find('td.borderClass:nth-child(3)')[i];
                        let d = $(u).find('td.borderClass:nth-child(4)')[i];
                        let e = $(u).find('td.borderClass:nth-child(5)')[i];
                        let f = $(u).find('td.borderClass:nth-child(1)')[i];
                        let link = $(b).find('a:nth-child(2)').attr('href');
                        if (typeof link === 'undefined')
                            return;
                        results.push({
                            title: $(b).find('a.hoverinfo_trigger > strong').text(),
                            type: $(c).text().trim(),
                            vol: $(d).text().trim(),
                            score: $(e).text().trim(),
                            link: link,
                            thumbnail: $(f).find('a.hoverinfo_trigger > img').attr('data-src')
                        });
                    }
                });
                if (results.every(x => x === undefined))
                    return {
                        mess: 'No result found'
                    };
                resolve(results);
            } catch (error) {
                console.error(error.toString());
            }
        });
    }

    MalSearchAnime = function(anime) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data
                } = await axios.get('https://myanimelist.net/anime.php?q=' + anime + '&catanime');
                let results = [];
                var $ = cheerio.load(data);
                $('div.js-categories-seasonal > table').each((u, l) => {
                    for (let i = 1; i < 10; i++) {
                        let b = $(l).find('td.borderClass > div.title')[i];
                        let c = $(l).find('td.borderClass > div.picSurround > a.hoverinfo_trigger')[i];
                        let d = $(l).find('td.ac:nth-child(3)')[i];
                        let e = $(l).find('td.ac:nth-child(4)')[i];
                        let f = $(l).find('td.ac:nth-child(5)')[i];
                        let url = $(b).find('a.hoverinfo_trigger').attr('href');
                        if (typeof url === 'undefined')
                            return;
                        results.push({
                            title: $(b).find('a.hoverinfo_trigger').text(),
                            thumbnail: $(c).find('img').attr('data-src'),
                            url: url,
                            type: $(d).text().trim().replace('\n'),
                            episode: $(e).text().trim().replace('\n'),
                            score: $(f).text().trim().replace('\n'),
                        });
                    }
                });
                if (results.every(x => x === undefined))
                    return {
                        mess: 'No result found'
                    };
                resolve(results);
            } catch (error) {
                console.error(error.toString());
            }
        });
    }

    MalTopAiring = function() {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data
                } = await axios.get('https://myanimelist.net/topanime.php?type=airing');
                let results = [];
                var $ = cheerio.load(data);
                $('div.pb12 > table.top-ranking-table').each((i, u) => {
                    for (let i = 0; i < 10; i++) {
                        let b = $(u).find('tr.ranking-list > td.ac');
                        let c = $(u).find('tr.ranking-list > td.title')[i];
                        let d = $(u).find('tr.ranking-list > td.score')[i];
                        results.push({
                            rank: i + 1,
                            thumbnail: $(c).find('a.hoverinfo_trigger > img').attr('data-src'),
                            title: $(c).find('div.detail > div.clearfix > h3 > a').text().trim(),
                            score: $(d).find('span').text().trim(),
                            link: $(c).find('a.hoverinfo_trigger').attr('href')
                        });
                    }
                });
                if (results.every(x => x === undefined))
                    return {
                        mess: 'No result found'
                    };
                resolve(results);
            } catch (error) {
                console.error(error.toString());
            }
        });
    }

    MalUpcoming = function(type) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data
                } = await axios.get('https://myanimelist.net/topanime.php?type=' + type);
                let results = [];
                var $ = cheerio.load(data);
                $('div.pb12 > table.top-ranking-table').each((i, u) => {
                    for (let i = 0; i < 10; i++) {
                        let b = $(u).find('tr.ranking-list > td.ac');
                        let c = $(u).find('tr.ranking-list > td.title')[i];
                        let d = $(u).find('tr.ranking-list > td.score')[i];
                        results.push({
                            rank: i + 1,
                            thumbnail: $(c).find('a.hoverinfo_trigger > img').attr('data-src'),
                            title: $(c).find('div.detail > div.clearfix > h3 > a').text().trim(),
                            score: $(d).find('span').text().trim(),
                            link: $(c).find('a.hoverinfo_trigger').attr('href')
                        });
                    }
                });
                if (results.every(x => x === undefined))
                    return {
                        mess: 'No result found'
                    };
                resolve(results);
            } catch (error) {
                console.error(error.toString());
            }
        });
    }

    MalTopDoujin = function(type = 'doujin') {
        return new Promise((resolve, reject) => {
            axios.get('https://myanimelist.net/topmanga.php?type=' + type)
                .then(({
                    data
                }) => {
                    let $ = cheerio.load(data);
                    let hasil = [];
                    $('tr.ranking-list').each(function(a, b) {
                        hasil.push({
                            rank: $(b).find('td.rank.ac > span').text(),
                            title: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3').text(),
                            info: $(b).find('td.title.al.va-t.clearfix.word-break > div > div.information.di-ib.mt4').text().trim(),
                            rating: $(b).find('td.score.ac.fs14 > div').text(),
                            detail: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3 > a').attr('href'),
                            image: $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('data-src') || $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('src')
                        });
                    });
                    resolve(hasil);
                });
        });
    }

    MalLatest = async function() {
        try {
            const malUrl = 'https://myanimelist.net/anime/season';
            const response = await axios.get(malUrl);
            const $ = cheerio.load(response.data);
            const latestAnime = [];
            $('.seasonal-anime').each((index, element) => {
                const title = $(element).find('.title').text().trim();
                const image = $(element).find('img').attr('data-src') || $(element).find('img').attr('src');
                const link = $(element).find('a').attr('href');
                const synopsis = $(element).find('.synopsis').text().trim();
                const studio = $(element).find('.studio').text().trim() || 'Studio tidak tersedia';
                const rating = $(element).find('.score').text().trim() || 'Rating tidak tersedia';
                if (title && image && link) {
                    latestAnime.push({
                        title,
                        image,
                        link,
                        synopsis,
                        studio,
                        rating
                    });
                }
            });
            return latestAnime;
        } catch (error) {
            console.error('Error fetching anime:', error.message);
            throw error;
        }
    }
    MalTopAnime = async function() {
        try {
            const malUrl = 'https://myanimelist.net/topanime.php';
            const response = await axios.get(malUrl);
            const $ = cheerio.load(response.data);
            const allAnime = [];
            $('.ranking-list').each((index, element) => {
                const title = $(element).find('.title').text().trim();
                const image = $(element).find('img').attr('data-src') || $(element).find('img').attr('src');
                const link = $(element).find('.title a').attr('href'); // Updated selector for link
                const rating = parseFloat($(element).find('.score').text().trim()) || 0;
                if (title && image && link && rating) {
                    allAnime.push({
                        title,
                        image,
                        link,
                        rating
                    });
                }
            });
            return allAnime;
        } catch (error) {
            console.error('Error fetching top anime:', error.message);
            throw error;
        }
    }

    MalNews = async function(url, nbNews = 160) {
        try {
            const byProperty = (prop) => {
                return (a, b) => {
                    return typeof a[prop] === 'number' ?
                        a[prop] - b[prop] :
                        a[prop] < b[prop] ?
                        -1 :
                        a[prop] > b[prop] ?
                        1 :
                        0;
                };
            };
            const maxPage = Math.ceil(nbNews / 20);
            const requests = [];
            for (let i = 1; i <= maxPage; ++i) {
                requests.push(axios.get(`https://myanimelist.net/news?p=${i}`));
            }
            const responses = await Promise.all(requests);
            const result = [];
            for (let response of responses) {
                const $ = cheerio.load(response.data);
                const pageElements = $('.news-unit-right');
                const images = [];
                $('.image').each(function() {
                    images.push($(this).attr('src'));
                });
                const links = [];
                $('.image-link').each(function() {
                    links.push($(this).attr('href'));
                });
                const titles = pageElements.find('p.title').text().split('\n      ');
                titles.shift();
                const texts = pageElements.find('div.text').text().split('\n      ');
                texts.shift();
                for (let i = 0, l = titles.length; i < l; ++i) {
                    titles[i] = titles[i].slice(0, -5);
                    texts[i] = texts[i].slice(0, -5);
                }
                for (let i = 0, l = titles.length; i < l; ++i) {
                    const tmp = links[i].split('/');
                    result.push({
                        title: titles[i],
                        link: links[i],
                        image: images[i],
                        text: texts[i],
                        newsNumber: tmp[tmp.length - 1]
                    });
                }
            }
            result.sort(byProperty('newsNumber')).reverse();
            return result.slice(0, nbNews);
        } catch (err) {
            console.error('Error fetching MAL news:', err);
            throw err;
        }
    }

    MalCompany = function(name) {
        return new Promise(async (resolve, reject) => {
            const res = await fetch("https://myanimelist.net/company?q=" + name).then((v) => v.text());
            const $ = cheerio.load(res);
            const datas = [];
            if (!$("tr").length)
                reject("Not Found Any Search Result");
            for (let tr of $("tr")) {
                let data = {
                    name: "",
                    small: "",
                    link: "",
                    thumbnail: "",
                };
                for (let td of $(tr).children()) {
                    $(td)
                        .children()
                        .each((i, el) => {
                            switch (el.name) {
                                case "a": {
                                    data.link = `https://myanimelist.net${el.attribs.href}`;
                                    data.name = $(el).text();
                                }
                                case "div": {
                                    if ($(el).attr().class !== "picSurround")
                                        return;
                                    data.thumbnail = $(el)
                                        .children("a")
                                        .children("img")
                                        .attr("data-src");
                                }
                                case "small": {
                                    data.small = $(el).text();
                                }
                            }
                        });
                }
                datas.push(data);
            }
            resolve(datas);
        });
    }

    MalCompanyInfo = function(url) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!/myanimelist\.net\/anime\/producer/gi.test(url))
                    reject("Invalid URL");
                const res = await fetch(url).then((v) => v.text());
                const $ = cheerio.load(res);
                const data = {
                    name: url.split("/").pop(),
                    logo: "",
                    create_time: 0,
                    favorite: "",
                    share: [],
                    infos: {},
                    news: [],
                    animes: [],
                };
                for (let content of $("#content").children()) {
                    switch ($(content).attr("class")) {
                        case "content-left": {
                            $(content)
                                .children()
                                .each((i, el) => {
                                    switch ($(el).attr("class")) {
                                        case "logo": {
                                            data.logo = $(el).children("img").attr("data-src");
                                            break;
                                        }
                                        case "mb16": {
                                            if ($(el).children().length === 1) {
                                                $(el)
                                                    .children()
                                                    .children("a")
                                                    .each((i, el) => {
                                                        const attr = $(el).attr();
                                                        data.share.push({
                                                            type: attr["data-ga-network"],
                                                            link: attr["href"],
                                                        });
                                                    });
                                            } else {
                                                $(el).children((i, spaceit) => {
                                                    const res = spaceit.children
                                                        .map((v, i, arr) => {
                                                            return `${$(v).text()}`
                                                                .trim()
                                                                .replace(/[\n:]/gi, "");
                                                        })
                                                        .filter((v) => v);
                                                    const type = res[0].toLowerCase();
                                                    if (type === "established")
                                                        data.create_time = new Date(res[1]) - 1;
                                                    else if (type === "member favorites")
                                                        data.favorite = res[1];
                                                    else if (res.length == 1)
                                                        data.infos.main = res[0];
                                                    else {
                                                        data.infos.from = res[0];
                                                    }
                                                });
                                            }
                                            break;
                                        }
                                    }
                                });
                            break;
                        }
                        case "content-right": {
                            $(content)
                                .children()
                                .each((i, el) => {
                                    switch (`${$(el).attr("class")}`.split(" ")[0]) {
                                        case "news-list": {
                                            const news = {
                                                title: "",
                                                thumbnail: "",
                                                snippets: "",
                                                link: "",
                                                info: {
                                                    author: "",
                                                    author_link: "",
                                                    create_time: 0,
                                                    forum: "",
                                                    tags: [],
                                                },
                                            };
                                            $(el)
                                                .children()
                                                .each((i, el) => {
                                                    $(el)
                                                        .children()
                                                        .each((i, el) => {
                                                            switch (el.name) {
                                                                case "a": {
                                                                    news.link = el.attribs.href;
                                                                    news.thumbnail = `${$(el)
                                                        .children("img")
                                                        .attr("src")}`
                                                                        .replace(/r\/\w*\//gi, "")
                                                                        .replace(/\?\w*=[\w\d]*/gi, "");
                                                                    break;
                                                                }
                                                                case "div": {
                                                                    $(el)
                                                                        .children()
                                                                        .each((i, el) => {
                                                                            switch (el.name) {
                                                                                case "p": {
                                                                                    news.title = $(el).children().text();
                                                                                    break;
                                                                                }
                                                                                case "div": {
                                                                                    if ($(el).attr("class") === "text")
                                                                                        news.snippets = `${$(el).text()}`.trim();
                                                                                    else {
                                                                                        $(el).children((i, el) => {
                                                                                            const create_date = el.children
                                                                                                .filter((v) => v.type === "text" &&
                                                                                                    v.data
                                                                                                    .replace(/[\n]/gi, "")
                                                                                                    .trim())
                                                                                                .map((v) => {
                                                                                                    const date = v.data
                                                                                                        .replace(/[\n]/gi, "")
                                                                                                        .split("by")[0]
                                                                                                        .trim();
                                                                                                    const year = new Date().getFullYear();
                                                                                                    return (new Date(`${date.split(",")[0]} ${year}, ${date.split(",")[1]}`) - 1);
                                                                                                })
                                                                                                .filter((v) => v)[0];
                                                                                            if (create_date) {
                                                                                                news.info.create_time =
                                                                                                    create_date;
                                                                                            }
                                                                                            $(el)
                                                                                                .children("a")
                                                                                                .each((i, el) => {
                                                                                                    const link = $(el).attr("href");
                                                                                                    switch (link.split("/")[3]) {
                                                                                                        case "profile": {
                                                                                                            news.info.author_link =
                                                                                                                link;
                                                                                                            news.info.author =
                                                                                                                link.split("/")[4];
                                                                                                            break;
                                                                                                        }
                                                                                                        case "forum": {
                                                                                                            news.info.forum = link;
                                                                                                            break;
                                                                                                        }
                                                                                                        case "news": {
                                                                                                            if (link.split("/").length > 4) {
                                                                                                                const tag = link
                                                                                                                    .split("/")
                                                                                                                    .pop();
                                                                                                                news.info.tags.push({
                                                                                                                    type: tag,
                                                                                                                    link: link,
                                                                                                                });
                                                                                                            }
                                                                                                            break;
                                                                                                        }
                                                                                                    }
                                                                                                });
                                                                                        });
                                                                                    }
                                                                                }
                                                                            }
                                                                        });
                                                                    break;
                                                                }
                                                            }
                                                        });
                                                });
                                            data.news.push(news);
                                            break;
                                        }
                                        case "js-categories-seasonal": {
                                            $(el)
                                                .children()
                                                .each((i, el) => {
                                                    const anime = {
                                                        title: "",
                                                        thumbnail: "",
                                                        link: "",
                                                        category: "",
                                                        stars: "",
                                                        users: "",
                                                    };
                                                    $(el)
                                                        .children()
                                                        .each((i, el) => {
                                                            switch ($(el).attr("class")) {
                                                                case "image": {
                                                                    anime.link = $(el).children().attr("href");
                                                                    anime.thumbnail = $(el)
                                                                        .children()
                                                                        .children()
                                                                        .attr("data-src");
                                                                    break;
                                                                }
                                                                case "title": {
                                                                    anime.title = $(el).children().text();
                                                                    break;
                                                                }
                                                                case "category": {
                                                                    anime.category = $(el).text();
                                                                    break;
                                                                }
                                                                case "widget": {
                                                                    $(el)
                                                                        .children()
                                                                        .each((i, el) => {
                                                                            const type = el.attribs.class;
                                                                            for (let sa of el.children.filter((v) => v.type === "text")) {
                                                                                anime[type] = sa.data;
                                                                            }
                                                                        });
                                                                    break;
                                                                }
                                                            }
                                                        });
                                                    data.animes.push(anime);
                                                });
                                            break;
                                        }
                                    }
                                });
                            break;
                        }
                    }
                }
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    MalMangaInfo = function(url) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!/myanimelist\.net\/manga/gi.test(url))
                    reject("Invalid URL");
                const res = await fetch(url).then((v) => v.text());
                const $ = cheerio.load(res);
                const BASE_URL = "https://myanimelist.net";
                const con = $("div#content").find("tr").eq(0).children();
                const atr = $(con).eq(0).find("div.leftside");
                const dec = $(con)
                    .eq(1)
                    .find("div")
                    .find("table")
                    .find("tr")
                    .find("td.pb24");
                const data = {
                    title: $("span.h1-title")
                        .find('span[itemprop="name"]')
                        .contents()
                        .eq(0)
                        .text(),
                    synops: $(dec).find('span[itemprop="description"]').text().trim(),
                    thumbnail: $(atr).find("a > img").attr("data-src"),
                    pictures: $(atr).find("a").attr("href"),
                    score: $(dec).eq(0).find("div.score-label").text().trim(),
                    attr: $(atr)
                        .find('div[class="spaceit_pad"]')
                        .map((i, el) => {
                            const ds = {};
                            $(el)
                                .contents()
                                .each((i, el) => {
                                    switch (el.name) {
                                        case "span": {
                                            if ($(el).attr("class") === "dark_text")
                                                return (ds.type = $(el).text().trim().replace(":", ""));
                                            else if (!ds.data)
                                                return (ds.data = $(el).text().trim());
                                            else if (ds.data && typeof ds.data !== "object") {
                                                ds.data = [ds.data, $(el).text().trim()];
                                            } else {
                                                ds.data.push($(el).text().trim());
                                            }
                                            break;
                                        }
                                        case "a": {
                                            ds.link = ds.link || [];
                                            ds.link.push({
                                                url: BASE_URL + $(el).attr("href"),
                                                data: $(el).text().trim(),
                                            });
                                            break;
                                        }
                                        case undefined: {
                                            if (!el.type === "text" || !$(el).text().trim())
                                                return;
                                            const text = $(el).text().trim().replace(",", "");
                                            text ? (ds.text = text) : "";
                                            break;
                                        }
                                    }
                                });
                            return ds;
                        })
                        .get(),
                    character: [],
                };
                $(dec)
                    .eq(3)
                    .find("div.detail-characters-list")
                    .children("div")
                    .each((i, el) => {
                        $(el)
                            .find("table")
                            .each((i, el) => {
                                const char = {};
                                const td = $(el).find("td");
                                char.name = $(td)
                                    .find('td[class="borderClass"] > a')
                                    .text()
                                    .trim();
                                char.role = $(td).find("small").text().trim();
                                char.link = $(td)
                                    .find('td[class="borderClass"] > a')
                                    .attr("href");
                                char.image = $(td)
                                    .find("div.picSurround > a > img")
                                    .attr("data-src")
                                    .split("?")[0]
                                    .replace(/\/r\/\d+x\d+/gi, "");
                                data.character.push(char);
                            });
                    });
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
};

module.exports = new MAL()
