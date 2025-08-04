// 测试managers集合的脚本
const cloud = require('wx-server-sdk')

// 初始化云开发环境
cloud.init({
    env: 'cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587' // 替换为你的云环境ID
})

const db = cloud.database()

async function testManagersCollection() {
    try {
        console.log('开始测试managers集合...')

        // 检查managers集合是否存在
        try {
            const collections = await db.listCollections()
            console.log('所有集合:', collections.data.map(col => col.name))

            const managersExists = collections.data.some(col => col.name === 'managers')
            console.log('managers集合是否存在:', managersExists)
        } catch (error) {
            console.error('获取集合列表失败:', error)
        }

        // 尝试获取managers集合的数据
        try {
            const managersResult = await db.collection('managers').get()
            console.log('managers集合数据:', managersResult.data)
            console.log('managers集合数据长度:', managersResult.data.length)

            if (managersResult.data.length > 0) {
                console.log('第一个manager记录:', managersResult.data[0])
                const openids = managersResult.data.map(item => item.openid)
                console.log('所有openid列表:', openids)
            } else {
                console.log('managers集合为空')
            }
        } catch (error) {
            console.error('获取managers数据失败:', error)
        }

        // 测试greetings云函数的逻辑
        try {
            const managers = db.collection('managers')
            const managersResult = await managers.get()
            const managersList = managersResult.data.map(item => item.openid)
            console.log('模拟greetings函数的managersList:', managersList)
        } catch (error) {
            console.error('模拟greetings函数失败:', error)
        }

    } catch (error) {
        console.error('测试失败:', error)
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    testManagersCollection()
}

module.exports = { testManagersCollection } 