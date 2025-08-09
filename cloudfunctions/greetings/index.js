// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const MAX_LIMIT = 100
const db = cloud.database()
const _ = db.command
const surveys = db.collection('surveys')

// 云函数入口函数
exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext()

    try {
        // 优化查询：只获取有祝福语的记录，并按时间倒序排列
        const collection = surveys.where({
            greeting: _.not(_.eq(''))
        }).orderBy('_createTime', 'desc')

        const { total } = await collection.count()

        // 如果数据量不大，直接获取所有数据
        if (total <= MAX_LIMIT) {
            const result = await collection.limit(MAX_LIMIT).get()
            return {
                greetings: result.data.map(({ _id, name, greeting }) => ({ _id, name, greeting })),
                openid: OPENID,
                total: total
            }
        }

        // 如果数据量大，分批获取
        const batchTimes = Math.ceil(total / MAX_LIMIT)
        const tasks = []
        for (let i = 0; i < batchTimes; i++) {
            tasks.push(collection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get())
        }

        const results = await Promise.all(tasks)
        const greetings = results.reduce((acc, cur) => {
            return acc.concat(cur.data.map(({ _id, name, greeting }) => ({ _id, name, greeting })))
        }, [])

        return {
            greetings: greetings,
            openid: OPENID,
            total: total
        }
    } catch (error) {
        console.error('Greetings function error:', error)
        return {
            greetings: [],
            openid: OPENID,
            total: 0,
            error: error.message
        }
    }
}