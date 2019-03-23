'use strict'
const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs');

const table = require('../table');
const tip = require('../tip');
const tpls = require('../../templates');

const writeFile = (err) => {
    if (err) {
        console.log(err);
        tip.fail('请重新运行!');
        process.exit();
    }
    tip.suc('新模板删除成功!');

    if (JSON.stringify(tpls) !== '{}') {
        table(tpls);
    } else {
        tip.info('还未添加模板!');
    }

    process.exit();
};

const resolve = (projectName) => {
    // 删除对应的模板
    if (tpls[projectName]) {
        delete tpls[projectName];
    } else {
        tip.fail('模板不经存在!');
        process.exit();
    }

    // 写入template.json
    fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(tpls), 'utf-8', writeFile);
};

module.exports = () => {
    co(function*() {
        // 分步接收用户输入的参数
        const projectName = yield prompt('项目名称: ');
        return new Promise((resolve, reject) => {
            resolve(projectName);
        });
    }).then(resolve);
};