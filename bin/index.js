/**
 * @fileOverview
 * @name index.js
 * @author hudingyu <hudingyu@meituan.com>
 * @date 2018/5/17
 * @license MIT
 */

const articleListInit = require('./article-list');
const articleContentInit = require('./content');
const logger = require('../config/log');

const start = async() => {
    let articleListRes = await articleListInit();
    // console.log(articleListRes);
    if (!articleListRes) {
        logger.warn('新闻列表更新失败...');
    } else {
        logger.info('新闻列表更新成功！');
    }

    // let articleContentRes = await articleContentInit();
    // if (!articleContentRes) {
    //     logger.warn('新闻内容抓取出错...');
    // } else {
    //     logger.info('新闻内容抓取成功！');
    // }
};

if (typeof articleListInit === 'function') {
    start();
}