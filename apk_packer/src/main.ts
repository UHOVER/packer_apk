//裁剪图片https://github.com/lovell/sharp
//压缩图片https://github.com/imagemin/imagemin-optipng
import { exec } from "shelljs"
import * as fs from "fs"
import { sourceDir, workDir, bidPrefix, appNames, appVer } from "./confg"
import { createCipher } from "crypto";
const sharp = require('sharp')
const imagemin = require('imagemin');
const imageminOptipng = require('imagemin-optipng');

const iconFolder = 'AndroidIcon'
const tempFolder = 'temp'
const iconName = 'ic_launcher.png'
const iconSubFolders = ['mipmap-hdpi', 'mipmap-ldpi', 'mipmap-mdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi']
const sizes = [72, 36, 48, 96, 144, 192, 512]

async function dealAll() {
    let existsSource = fs.existsSync(sourceDir);
    let existsWorkDir = fs.existsSync(workDir);
    if (!existsSource) {
        console.log("-----sourceDir不存在----");
        return;
    }
    if (!existsWorkDir) {
        console.log("-----workDir不存在----");
        return;
    }
    let files = fs.readdirSync(sourceDir)
    if (!files) return
    let textureIdx = 0
    for (let i = 0; i < files.length; i++) {
        let ic = files[i]
        if (ic.indexOf('.png') < 0 && ic.indexOf('.jpg') < 0) {
            continue
        }
        let existsPng = fs.existsSync(sourceDir + "/" + ic);
        if (!existsPng) {
            console.log("--不存在图片---", ic);
            continue;
        }

        let icPrefix = ic.substring(0, ic.indexOf('.'))
        console.log("打包第" + (textureIdx + 1) + "个===================" + ic + " textureIdx:" + textureIdx)
        //1.删除icon目录
        removeIconDir()
        //2.创建目录
        makeIconDir()
        //3.制作icon
        await makeIcon(ic)
        await compressPng()
        //4.拷贝icon到android工程目录
        copyIconToWorkDir()
        //5.改游戏名
        if (appNames[textureIdx]) {
            chgGameName(appNames[textureIdx])
        } else {
            console.error(textureIdx + '游戏名字错误：' + appNames[textureIdx])
            return
        }
        //6.改包id(bundleid)
        chgBID(bidPrefix + icPrefix)
        createJson(bidPrefix + icPrefix);
        //7.打包
        build()
        //8.重命名
        renameApk(icPrefix)
        textureIdx++;
    }
}
dealAll()

function removeIconDir() {
    console.log('删除icon文件夹')
    exec(`rm -r ${sourceDir}/${iconFolder}`)
    exec(`rm -r ${sourceDir}/${tempFolder}`)
}
function makeIconDir() {
    console.log('创建icon文件夹')
    exec(`mkdir ${sourceDir}/${iconFolder}`)
    iconSubFolders.forEach(f => {
        exec(`mkdir ${sourceDir}/${iconFolder}/${f}`)
    })

    exec(`mkdir ${sourceDir}/${tempFolder}`)
    iconSubFolders.forEach(f => {
        exec(`mkdir ${sourceDir}/${tempFolder}/${f}`)
    })
}

function makeIcon(name: string) {
    return new Promise<void>(resolve => {
        //拷贝icon到工具工程目录
        exec(`cp ${sourceDir}/${name} ./`)


        let count = 0

        function check() {
            if (count === sizes.length) {
                console.log('icon处理完毕')
                //删除工具工程目录icon
                exec(`rm ./${name}`)
                resolve()
            }
        }

        for (let i = 0; i < sizes.length; i++) {
            let s = sizes[i]
            //生成icon
            let corner = s * 15 / 100
            let roundedCorners = Buffer.from(`<svg><rect x="0" y="0" width="${s}" height="${s}" rx="${corner}" ry="${corner}"/></svg>`);
            if (i !== sizes.length - 1) {
                sharp(name).resize(s, s).overlayWith(roundedCorners, { cutout: true })
                    .toFile(`${sourceDir}/${tempFolder}/${iconSubFolders[i]}/${iconName}`, function (err: any) {
                        // console.log('回调' + s)
                        count++
                        check()
                    })
            } else {
                sharp(name).resize(s, s).overlayWith(roundedCorners, { cutout: true })
                    .toFile(`${sourceDir}/${tempFolder}/${iconName}`, function (err: any) {
                        // console.log('回调' + s)
                        count++
                        check()
                    })
            }
        }
    })
}

function compressPng() {
    return new Promise<void>(resolve => {
        let count = 0
        function check() {
            if (count === iconSubFolders.length + 1) {
                console.log('icon压缩完毕')
                resolve()
            }
        }

        for (let i = 0; i < iconSubFolders.length; i++) {
            let source = `${sourceDir}/${tempFolder}/${iconSubFolders[i]}/${iconName}`
            let aim = `${sourceDir}/${iconFolder}/${iconSubFolders[i]}`

            imagemin([source], aim, { use: [imageminOptipng()] }).then(() => {
                console.log('Images optimized');
                count++
                check()
            });
        }
        let source = `${sourceDir}/${tempFolder}/${iconName}`
        let aim = `${sourceDir}/${iconFolder}`
        imagemin([source], aim, { use: [imageminOptipng()] }).then(() => {
            console.log('Images optimized');
            count++
            check()
        });
    })
}


function copyIconToWorkDir() {
    let cmd = `cp -R ${sourceDir}/${iconFolder}/* ${workDir}/res`
    console.log(cmd)
    exec(cmd)
}


function chgGameName(name: string) {
    let text = fs.readFileSync(workDir + '/res/values/strings.xml')
    let str = text.toString().replace(/\">.+<\//g, `">${name}</`)
    fs.writeFileSync(workDir + '/res/values/strings.xml', str)
    console.log(str)
}


function chgBID(id: string) {
    console.log("改包id:" + id)
    let text = fs.readFileSync(workDir + '/build.gradle')
    let str = text.toString().replace(new RegExp("applicationId .+\n"), `applicationId '${id}'\n`)
    fs.writeFileSync(workDir + '/build.gradle', str)
}

function build() {
    console.log('-------打包-------')
    let existsAPK = fs.existsSync(`${workDir}/build/outputs/apk/release/GAME-release.apk`);
    if (existsAPK) {
        exec(`rm ${workDir}/build/outputs/apk/release/GAME-release.apk`)
    }
    exec(`cd ${workDir} && gradle assembleRelease`)
}

function renameApk(name: string) {
    console.log('重命名apk:' + name)
    let dir = workDir + "/build/outputs/apk/release"
    let basename = "GAME-release.apk"
    let path = dir + "/" + basename;
    let cmd = `mv ${path} ${dir}/${name}.apk`
    exec(cmd)
}

function createJson(id: string) {
    let json = {
        "appVer": appVer
    };
    fs.writeFileSync(workDir + "/build/outputs/apk/release/" + id + ".json", JSON.stringify(json))
}