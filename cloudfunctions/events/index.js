// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const events = db.collection('events')

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        // 获取时间线数据
        const result = await events.get()
        if (result.data.length > 0) {
            // 返回第一个文档的timeline数组
            return {
                success: true,
                events: result.data[0].timeline || []
            }
        } else {
            return {
                success: true,
                events: []
            }
        }
    } catch (error) {
        console.error('Events function error:', error)
        return {
            success: false,
            message: 'Operation failed',
            error: error.message
        }
    }
} 