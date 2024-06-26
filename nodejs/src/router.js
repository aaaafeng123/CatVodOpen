import douban from './spider/video/douban.js';
import kunyu77 from './spider/video/kunyu77.js';
import kkys from './spider/video/kkys.js';
import ng from './spider/video/ng.js';
import rrys from './spider/video/rrys.js';
import ddys from './spider/video/ddys.js';
import nongmin from './spider/video/nongmin.js';
import mayiya from './spider/video/mayiya.js';
import baipiaoys from './spider/video/baipiaoys.js';
import bili from './spider/video/bili.js';
import ffm3u8 from './spider/video/ffm3u8.js';
import push from './spider/video/push.js';
import alist from './spider/pan/alist.js';
import _13bqg from './spider/book/13bqg.js';
import laobaigs from './spider/book/laobaigs.js';
import baozi from './spider/book/baozi.js';
import copymanga from './spider/book/copymanga.js';
import wogg from './spider/video/wogg.js';
import wogg1 from './spider/video/wogg1.js';
import ysche from './spider/video/ysche.js';
import tudou from './spider/video/tudou.js';
import wobg from './spider/video/wobg.js';
import upyun from './spider/video/upyun.js';
import xxpan from './spider/video/xxpan.js';
import yingso from './spider/video/yingso.js';
import yunpanres from './spider/video/yunpanres.js';
import pansearch from './spider/video/pansearch.js';
import cm from './spider/video/cm.js';
import bqr from './spider/video/bqr.js';
import maiyoux from './spider/video/maiyoux.js';
import libvio from './spider/video/libvio.js';
import ikanbot from './spider/video/ikanbot.js';
import m3u8cj from './spider/video/m3u8cj.js';
import wjm3u8 from './spider/video/wjm3u8.js';
import hhm3u8 from './spider/video/hhm3u8.js';
import lzm3u8 from './spider/video/lzm3u8.js';
import hnm3u8 from './spider/video/hnm3u8.js';
import subm3u8 from './spider/video/subm3u8.js';
import xlm3u8 from './spider/video/xlm3u8.js';
import clm3u8 from './spider/video/clm3u8.js';
import wenku from './spider/book/wenku.js';
import fengche from './spider/book/fengche.js';
import bengou from './spider/book/bengou.js';
import coco from './spider/book/coco.js';
import 韩漫基地 from './spider/book/韩漫基地.js';
import 漫画大全 from './spider/book/漫画大全.js';
import nicoletv from './spider/video/nicoletv.js';
import live from './spider/video/live.js';
import live2 from './spider/video/live2.js';
import ttkx from './spider/video/ttkx.js';
import anfun from './spider/video/anfun.js';
import cntv from './spider/video/cntv.js';
import czzy from './spider/video/czzy.js';
import subaibai from './spider/video/subaibai.js';
import douyu from './spider/video/douyu.js';
import huya from './spider/video/huya.js';
import ktv from './spider/video/ktv.js';
import boo from './spider/video/boo.js';
import _360ba from './spider/video/_360ba.js';
import appys from './spider/video/appys.js';
import sharenice from './spider/video/sharenice.js';
import ub from './spider/video/ub.js';
import tuxiaobei from './spider/video/tuxiaobei.js';
import zxzj from './spider/video/zxzj.js';
import ttian from './spider/video/ttian.js';
import klm from './spider/video/klm.js';
import nkvod from './spider/video/nkvod.js';
import wf from './spider/video/wf.js';
import netflav from './spider/video/netflav.js';

const spiders = [douban, kunyu77, kkys, ng, rrys, ddys, nongmin, mayiya, baipiaoys, bili, ffm3u8, push, alist, _13bqg, laobaigs, baozi, copymanga, wogg, wogg1, ysche, tudou, wobg, upyun, xxpan, yingso, yunpanres, pansearch, cm, bqr, maiyoux, libvio, ikanbot, m3u8cj, wjm3u8, hhm3u8, lzm3u8, hnm3u8, subm3u8, xlm3u8, clm3u8, wenku, fengche, bengou, coco, 韩漫基地, 漫画大全, nicoletv, live, live2, ttkx, anfun, cntv, czzy, subaibai, douyu, huya, ktv, boo, _360ba, appys, sharenice, ub, tuxiaobei, zxzj, ttian, klm, nkvod, wf, netflav];
const spiderPrefix = '/spider';

/**
 * A function to initialize the router.
 *
 * @param {Object} fastify - The Fastify instance
 * @return {Promise<void>} - A Promise that resolves when the router is initialized
 */
export default async function router(fastify) {
    // register all spider router
    spiders.forEach((spider) => {
        const path = spiderPrefix + '/' + spider.meta.key + '/' + spider.meta.type;
        fastify.register(spider.api, { prefix: path });
        console.log('Register spider: ' + path);
    });
    /**
     * @api {get} /check 检查
     */
    fastify.register(
        /**
         *
         * @param {import('fastify').FastifyInstance} fastify
         */
        async (fastify) => {
            fastify.get(
                '/check',
                /**
                 * check api alive or not
                 * @param {import('fastify').FastifyRequest} _request
                 * @param {import('fastify').FastifyReply} reply
                 */
                async function (_request, reply) {
                    reply.send({ run: !fastify.stop });
                }
            );
            fastify.get(
                '/config',
                /**
                 * get catopen format config
                 * @param {import('fastify').FastifyRequest} _request
                 * @param {import('fastify').FastifyReply} reply
                 */
                async function (_request, reply) {
                    const config = {
                        video: {
                            sites: [],
                        },
                        read: {
                            sites: [],
                        },
                        comic: {
                            sites: [],
                        },
                        music: {
                            sites: [],
                        },
                        pan: {
                            sites: [],
                        },
                        color: fastify.config.color || [],
                    };
                    spiders.forEach((spider) => {
                        let meta = Object.assign({}, spider.meta);
                        meta.api = spiderPrefix + '/' + meta.key + '/' + meta.type;
                        meta.key = 'nodejs_' + meta.key;
                        const stype = spider.meta.type;
                        if (stype < 10) {
                            config.video.sites.push(meta);
                        } else if (stype >= 10 && stype < 20) {
                            config.read.sites.push(meta);
                        } else if (stype >= 20 && stype < 30) {
                            config.comic.sites.push(meta);
                        } else if (stype >= 30 && stype < 40) {
                            config.music.sites.push(meta);
                        } else if (stype >= 40 && stype < 50) {
                            config.pan.sites.push(meta);
                        }
                    });
                    reply.send(config);
                }
            );
        }
    );
}
