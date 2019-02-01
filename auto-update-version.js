let shell = require('shelljs');
let fs = require('fs');

if (shell.exec('git pull').code !== 0) {
    console.log('\033[31m error git更新代码失败，请检查原因 \033[0m');
    shell.exit(1);
}

let packageJson = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf-8'}));
let version = packageJson.version;
let versionEndIndex = version.lastIndexOf('.');
let versionEnd = version.substring(versionEndIndex+1, version.length);
let newVersionEnd = parseInt(versionEnd, 10) + 1;
let re = new RegExp(`\.${versionEnd}$`);
let newVersion = version.replace(re, `.${newVersionEnd}`);
packageJson.version = newVersion;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2), {encoding: 'utf-8'});
