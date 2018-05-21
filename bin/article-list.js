/**
 * @fileOverview
 * @name article-list.js
 * @author hudingyu <hudingyu@meituan.com>
 * @date 2018/5/17
 * @license MIT
 */

/**
 * 根据分页接口获取文章列表，这些列表只包含新闻的基本信息（包括标题、摘要、发布时间等，但没有详情内容）
 * 在下一阶段，将根据新闻列表逐条抓取文章详情内容
 */
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const async = require('async');
const logger = require('../config/log');
const _ = require('lodash');

const {
    website,
    listBaseUrl,
    contentBaseUrl,
    totalPage
} = require('../config/originconf');

const {
    sleep,
    getPageUrlList,
    parseObject
} = require('../utils/utils');

const dbHelper = require('../dbhelper/dbhelper');
const { articleArc, articleModel } = require('../model/article');

/**
 * 初始化方法 抓取文章列表
 * @returns {Promise.<*>}
 */
const articleListInit = async() => {
    logger.info('抓取文章列表开始...');
    const pageUrlList = getPageUrlList(listBaseUrl, totalPage);
    if (!pageUrlList) {
        return;
    }
    let res = await getArticleList(pageUrlList);
    return res;
}

/**
 * 利用分页接口获取文章列表
 * @param pageUrlList
 * @returns {Promise}
 */
const getArticleList = (pageUrlList) => {
    return new Promise((resolve, reject) => {
        async.mapLimit(pageUrlList, 3, (pageUrl, callback) => {
            getCurPage(pageUrl, callback);
        }, (err, result) => {
            if (err) {
                logger.error('获取文章列表出错...');
                logger.error(err);
                reject(false);
                return;
            }
            let articleList = _.flatten(result);
            saveDB(articleList, resolve);
        })
    })
};

/**
 * 获取当前页面的文章列表
 * @param pageUrl
 * @param callback
 * @returns {Promise.<void>}
 */
const getCurPage = async(pageUrl, callback) => {
    let num = Math.random() * 1000 + 1000;
    await sleep(num);
    request(pageUrl, (err, response, body) => {
        if (err) {
            logger.info('当前链接发生错误，url地址为:' + pageUrl);
            callback(null, null);
            return;
        } else {
            let responseObj = JSON.parse(body);
            if (responseObj.result && responseObj.result.list) {
                let newsList = parseObject(articleArc, responseObj.result.list, {
                    pubTime: 'inputtime',
                    author: 'aid',
                    commentCount: 'comments',
                });
                // console.log(newsList);
                callback(null, newsList);
                return;
            }
            console.log("出错了");
            callback(null, null);
        }
    });
    // let num = Math.random() * 1000 + 1000;
    // await sleep(num);
};

/**
 * 将文章列表存入数据库
 * @param result
 * @param callback
 * @returns {Promise.<void>}
 */
const saveDB = async(result, callback) => {
    //console.log(result);
    let flag = await dbHelper.insertCollection(articleModel, result).catch(function (err){
        logger.error('数据插入失败');
    });
    if (!flag) {
        logger.error('新闻列表保存失败！');
    } else {
        logger.info('列表保存成功！文章条数：' + result.length);
    }
    if (typeof callback === 'function') {
        callback(true);
    }
};

module.exports = articleListInit;