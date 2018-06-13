var request = require('request');
var fs = require('fs');

var img_src = 'https://static.cnbetacdn.com/topics/11-12-12 11-02-35.gif'; //获取图片的url
//采用request模块，向服务器发起一次请求，获取图片资源
var img_filename = '11-12-12 11-02-35.gif';
request(img_src).pipe(fs.createWriteStream('./'+ img_filename));