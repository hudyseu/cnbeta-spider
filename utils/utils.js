
const logger = require('../config/log');

/**
 *
 * @param listBaseUrl
 * @param totalPage
 * @returns {Array}
 */
const getPageUrlList = (listBaseUrl, totalPage) => {
    let pageUrlList = [];
    for (let i = 1; i <= totalPage; i++) {
        pageUrlList.push(listBaseUrl + i);
    }
    return pageUrlList;
};

/**
 * sleep函数
 * @param {*} times
 */
const sleep = async(times) => {
    logger.info('crawler rests' + times + 'ms');
    await new Promise((resolve) => {
        setTimeout(resolve, times);
    });
    return true;
}

/**
 * 根据预设的数据结构解析当前数据，replacedKeyPairs存放对应的替换键对
 * @param model
 * @param pObject
 * @param replacedKeyPairs
 * @returns {{}}
 */
const parseObject = (model, list, replacedKeyPairs) => {
    return list.map(item => {
        let parsedObject = {};
        Object.keys(model).forEach((key) => {
            if (key in replacedKeyPairs) {
                eval('parsedObject[key] = item.' + replacedKeyPairs[key]);
            } else if (item.hasOwnProperty(key)) {
                parsedObject[key] = item[key];
            }
        });
        return parsedObject;
    })
};

const styleReg = {
    reg: / style="[^"]*"/g,
    replace: '',
};

const scriptReg = {
        reg: /<script(.*?)<\/script>/g,
        replace: '',
};

module.exports = {
    sleep,
    getPageUrlList,
    parseObject,
    styleReg,
    scriptReg,
}