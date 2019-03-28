const program = require('commander');
const packageInfo = require('../../package.json');


program.version(packageInfo.version)
program
    .command('init <name>') // fe init
    .description('生成一个项目')
    .alias('i') // 简写
    .action((name) => {
        require('../cmd/init')(name);
    });
program
    .command('list') // fe list
    .description('查看模板列表')
    .alias('l') // 简写
    .action(() => {
        require('../cmd/list')();
    });
program
    .command('add') // fe list
    .description('查看模板列表')
    .alias('a') // 简写
    .action(() => {
        require('../cmd/add')();
    });
program
    .command('delete') // fe delete
    .description('删除模板列表')
    .alias('d') // 简写
    .action(() => {
        require('../cmd/delete')();
    });
program.parse(process.argv);

if (!program.args.length) {
    program.help()
}
