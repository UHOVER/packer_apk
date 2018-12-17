//https://github.com/lovell/sharp
import { exec, test } from "shelljs"
import * as path from "path"
import * as fs from "fs"
import { createCipher } from "crypto";


const sharp = require('sharp')

let appNames = ["火拼炸金花外挂",
"哈灵斗地主",
"超级炸金花作弊器",
"牛牛炸金花作弊器",
"番茄炸金花作弊器",
"百灵炸金花作弊器",
"正版炸金花透视辅助器",
"激战炸金花作弊器",
"锐游炸金花外挂作弊器",
"萝莉炸金花破解版",
"火萤棋牌",
"捕鱼小能手",
"大王斗地主",
"暖风捕鱼日",
"宝马棋牌",
"捕鱼海岛",
"捕鱼海岛安卓版",
"烈焰捕鱼安卓版",
"烈焰捕鱼",
"捕鱼游戏王",
"捕鱼天王",
"炮炮打鱼",
"富裕捕鱼安卓版",
"富裕捕鱼",
"友趣捕鱼",
"捕鱼来了正式版",
"街机捕鱼开心乐最新版",
"欢乐捕鱼人安卓版",
"来啊捕鱼安卓版",
"捕鱼达人电竞版",
"百乐捕鱼",
"捕鱼达人4",
"天天斗地主安卓版",
"云中王牌斗地主",
"369斗地主",
"随时斗地主",
"博雅斗地主",
"群友斗地主",
"千游快乐斗地主",
"大咖斗地主",
"途游斗地主安卓版",
"口袋斗地主",
"金牌斗地主安卓版",
"爱玩斗地主",
"指尖天天斗地主",
"开心真人斗地主",
"悠游斗地主",
"千炮捕鱼电玩城安卓版",
"一起玩捕鱼",
"海王捕鱼安卓版",
"街机欢乐捕鱼",
"王牌街机捕鱼",
"姚记捕鱼",
"王者捕鱼",
"大富翁电玩捕鱼",
"街机捕鱼开心乐",
"快乐电玩捕鱼",
"全民捕鱼达人",
"捕鱼圣手",
"就要玩捕鱼",
"微乐江西棋牌南昌麻将",
"欢乐斗棋牌",
"亲朋棋牌",
"老K江西棋牌大全",
"闲趣捕鱼安卓版",
"闲趣捕鱼",
"环球捕鱼安卓版",
"环球捕鱼",
"彩金捕鱼季",
"电玩捕鱼安卓版v1.7.4",
"电玩捕鱼2",
"欢乐捕鱼族",
"街机达人捕鱼安卓版",
"街机捕鱼大亨",
"街机金蟾捕鱼2安卓版",
"千炮捕鱼联机版",
"天天假日捕鱼安卓版v3.4.5",
"天天真人捕鱼安卓版",
"疯狂捕鱼4赢话费",
"赢乐捕鱼",
"鱼丸疯狂捕鱼",
"至尊捕鱼安卓版",
"蛙蛙斗地主安卓版",
"欢乐开心斗地主",
"欢乐斗地主竞技赛",
"竖屏斗地主",
"久久斗地主安卓版",
"大王斗地主安卓版",
"哥哥热血捕鱼",
"集结号捕鱼最新版",
"集集号捕鱼",
"全民彩金捕鱼正式版",
"千炮达人捕鱼安卓版",
"全民满贯捕鱼",
"捕鱼快手",
"五福捕鱼安卓版",
"街机万人捕鱼",
"彩狗街机捕鱼",
"达人街机捕鱼",
"豪情捕鱼安卓版",
"万亨捕鱼安卓版",
"捕鱼大冒险",
"捕鱼三缺一",
"捕鱼次世代",
"我爱斗地主安卓版",
"满贯捕鱼",
"秋水斗地主",
"联机捕鱼",
"捕鱼高人",
"彩金捕鱼",
"捕鱼达人2",
"捕鱼荣耀",
"疯狂捕鱼",
"创乐欢乐斗地主",
"千炮黄金捕鱼",
"海王捕鱼",
"捕鱼深海狩猎",
"神人斗地主",
"百赢棋牌安卓版",
"欢乐捕鱼",
"联众天天斗地主",
"电竞捕鱼",
"众博棋牌",
"捕鱼欢乐颂",
"哈灵斗地主最新版",
"捕鱼忍者安卓版",
"天天斗棋牌",
"捕鱼平台",
"捕鱼全明星",
"土豪捕鱼",
"欢乐天天假日捕鱼",
"捕鱼大作战",
"捕鱼游戏大全",
"牛牛",
"亲朋爽翻捕鱼",
"拼三张",
"捕鱼之海底捞",
"百灵拼三张",
"欢乐拼三张",
"万炮捕鱼",
"经典斗地主",
"捕鱼达人秀安卓版",
"深海猎奇：捕鱼达人",
"3D豪情捕鱼安卓版",
"捕鱼传奇",
"天天来捕鱼",
"红桃棋牌",
"小米捕鱼",
"开心百万捕鱼",
"790捕鱼",
"黑金棋牌",
"摸金捕鱼",
"单机捕鱼",
"光明棋牌",
"单机千炮捕鱼",
"96棋牌游戏中心",
"91捕鱼",
"假日捕鱼爱消除",
"爽歪歪捕鱼",
"捕鱼街机王者",
"7298捕鱼达人",
"680棋牌游戏",
"洪游捕鱼",
"火爆捕鱼安卓版",
"千炮捕鱼游戏",
"明珠棋牌",
"全民电玩捕鱼",
"新时代捕鱼",
"金牌捕鱼4安卓版",
"达人捕鱼大冒险",
"捕鱼狂人6S",
"大海捕鱼",
"约约棋牌",
"择天捕鱼季",
"联机捕鱼安卓版",
"震东济南棋牌",
"捕鱼2018",
"百乐捕鱼安卓版",
"欢乐捕鱼达人",
"零点街机捕鱼",
"大发棋牌",
"捕鱼达人千炮版",
"天天玩捕鱼",
"豪情捕鱼最新版",
"疯狂捕鱼季",
"房卡捕鱼",
"金手指捕鱼",
"捕鱼争霸赛",
"乐其捕鱼",
"全民斗地主",
"深海捕鱼",
"波克捕鱼",
"2255棋牌",
"捕鱼1000炮",
"街机在线捕鱼",
"凤凰棋牌安卓版",
"亮亮电玩捕鱼",
"捕鱼海岛最新版",
"娱乐棋牌",
"百家乐在线棋牌",
"爱玩棋牌",
"炮王捕鱼",
"梦幻千炮捕鱼安卓版",
"哥哥热血捕鱼安卓版",
"捕鱼梦幻季",
"捕鱼侠3D安卓版",
"维加斯捕鱼",
"捕鱼小能手安卓版",
"8090捕鱼安卓版",
"捕鱼竞技场最新版",
"捕鱼王者归来安卓版",
"哥哥美女捕鱼安卓版",
"爱玩捕鱼3D",
"街机王者捕鱼",
"腾讯斗地主",
"姚记捕鱼最新版",
"捕鱼乐翻天",
"博雅自贡棋牌",
"街机金蝉捕鱼2",
"天天欢乐斗地主",
"66捕鱼",
"捕鱼合伙人",
"捕鱼之星安卓版",
"街机捕鱼",
"万炮捕鱼2安卓版",
"完美捕鱼",
"欢喜斗地主最新版",
"669千炮捕鱼",
"电玩千炮捕鱼",
"白金岛斗地主",
"招财捕鱼",
"捕鱼大富翁",
"捕鱼游戏",
"波克斗地主安卓版",
"星星棋牌捕鱼",
"捕鱼大集结",
"震东淄博棋牌最新版",
"就要玩捕鱼最新版",
"金牌捕鱼",
"大连娱网棋牌",
"捕鱼欢乐颂最新版",
"鑫游捕鱼",
"千炮金蟾捕鱼",
"九幺棋牌",
"钱金棋牌",
"趣赢捕鱼",
"小闲川南棋牌最新版",
"捕鱼达人之海底捞",
"k3k捕鱼",
"途游捕鱼",
"华人捕鱼",
"巅峰捕鱼",
"波克捕鱼达人",
"途游捕鱼大作战",
"经典千炮捕鱼",
"捕鱼历险记",
"鱼丸疯狂捕鱼最新版",
"海王捕鱼最新版",
"捕鱼王",
"网易四川棋牌",
"捕鱼欢乐炸",
"捕鱼之鱼跃龙门",
"神人捕鱼",
"至尊电玩捕鱼",
"761棋牌",
"捕鱼达人之深海狩猎"]
//包id前缀
let bidPrefix = 'com.hebne.'


let sourceDir = "/Users/mac/Documents/icons"
let iconFolder = 'AndroidIcon'
let iconSubFolders = ['mipmap-hdpi', 'mipmap-ldpi', 'mipmap-mdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi']
let sizes = [72, 36, 48, 96, 144, 192, 512]
let workDir = '/Users/mac/game-client-1a/build/jsb-default/frameworks/runtime-src/proj.android-studio/app'

async function dealAll() {
    let files = fs.readdirSync(sourceDir)
    if (!files) return
    let textureIdx = 0
    for (let i = 0; i < files.length; i++) {
        let ic = files[i]
        if (ic.indexOf('.png') < 0 && ic.indexOf('.jpg') < 0) {
            continue
        }
        let icPrefix = ic.substring(0, ic.indexOf('.'))
        console.log("打包第" + textureIdx + "个===================" + ic + " textureIdx:" + textureIdx)
        //1.删除icon目录
        removeIconDir()
        //2.创建目录
        makeIconDir()
        //3.制作icon
        await makeIcon(ic)
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
}
function makeIconDir() {
    console.log('创建icon文件夹')
    exec(`mkdir ${sourceDir}/${iconFolder}`)
    iconSubFolders.forEach(f => {
        exec(`mkdir ${sourceDir}/${iconFolder}/${f}`)
    })
}

function makeIcon(name: string) {
    return new Promise<void>(resolve => {
        //拷贝icon到工具工程目录
        exec(`cp ${sourceDir}/${name} ./`)

        let iconName = 'ic_launcher.png'
        let count = 0

        function check() {
            console.log('check ' + count)
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
            console.log(`生成${s}icon`)
            let corner = s * 15 / 100
            let roundedCorners = Buffer.from(`<svg><rect x="0" y="0" width="${s}" height="${s}" rx="${corner}" ry="${corner}"/></svg>`);
            if (i !== sizes.length - 1) {
                sharp(name).resize(s, s).overlayWith(roundedCorners, { cutout: true })
                    .toFile(`${sourceDir}/${iconFolder}/${iconSubFolders[i]}/${iconName}`, function (err: any) {
                        // console.log('回调' + s)
                        count++
                        check()
                    })
            } else {
                sharp(name).resize(s, s).overlayWith(roundedCorners, { cutout: true })
                    .toFile(`${sourceDir}/${iconFolder}/${iconName}`, function (err: any) {
                        // console.log('回调' + s)
                        count++
                        check()
                    })
            }
        }
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
    exec(`rm ${workDir}/build/ooutputs/apk/release/GAME-release.apk`)
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
