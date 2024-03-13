// 无搜索功能
import pkg from 'lodash';
const { _ } = pkg;
import { MOBILE_UA } from '../../util/misc.js';
import req from '../../util/req.js';
import CryptoJS from 'crypto-js';

let key = '视聚场';
let HOST = 'http://api.cntv.cn';

async function request(reqUrl) {
 let resp = await req.get(reqUrl, {
        headers: {
            'User-Agent': MOBILE_UA,
        },
    });
    return resp.data;
}

async function init(inReq, _outResp) {
    // siteKey = cfg.skey;
    // siteType = cfg.stype
    return {}
}

async function home(inReq, _outResp) {
    const classes = [ 
        { type_id: "TOPC1451559025546574", type_name: "动画大放映" }, 
        { type_id: "TOPC1451378857272262", type_name: "第一动画乐园" }, 
        { type_id: "TOPC1451557646802924", type_name: "健康之路" }, 
        { type_id: "TOPC1451558190239536", type_name: "走进科学" }, 
        { type_id: "TOPC1451557893544236", type_name: "探索·发现" }, 
        { type_id: "TOPC1451378967257534", type_name: "动物世界" }, 
        { type_id: "TOPC1451525103989666", type_name: "人与自然" }, 
        { type_id: "TOPC1451558150787467", type_name: "自然传奇" }, 
        { type_id: "TOPC1451557421544786", type_name: "地理·中国" }, 
        { type_id: "TOPC1451541349400938", type_name: "远方的家" }, 
        { type_id: "TOPC1575253587571324", type_name: "跟着书本去旅行" },
        { type_id: "TOPC1451557052519584", type_name: "百家讲坛" }, 
        { type_id: "TOPC1451558856402351", type_name: "空中剧院" }, 
        { type_id: "TOPC1451550970356385", type_name: "体坛快讯" }, 
        { type_id: "TOPC1451528971114112", type_name: "新闻联播" }, 
        { type_id: "TOPC1451558976694518", type_name: "焦点访谈" }, 
        { type_id: "TOPC1451464665008914", type_name: "今日说法" },
        { type_id: "TOPC1451378757637200", type_name: "等着我" }, 
        { type_id: "TOPC1451559129520755", type_name: "新闻直播间" },
        { type_id: "TOPC1451540328102649", type_name: "海峡两岸" }, 
        { type_id: "TOPC1451530382483536", type_name: "天网" },
        { type_id: "TOPC1451540389082713", type_name: "今日关注" }, 
        { type_id: "TOPC1665739007799851", type_name: "高端访谈" }, 
        { type_id: "TOPC1451464884159276", type_name: "开讲啦" }, 
        { type_id: "TOPC1451464884159276", type_name: "故事里的中国" }, 
        { type_id: "TOPC1514182710380601", type_name: "对话" }, 
        { type_id: "TOPC1451559038345600", type_name: "面对面" }, 
        { type_id: "TOPC1451534366388377", type_name: "是真的吗" }, 
        { type_id: "TOPC1451467630488780", type_name: "星光大道" }, 
        { type_id: "TOPC1451541414450906", type_name: "精彩音乐汇" }, 
        { type_id: "TOPC1451534421925242", type_name: "音乐厅" }, 
        { type_id: "TOPC1451541994820527", type_name: "民歌·中国" }, 
        { type_id: "TOPC1451354597100320", type_name: "中国电影报道" }, 
        { type_id: "TOPC1451469943519994", type_name: "星推荐" }, 
        { type_id: "TOPC1571217727564820", type_name: "方圆剧阵" }, 
        { type_id: "TOPC1650782829200997", type_name: "正大综艺" }, 
        { type_id: "TOPC1451530259915198", type_name: "第一时间" }, 
        { type_id: "TOPC1451465894294259", type_name: "开门大吉" }, 
        { type_id: "TOPC1451464884159276", type_name: "开讲啦" }, 
        { type_id: "TOPC1451558858788377", type_name: "共同关注" }, 
        { type_id: "TOPC1451527941788652", type_name: "军事报道" }, 
        { type_id: "TOPC1451558819463311", type_name: "新闻调查" }, 
        { type_id: "TOPC1451559097947700", type_name: "新闻30分" }, 
        { type_id: "TOPC1451559066181661", type_name: "新闻1+1" }, 
        { type_id: "TOPC1451540448405749", type_name: "今日亚洲" }, 
        { type_id: "TOPC1451559129520755", type_name: "新闻直播间" }, 
        { type_id: "TOPC1451558428005729", type_name: "24小时" }, 
        { type_id: "TOPC1451539894330405", type_name: "中国新闻" }, 
        { type_id: "TOPC1451558779639282", type_name: "午夜新闻" }, 
        { type_id: "TOPC1451558496100826", type_name: "朝闻天下" }, 
        { type_id: "TOPC1451528792881669", type_name: "晚间新闻" }, 
        { type_id: "TOPC1451559180488841", type_name: "新闻周刊" }, 
        { type_id: "TOPC1601362002656197", type_name: "经济半小时" }, 
        { type_id: "TOPC1451533652476962", type_name: "经济大讲堂" }, 
        { type_id: "TOPC1453100395512779", type_name: "正点财经" }, 
        { type_id: "TOPC1451546588784893", type_name: "生活圈" }, 
        { type_id: "TOPC1451526037568184", type_name: "生活提示" }, 
        { type_id: "TOPC1451558532019883", type_name: "东方时空" }, 
        { type_id: "TOPC1451533782742171", type_name: "经济信息联播" }, 
        { type_id: "TOPC1571034705435323", type_name: "今日环球" }, 
        { type_id: "TOPC1451543462858283", type_name: "一线" }
        ];
    const filterObj = {};
    return JSON.stringify({
        class: _.map(classes, (cls) => {
            cls.land = 1;
            cls.ratio = 1.78;
            return cls;
        }),
        filters: filterObj,
    })
}

async function category(inReq, _outResp) {
    let pg = inReq.body.page;
    if (pg <= 0 || typeof pg == 'undefined') pg = 1;

    const tid = inReq.body.id;

	    const data = (await request(HOST + '/NewVideo/getVideoListByColumn?id=' + tid + '&n=10&sort=desc&p=' + pg + '&mode=0&serviceId=tvcctv'));
    let videos = _.map(data.data.list, (it) => {
        return {
            vod_id: it.guid,
            vod_name: it.title,
            vod_pic: it.image,
            vod_remarks: it.time || '',
        }
    });
    const pgChk = (await request(HOST + '/NewVideo/getVideoListByColumn?id=' + tid + '&n=10&sort=desc&p=' + (parseInt(pg) + 1) + '&mode=0&serviceId=tvcctv')).data.list;
    const pgCount = pgChk.length > 0 ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: parseInt(pgCount),
        limit: 10,
        total: parseInt(data.total),
        list: videos,
    })
}

async function detail(inReq, _outResp) {
    // const id = !Array.isArray(inReq.body.id) ? [inReq.body.id] : inReq.body.id;
     const id = inReq.body.id;

    const vod = {
        vod_id: id,
        vod_remarks: '',
    };
    const playlist = ['点击播放' + '$' + 'https://hls.cntv.myhwcdn.cn/asp/hls/2000/0303000a/3/default/' + id + '/2000.m3u8'];
    vod.vod_play_from = key;
    vod.vod_play_url = playlist.join('#');
    return JSON.stringify({
        list: [vod],
    });
}

async function play(inReq, _outResp) {
    // console.debug('视聚场 id =====>' + id); // js_debug.log
    const id = inReq.body.id;
    return JSON.stringify({
        parse: 0,
        url: id,
    })
}

async function search(wd, quick, pg) {
    return '{}'
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
            wd: '暴走',
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
        key: 'cntv',
        name: '中央影视',
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