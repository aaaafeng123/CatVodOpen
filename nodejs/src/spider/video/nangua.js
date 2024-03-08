import req from '../../util/req.js';
import { Crypto, jinja2, _ } from '../../util/cat.js';
// import CryptoJS from 'crypto-js';
import { formatPlayUrl, randDeviceWithId, jsonParse } from '../../util/misc.js';

import { load } from 'cheerio';
import dayjs from 'dayjs';

let HOST = 'http://ys.changmengyun.com';
let siteKey = '';
let siteType = 0;
let MOBILE_UA = 'okhttp/4.6.0'

async function request(reqUrl) {
    let t = new Date().getTime().toString();
    let res = await req.get(reqUrl, {
        method: 'get',
        headers: {
            'version_name': '1.0.6',
            'version_code': '6',
            'package_name': 'com.app.nanguatv',
            'sign': Crypto.MD5('c431ea542cee9679#uBFszdEM0oL0JRn@' + t).toString().toLowerCase(),
            'imei': 'c431ea542cee9679',
            'timeMillis': t,
            'User-Agent': MOBILE_UA
        },
    });
    // console.log("reqUrl" + reqUrl)
    // console.log(res.data)
    return res.data;
}

/*
nangua: {
    url: 'http://ys.changmengyun.com',
},
*/
async function init(inReq, _outResp) {
    HOST = inReq.server.config.nangua.url;
    return {};
}

async function home(_inReq, _outResp) {

    // let data = JSON.parse(await request(HOST + '/api.php/provide/home_nav'));
    // let classes = [];

    let classes = [
        {
            id: '0',
            name: '电视剧',
        },
        {
            id: '1',
            name: '电影',
        },
        {
            id: '2',
            name: '动漫',
        },
    ];

    let filterObj = {
        "2":[{"key":"class","name":"类型","value":[{"n":"全部","v":"类型"},{"n":"国产剧","v":"国产剧"},{"n":"港台剧","v":"港台剧"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":"地区"},{"n":"内地","v":"内地"},{"n":"香港地区","v":"香港地区"},{"n":"台湾地区","v":"台湾地区"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":"年份"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"10年代","v":"10年代"},{"n":"00年代","v":"00年代"},{"n":"90年代","v":"90年代"},{"n":"80年代","v":"80年代"}]},{"key":"by","name":"排序","value":[{"n":"热播榜","v":"热播榜"},{"n":"好评榜","v":"好评榜"},{"n":"新上线","v":"新上线"}]}],
        "1":[{"key":"class","name":"类型","value":[{"n":"全部","v":"类型"},{"n":"动作片","v":"动作片"},{"n":"喜剧片","v":"喜剧片"},{"n":"爱情片","v":"爱情片"},{"n":"科幻片","v":"科幻片"},{"n":"恐怖片","v":"恐怖片"},{"n":"剧情片","v":"剧情片"},{"n":"战争片","v":"战争片"},{"n":"惊悚片","v":"惊悚片"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":"地区"},{"n":"华语","v":"华语"},{"n":"香港地区","v":"香港地区"},{"n":"美国","v":"美国"},{"n":"欧洲","v":"欧洲"},{"n":"韩国","v":"韩国"},{"n":"日本","v":"日本"},{"n":"台湾地区","v":"台湾地区"},{"n":"泰国","v":"泰国"},{"n":"台湾地区","v":"台湾地区"},{"n":"印度","v":"印度"},{"n":"其它","v":"其它"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":"年份"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"10年代","v":"10年代"},{"n":"00年代","v":"00年代"},{"n":"90年代","v":"90年代"},{"n":"80年代","v":"80年代"}]},{"key":"by","name":"排序","value":[{"n":"热播榜","v":"热播榜"},{"n":"好评榜","v":"好评榜"},{"n":"新上线","v":"新上线"}]}],
        "4":[{"key":"class","name":"类型","value":[{"n":"全部","v":"类型"},{"n":"国产漫","v":"国产漫"},{"n":"欧美漫","v":"欧美漫"},{"n":"日韩漫","v":"日韩漫"},{"n":"港台漫","v":"港台漫"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":"地区"},{"n":"中国大陆","v":"中国大陆"},{"n":"日本","v":"日本"},{"n":"韩国","v":"韩国"},{"n":"欧美","v":"欧美"},{"n":"其它","v":"其它"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":"年份"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"10年代","v":"10年代"},{"n":"00年代","v":"00年代"},{"n":"90年代","v":"90年代"},{"n":"80年代","v":"80年代"}]},{"key":"by","name":"排序","value":[{"n":"热播榜","v":"热播榜"},{"n":"新上线","v":"新上线"}]},{"key":"total","name":"状态","value":[{"n":"全部","v":"状态"},{"n":"连载","v":"连载"},{"n":"完结","v":"完结"}]}],
        "3":[{"key":"class","name":"类型","value":[{"n":"全部","v":"类型"},{"n":"大陆","v":"大陆"},{"n":"港台","v":"港台"},{"n":"日韩","v":"日韩"},{"n":"欧美","v":"欧美"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":"地区"},{"n":"内地","v":"内地"},{"n":"港台","v":"港台"},{"n":"日韩","v":"日韩"},{"n":"欧美","v":"欧美"},{"n":"其它","v":"其它"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":"年份"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"10年代","v":"10年代"},{"n":"00年代","v":"00年代"},{"n":"90年代","v":"90年代"},{"n":"80年代","v":"80年代"}]},{"key":"by","name":"排序","value":[{"n":"热播榜","v":"热播榜"},{"n":"新上线","v":"新上线"}]}],
        "46":[{"key":"class","name":"类型","value":[{"n":"全部","v":"类型"},{"n":"日韩剧","v":"日韩剧"},{"n":"欧美剧","v":"欧美剧"},{"n":"海外剧","v":"海外剧"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":"地区"},{"n":"韩国","v":"韩国"},{"n":"美剧","v":"美剧"},{"n":"日本","v":"日本"},{"n":"泰国","v":"泰国"},{"n":"英国","v":"英国"},{"n":"新加坡","v":"新加坡"},{"n":"其他","v":"其他"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":"年份"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"10年代","v":"10年代"},{"n":"00年代","v":"00年代"},{"n":"90年代","v":"90年代"},{"n":"80年代","v":"80年代"}]},{"key":"by","name":"排序","value":[{"n":"热播榜","v":"热播榜"},{"n":"好评榜","v":"好评榜"},{"n":"新上线","v":"新上线"}]}]
    };
    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function detail(inReq, _outResp) {
    const ids = !Array.isArray(inReq.body.id) ? [inReq.body.id] : inReq.body.id;
    const videos = [];

    for (const id of ids) {
        let data = (await request(HOST + '/api.php/provide/vod_detail?app=ylys&imei=c431ea542cee9679&id=' + id)).data;
        let vod = {
            vod_id: data.id,
            vod_name: data.name,
            vod_pic: data.img,
            type_name: data.type,
            vod_year: data.year,
            vod_remarks: '更新至: ' + data.msg + ' / 评分: ' + data.score,
            vod_content: stripHtmlTag(data.info),
        };
        let episodes = data.player_info;
        let playlist = {};
        episodes.forEach(function(it) {
            let playurls = it.video_info;
            playurls.forEach(function(playurl) {
                let source = it.show;
                let t = formatPlayUrl(vod.vod_name, playurl.name);
                if (t.length == 0) t = playurl.name.trim();
                if (!playlist.hasOwnProperty(source)) {
                    playlist[source] = [];
                }
                playlist[source].push(t + '$' + playurl.url);
            });
        });
        vod.vod_play_from = _.keys(playlist).join('$$$');
        let urls = _.values(playlist);
        let vod_play_url = [];
        urls.forEach(function(it) {
            vod_play_url.push(it.join('#'));
        });
        vod.vod_play_url = vod_play_url.join('$$$');
        videos.push(vod);
    }

    return {
        list: videos,
    };
}

var parse = [];

async function play(inReq, _outResp) {
    const id = inReq.body.id;
    try {
        if (id.indexOf('m3u8') != -1) {
            let mjurl = id.split('url=')[1]
            return JSON.stringify({
                parse: 0,
                url: mjurl,
            });
        } else if (id.indexOf(',') != -1) {
            let mjurl = id.split(',')[1]
            let jData = (await request(mjurl));
            return JSON.stringify({
                parse: 0,
                url: jData.url,
            });
        } else {
            let mjurl = 'http://43.154.104.152:1234/jhapi/cs.php?url=' + id.split('url=')[1]
            let jData = (await request(mjurl));
            return JSON.stringify({
                parse: 0,
                url: jData.url,
            });
        }
    } catch (e) {
        console.log(e);
        return JSON.stringify({
            parse: 0,
            url: id,
        });
    }
}

function stripHtmlTag(src) {
    return src
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/&.{1,5};/g, '')
        .replace(/\s{2,}/g, ' ');
}

async function category(inReq, _outResp) {
    console.error(1111);
    const tid = 1;//inReq.body.id;
    const pg = inReq.body.page;
    const extend = inReq.body.filters;
    let page = pg || 1;
    if (page == 0) page = 1;
    
    // if (pg <= 0 || typeof(pg) == 'undefined') pg = 1;
    let reqUrl = HOST + '/api.php/provide/vod_list?app=ylys&id=' + tid + '&page=' + pg + '&imei=c431ea542cee9679&';
    reqUrl += jinja2('area={{ext.area}}&year={{ext.year}}&type={{ext.class}}&total={{ext.total}}&order={{ext.by}}', { ext: extend });
    // let data = JSON.parse(await request(reqUrl));
    let data = (await request(reqUrl)).list;
    let videos = [];
    data.forEach(function(it) {
        videos.push({
            vod_id: it.id,
            vod_name: it.name,
            vod_pic: it.img,
            vod_remarks: it.remarks,
        });
    });
    let pgChk = (await request(HOST + '/api.php/provide/vod_list?app=ylys&id=' + tid + '&page=' + (parseInt(pg) + 1) + '&imei=c431ea542cee9679&')).msg;
    const pgCount = (pgChk == 'ok') ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: 20,
        total: 20 * pgCount,
        list: videos,
    });
}

async function search(inReq, _outResp) {
    
    const pg = inReq.body.page;
    const wd = inReq.body.wd;
    let page = pg || 1;
    if (page == 0) page = 1;


    if (pg <= 0 || typeof(pg) == 'undefined') pg = 1;
    let data = (await request(HOST + '/api.php/provide/search_result_more?app=ylys&video_name=' + wd + '&pageSize=20&tid=0&imei=c431ea542cee9679&page=' + pg, MOBILE_UA)).data;
    let videos = [];
    data.forEach(function(it) {
        videos.push({
            vod_id: it.id,
            vod_name: it.video_name,
            vod_pic: it.img,
            vod_remarks: it.qingxidu + '/' + it.category,
        });
    });
    let pgChk = (await request(HOST + '/api.php/provide/search_result_more?app=ylys&video_name=' + wd + '&pageSize=20&tid=0&imei=c431ea542cee9679&page=' + (parseInt(pg) + 1), MOBILE_UA)).msg;
    const pgCount = (pgChk == 'ok') ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: 20,
        total: 20 * pgCount,
        list: videos,
    });


}

async function test(inReq, outResp) {
    try {
        const printErr = function (json) {
            if (json.statusCode && json.statusCode == 500) {
                console.error(json);
            }
        };
        const prefix = inReq.server.prefix;
        const dataResult = {};
        let resp = await inReq.server.inject().post(`${prefix}/init`);
        dataResult.init = resp.json();
        printErr(resp.json());
        resp = await inReq.server.inject().post(`${prefix}/home`);
        dataResult.home = resp.json();
        printErr("" + resp.json());
        if (dataResult.home.class.length > 0) {
            resp = await inReq.server.inject().post(`${prefix}/category`).payload({
                id: dataResult.home.class[0].type_id,
                page: 1,
                filter: true,
                filters: {},
            });
            dataResult.category = resp.json();
            printErr(resp.json());
            if (dataResult.category.list.length > 0) {
                resp = await inReq.server.inject().post(`${prefix}/detail`).payload({
                    id: dataResult.category.list[0].vod_id, // dataResult.category.list.map((v) => v.vod_id),
                });
                dataResult.detail = resp.json();
                printErr(resp.json());
                if (dataResult.detail.list && dataResult.detail.list.length > 0) {
                    dataResult.play = [];
                    for (const vod of dataResult.detail.list) {
                        const flags = vod.vod_play_from.split('$$$');
                        const ids = vod.vod_play_url.split('$$$');
                        for (let j = 0; j < flags.length; j++) {
                            const flag = flags[j];
                            const urls = ids[j].split('#');
                            for (let i = 0; i < urls.length && i < 2; i++) {
                                resp = await inReq.server
                                    .inject()
                                    .post(`${prefix}/play`)
                                    .payload({
                                        flag: flag,
                                        id: urls[i].split('$')[1],
                                    });
                                dataResult.play.push(resp.json());
                            }
                        }
                    }
                }
            }
        }
        resp = await inReq.server.inject().post(`${prefix}/search`).payload({
            wd: '爱',
            page: 1,
        });
        dataResult.search = resp.json();
        printErr(resp.json());
        return dataResult;
    } catch (err) {
        console.error(err);
        outResp.code(500);
        return { err: err.message, tip: 'check debug console output' };
    }
}

export default {
    meta: {
        key: 'nangua',
        name: '南瓜影视',
        type: 3,
    },
    api: async (fastify) => {
        fastify.post('/init', init);
        fastify.post('/home', home);
        fastify.post('/category', category);
        fastify.post('/detail', detail);
        fastify.post('/play', play);
        fastify.post('/search', search);
        fastify.get('/test', test);
    },
};
