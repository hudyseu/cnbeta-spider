/**
 * 封装 数据库操作方法
 */
const logger = require('../config/log');
class dbHelper {
    static async emptyCollection(Model) {
        let flag = true;
        let res = await Model.collection.remove();
        if (!res) {
            flag = false;
        }
        return flag;
    }

    static async insertCollection(Model, insertList) {
        let flag = true;
        let res = await Model.collection.insert(insertList);
        if (!res) {
            flag = false;
        }
        return flag;
    }

    static async updateCollection(Modle, doc) {
        let flag = true;
        let updateRes = await Modle.update({sid: doc.sid}, doc);
        if (!updateRes) {
            logger.error('保存文章内容出错，文章sid：' + doc.sid);
            flag = false;
        }
        return flag;
    }

    static async queryDocList(Model) {
        const list  = await Model.find({}, {'cacheStatus': 0}).catch((err) => {
            logger.error('查询文章列表出错');
            logger.error(err);
        });
        return list;
    }
};
module.exports = dbHelper;