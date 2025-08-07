// 初始化事件数据脚本
// 运行此脚本将默认的婚礼时间线事件添加到云数据库的events集合中

const cloud = require('wx-server-sdk')

// 初始化云开发环境
cloud.init({
    env: 'cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587' // 替换为你的云环境ID
})

const db = cloud.database()

// 默认的婚礼时间线事件数据
const DEFAULT_TIMELINE = [
    {
        id: 1,
        startTime: '07:30',
        endTime: '08:00',
        location: '酒店总统包房',
        project: '新娘准备',
        content: '新娘起床洗漱，记得用早餐；伴娘准备游戏；家人准备莲子羹',
        remarks: '',
        icon: '💄',
        status: 'pending'
    },
    {
        id: 2,
        startTime: '08:00',
        endTime: '09:00',
        location: '新郎家（东海别墅）',
        project: '新郎准备',
        content: '检查好各类结婚道具，新郎出门前准备好迎亲用的红包及香烟喜糖',
        remarks: '',
        icon: '👔',
        status: 'pending'
    },
    {
        id: 3,
        startTime: '08:00',
        endTime: '09:00',
        location: '酒店总统包房',
        project: '化妆师到达',
        content: '化妆师为新娘、喜妈妈化妆',
        remarks: '确保等按照实际情况准备',
        icon: '💄',
        status: 'pending'
    },
    {
        id: 4,
        startTime: '09:00',
        endTime: '09:28',
        location: '',
        project: '摄影摄像到达',
        content: '拍摄新娘化妆花絮',
        remarks: '无晨拍',
        icon: '📷',
        status: 'pending'
    },
    {
        id: 5,
        startTime: '09:00',
        endTime: '09:28',
        location: '新郎家（东海别墅）',
        project: '婚车集合',
        content: '婚车停在新郎家小区内，提前到达扎好婚车',
        remarks: '提前一天到格乐丽雅取新娘手捧花、胸花、婚车车头花、跟车礼花及丝带等',
        icon: '🚗',
        status: 'pending'
    },
    {
        id: 6,
        startTime: '09:28',
        endTime: '10:28',
        location: '酒店总统包房',
        project: '新郎出发',
        content: '在酒店楼下，摄影摄像拍摄新郎花絮。新郎亲人朋友及伴娘过门，新郎伴郎共同过去后，新娘家接待来客',
        remarks: '新郎提前准备：小红包若干；新娘提前准备：游戏道具',
        icon: '🚶‍♂️',
        status: 'pending'
    },
    {
        id: 7,
        startTime: '09:28',
        endTime: '10:28',
        location: '酒店总统包房',
        project: '求婚',
        content: '新郎单膝跪地向新娘献手捧花求婚，摄像师、摄影师捕捉精彩镜头',
        remarks: '求婚所需物品：手捧花+戒指',
        icon: '💍',
        status: 'pending'
    },
    {
        id: 8,
        startTime: '09:28',
        endTime: '10:28',
        location: '',
        project: '新郎见新娘父母',
        content: '新郎给新娘父母敬茶，并改口叫妈妈爸爸，妈妈爸爸给改口红包，摄影摄像拍摄镜头，妈妈为两位新人送上早生贵子菜，其他人员拍作休息',
        remarks: '新娘家人准备物品：红色敬茶盖碗*2套，红色洗碗*2套；新郎需准备一个全空的小红包，把新娘口中的红豆移放入其中的红包，然后贴身放好',
        icon: '🍵',
        status: 'pending'
    },
    {
        id: 9,
        startTime: '10:28',
        endTime: '12:58',
        location: '',
        project: '新娘出嫁',
        content: '新娘父母送新人到婚车旁，母亲为女儿送婚鞋，父母拥抱女儿，然后前往新郎家',
        remarks: '路上告知新郎家总管新人到时间，准备鞭炮，预留停车位',
        icon: '👰',
        status: 'pending'
    },
    {
        id: 10,
        startTime: '10:28',
        endTime: '12:58',
        location: '新郎家门口',
        project: '新郎家接亲',
        content: '在家拍一些照片。新娘给新郎父母敬茶，并改口叫妈妈爸爸，妈妈爸爸给改口红包，摄影摄像拍摄镜头，敬茶结束后新郎妈妈为两位新人送上早生贵子菜，其他人员拍作休息',
        remarks: '新郎家人准备物品：红色敬茶盖碗*2套，红色洗碗*2套，家人提前准备好生贵子菜',
        icon: '🍵',
        status: 'pending'
    },
    {
        id: 11,
        startTime: '10:28',
        endTime: '12:58',
        location: '新郎家（东海别墅）',
        project: '用餐',
        content: '午餐时间',
        remarks: '帮工作人员点外卖8位工作人员',
        icon: '🍽️',
        status: 'pending'
    },
    {
        id: 12,
        startTime: '13:18',
        endTime: '13:58',
        location: '出发去格乐利雅（汐水路40号）',
        project: '婚车出发婚礼堂',
        content: '再次确认婚礼所需物品：婚纱礼服、海报，婚纱照摆台，婚纱照相册，葡萄汁、喜糖、喜酒等自带物品是否带齐',
        remarks: '新人提前准备葡萄汁，建议买全家每日C葡萄汁',
        icon: '🚗',
        status: 'pending'
    },
    {
        id: 13,
        startTime: '13:18',
        endTime: '13:58',
        location: '',
        project: '快到了提前15分钟打电话给策划',
        content: '告知到达格乐丽雅会馆大概时间',
        remarks: '',
        icon: '📞',
        status: 'pending'
    },
    {
        id: 14,
        startTime: '13:58',
        endTime: '14:30',
        location: '格乐利雅',
        project: '到达格乐利雅',
        content: '到达后休息片刻后，新娘房换装',
        remarks: '',
        icon: '🏨',
        status: 'pending'
    },
    {
        id: 15,
        startTime: '14:00',
        endTime: '15:00',
        location: '宴会厅',
        project: '仪式堂',
        content: '仪式堂，通知宾客14:30到',
        remarks: '',
        icon: '💒',
        status: 'pending'
    },
    {
        id: 16,
        startTime: '15:30',
        endTime: '16:30',
        location: '',
        project: '彩排+内景',
        content: '主仪式彩排',
        remarks: '来会所的所有项目在17:15前完成即可，顺序依据当天情况可作调整',
        icon: '🎭',
        status: 'pending'
    },
    {
        id: 17,
        startTime: '17:18',
        endTime: '18:18',
        location: '迎宾区',
        project: '迎宾（迎宾区）',
        content: '新人迎接来宾的到来，签到合影，服务人员引导客人去休息区休息',
        remarks: '与宾客合影',
        icon: '🤝',
        status: 'pending'
    },
    {
        id: 18,
        startTime: '18:18',
        endTime: '20:18',
        location: '宴会厅',
        project: '晚宴第一场',
        content: '新人进场，可提前也可推迟',
        remarks: '',
        icon: '🍽️',
        status: 'pending'
    },
    {
        id: 19,
        startTime: '18:18',
        endTime: '20:18',
        location: '宴会厅',
        project: '晚宴第一场敬酒',
        content: '抽奖、游戏、嘉宾表演等',
        remarks: '晚宴流程以司仪沟通的流程为准，提前将仪式所需的发言稿，材料前发至策划邮箱389909948@qq.com',
        icon: '🥂',
        status: 'pending'
    },
    {
        id: 20,
        startTime: '20:18',
        endTime: '20:30',
        location: '宴会厅',
        project: '谢幕',
        content: '感谢宾客的到来，婚礼仪式结束',
        remarks: '',
        icon: '🎬',
        status: 'pending'
    },
    {
        id: 21,
        startTime: '20:30',
        endTime: '21:00',
        location: '格乐利雅',
        project: '婚礼结束',
        content: '检查并打包所有婚纱礼服及烟酒等其他物品',
        remarks: '检查打包物品',
        icon: '📦',
        status: 'pending'
    }
]

async function initEvents() {
    try {
        console.log('开始初始化事件数据...')

        // 检查events集合是否存在，如果不存在则创建
        try {
            await db.createCollection('events')
            console.log('创建events集合成功')
        } catch (error) {
            if (error.message.includes('collection already exists')) {
                console.log('events集合已存在')
            } else {
                throw error
            }
        }

        // 清空现有数据
        await db.collection('events').where({}).remove()
        console.log('清空现有事件数据')

        // 添加默认时间线数据
        await db.collection('events').add({
            data: {
                timeline: DEFAULT_TIMELINE,
                createdAt: new Date()
            }
        })

        console.log('成功添加默认时间线数据')

        // 验证添加结果
        const result = await db.collection('events').get()
        console.log('当前文档数量:', result.data.length)
        if (result.data.length > 0) {
            console.log('时间线事件数量:', result.data[0].timeline.length)
            console.log('事件列表:', result.data[0].timeline.map(item => ({
                id: item.id,
                project: item.project,
                startTime: item.startTime,
                location: item.location
            })))
        }

        console.log('事件数据初始化完成！')
    } catch (error) {
        console.error('初始化事件数据失败:', error)
    }
}

// 运行初始化函数
initEvents() 