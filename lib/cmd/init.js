'use strict'
// 操作命令行
const exec = require('child_process').exec;
const co = require('co'); // 使用promises为nodejs和浏览器提供基于生成器的控制流优度，让你以一种很好的方式编写非阻塞代码
const ora = require('ora'); // 优雅的终端微调器
const prompt = require('co-prompt');
const download = require('download-git-repo');
const tip = require('../tip');
const tpls = require('../../templates');
const spinner = ora();

const execBack = (err, projectName) => {
    spinner.stop();

    if (err) {
        console.log(err);
        tip.fail('请重新运行!');
        process.exit();
    }

    tip.suc('初始化完成！');
    tip.info(`cd ${projectName} && npm install`);
    process.exit();
};

// const download = (err, projectName) => {
//     if (err) {
//         console.log(err);
//         tip.fail('请重新运行!');
//         process.exit();
//     }
//     // 删除 git 文件
//     exec('cd ' + projectName + ' && rm -rf .git', (err, out) => {
//         execRm(err, projectName);
//     });
// }

const resolve = (result) => {
    const {
        url,
        projectName,
    } = result;
    // git命令，远程拉取项目并自定义项目名
    // const cmdStr = `git clone ${url} ${Name} && cd ${Name} && git checkout master`;

    spinner.start();
    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'download';
    }, 500);
    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'download.';
    }, 1000);
    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'download..';
    }, 1500);
    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'download...';
    }, 2000);

    download(url, projectName, {
        clone: true
    }, (err) => {

        if (err) {
            console.log(err);
            tip.fail('请重新运行!');
            process.exit();
        }
        execBack(err, projectName);
    })

    // exec(cmdStr, (err) => {
    //     // download(err, Name);
    // 删除 git 文件
    // exec('cd ' + Name + ' && rm -rf .git', (err, out) => {
    // execRm(err, Name);
    // });
    // });
};

module.exports = (projectName) => {
    co(function*() {
        // 处理用户输入
        const Name = yield prompt('项目名称: ');
        if (!tpls[projectName]) {
            execBack(err, projectName);
        }

        return new Promise((resolve, reject) => {
            resolve({
                projectName: Name,
                ...tpls[projectName]
            });
        });
    }).then(resolve);
}
