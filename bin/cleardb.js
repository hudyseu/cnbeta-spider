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
var db=mongoose.connect(`mongodb://hudingyu:hudy320123!@${config.originIp}:${config.localPort}/${config.db.articlelist}`);
// var db=mongoose.connect(`mongodb://${config.localUrl}:${config.localPort}/${config.db.articlelist}`);

mongoose.connection.on("error", function (error) {
    console.log("database connnecting failed：" + error);
});

mongoose.connection.on("open", function () {
    console.log("database connnecting succeeded");
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
articleModel.collection.remove();
