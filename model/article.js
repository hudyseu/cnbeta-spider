/**
 * @fileOverview
 * @name model/article.js
 * @author hudingyu <hudingyu@meituan.com>
 * @date 2018/5/17
 * @license MIT
 */

/**
 * 文章相关
 * @type {*}
 */
const mongoose = require("mongoose");
const q = require('q');
const config = require('../config/dbconf');
mongoose.Promise = q.Promise;
// const mongo = mongoose.createConnection(`mongodb://${config.localUrl}:${config.localPort}/${config.db.articlelist}`);
// mongoose.connection.on('error', function () {
//     console.log("数据库连接失败");
// });
// mongoose.connection.on('connected', function () {
//     console.log("数据库连接成功！");
// });
var db=mongoose.connect(`mongodb://${config.localUrl}:${config.localPort}/${config.db.articlelist}`);

mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

mongoose.connection.on("open", function () {
    console.log("数据库连接成功");
});

const articleArc = {
    sid: String,
    title: String,
    pubTime: String,
    label: String,
    source: String,
    hometext: String,
    summary: String,
    content: String,
    csrf: String,
    sn: String,
    thumb: String,
    author: String,
    commentCount: Number,
    cacheStatus: Number
};

var Schema = mongoose.Schema;
const articleMap = new Schema(articleArc);
const articleModel = mongoose.model('Article', articleMap);
// articleModel.collection.remove();
articleModel.collection.createIndex({sid:1}, {unique:true});
module.exports = { articleArc, articleModel };