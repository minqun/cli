'use strict'
const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs');
const table = require('../table');
const tip = require('../tip');
const tpls = require('../../templates');
const writeFile = (err) => {
    // 处理错误
    if (err) {
        console.log(err);
        tip.fail('请重新运行!');
        process.exit();
    }

    table(tpls);
    tip.suc('新项目添加成功!');
    process.exit();
};
const resolve = (result) => {
    const { gitUrl, projectName, description } = result;
    // 避免重复添加
    if (!tpls[projectName]) {
        tpls[projectName] = {};
        tpls[projectName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, ''); // 过滤unicode字符
        tpls[projectName]['detail'] = description;
    } else {
        tip.fail('项目已经存在!');
        process.exit();
    };

    // 把模板信息写入templates.json
    fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(tpls), 'utf-8', writeFile);
};

module.exports = () => {
    co(function*() {
        // 分步接收用户输入的参数
        const gitUrl = yield prompt('GitHub 用户/项目: ');
        const projectName = yield prompt('项目名称: ');
        const description = yield prompt('描述: ');
        return new Promise((resolve, reject) => {
            resolve({
                projectName,
                gitUrl,
                description,
            });
        });
    }).then(resolve);
};
