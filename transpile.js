'use strict';
let fs = require('fs');
var path = require('path');
var maper = JSON.parse(fs.readFileSync('maper.json', 'utf8'));
let objects = getFiles('objects');
let views = fs.readdirSync('views');
let core = getFiles('core');

let buildFolder = 'bin';

console.log('--- STARTED: ');

if (!fs.existsSync(buildFolder)) {
    removeFolder(buildFolder);
    fs.mkdirSync(`./${buildFolder}`);
    fs.mkdirSync(`./${buildFolder}/js`);
    fs.mkdirSync(`./${buildFolder}/css`);
}

for (let view of views) {
    if (view.split('.')[1] !== 'html') continue;
    view = view.split('.')[0];
    let js = merge(objects, true) + merge(core),
        css = '',
        styles = maper.styles[view].map(path => `./styles/${path}`),
        scripts = maper.scripts[view].map(path => `./scripts/${path}`);

    fs.copyFileSync(`./views/${view}.html`, `./${buildFolder}/${view}.html`);

    try {
        js += merge(scripts);
        fs.writeFileSync(`./${buildFolder}/js/${view}.js`, js);

        css += merge(styles);
        fs.writeFileSync(`./${buildFolder}/css/${view}.css`, css);
    } catch (error) {
        console.log('Error: Transpilation failed! Please check maper.json');
        return;
    }
    console.log(`> ${view}`);
}

copyDir('images', `${buildFolder}/images`);
copyDir('fonts', `${buildFolder}/fonts`);
copyDir('vendor', `${buildFolder}/vendor`);
try {
} catch (error) {
    console.log('Error: Copying failed! Please check resource (images, fonts, vendor)');    
}

console.log('--- DONE!');

function merge(dirArray, isObject = false) {
    let code = '', objects = {};
    for (let i = 0; i < dirArray.length; i++) {
        if (isObject) {
            let object = dirArray[i].split('/')[dirArray[i].split('/').length - 1].split('.')[0];
            objects[object] = fs.readFileSync(`${dirArray[i]}`, 'utf8').replace(/(\r\n|\n|\r)/gm, '');
        } else {
            code += fs.readFileSync(`${dirArray[i]}`, 'utf8') + '\r';
        }
    }
    if (isObject) code += `var externalObjects=${JSON.stringify(objects)};` + '\r';
    return code;
}

function getFiles(folder) {
    let array = fs.readdirSync(folder);
    array = array.map(path => `${folder}/${path}`);
    for (let file of array) {
        let stats = fs.statSync(file);
        if (stats.isDirectory()) {
            let files = getFiles(file);
            array = array.concat(files);
            array.splice(array.indexOf(file), 1);
        }
    }
    return array;
}

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    var files = fs.readdirSync(src);
    for (var i = 0; i < files.length; i++) {
        var current = fs.lstatSync(path.join(src, files[i]));
        if (current.isDirectory()) {
            copyDir(path.join(src, files[i]), path.join(dest, files[i]));
        } else if (current.isSymbolicLink()) {
            var symlink = fs.readlinkSync(path.join(src, files[i]));
            fs.symlinkSync(symlink, path.join(dest, files[i]));
        } else {
            copy(path.join(src, files[i]), path.join(dest, files[i]));
        }
    }
    function copy(src, dest) {
        var oldFile = fs.createReadStream(src);
        var newFile = fs.createWriteStream(dest);
        oldFile.pipe(newFile);
    };
}

function removeFolder(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                removeFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};