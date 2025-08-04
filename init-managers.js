// 初始化管理员列表脚本
// 运行此脚本将当前硬编码的管理员添加到云数据库的managers集合中

const cloud = require('wx-server-sdk')

// 初始化云开发环境
cloud.init({
    env: 'cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587' // 替换为你的云环境ID
})

const db = cloud.database()

// 当前硬编码的管理员列表
const INITIAL_MANAGERS = [
    {
        openid: 'oddtMvoHhuv5eumbiFstJ1qA8CbE',
        name: 'Corn (Super Admin)',
        email: ''
    },
    {
        openid: 'oddtMvmz7zFsPVqmSpaSddCsIk9A',
        name: 'WXT',
        email: ''
    },
    {
        openid: 'oddtMvva7zG5309LQDrtqjK_Lr8Y',
        name: 'MaoSan',
        email: ''
    }
]

async function initManagers() {
    try {
        console.log('开始初始化管理员列表...')

        // 检查managers集合是否存在，如果不存在则创建
        try {
            await db.createCollection('managers')
            console.log('创建managers集合成功')
        } catch (error) {
            if (error.message.includes('collection already exists')) {
                console.log('managers集合已存在')
            } else {
                throw error
            }
        }

        // 清空现有数据
        await db.collection('managers').where({}).remove()
        console.log('清空现有管理员数据')

        // 添加初始管理员
        const addPromises = INITIAL_MANAGERS.map((manager) => {
            return db.collection('managers').add({
                data: {
                    openid: manager.openid,
                    name: manager.name,
                    email: manager.email,
                    addedBy: 'system',
                    addedAt: new Date()
                }
            })
        })

        await Promise.all(addPromises)
        console.log('成功添加初始管理员列表')

        // 验证添加结果
        const result = await db.collection('managers').get()
        console.log('当前管理员列表:', result.data.map(item => ({
            openid: item.openid,
            name: item.name,
            email: item.email
        })))

        console.log('管理员列表初始化完成！')
    } catch (error) {
        console.error('初始化管理员列表失败:', error)
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    initManagers()
}

module.exports = { initManagers } 