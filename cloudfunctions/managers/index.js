const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const { action, openid, name, email } = event

    // Super admin openid (Corn)
    const SUPER_ADMIN_OPENID = 'oddtMvoHhuv5eumbiFstJ1qA8CbE'

    try {
        switch (action) {
            case 'get':
                // Get all managers with full details
                const result = await db.collection('managers').get()
                return {
                    success: true,
                    managers: result.data
                }

            case 'getList':
                // Get managers list for frontend use (just openids) - 优化查询
                const listResult = await db.collection('managers').field({
                    openid: true
                }).get()
                console.log('list result', listResult)
                const managersList = listResult.data.map(item => item.openid)
                return {
                    success: true,
                    managers: managersList
                }

            case 'getUsers':
                // Get all users from surveys collection for manager selection
                const usersResult = await db.collection('surveys').get()
                const users = usersResult.data.map(user => ({
                    openid: user._openid,
                    name: user.name || '未命名用户',
                    num: user.num || 0,
                    greeting: user.greeting || ''
                }))
                console.log('getUsers Print', usersResult, '---', users)
                return {
                    success: true,
                    users: users
                }

            case 'add':
                // Add a new manager (only super admin or existing managers can add others)
                const isSuperAdmin = wxContext.OPENID === SUPER_ADMIN_OPENID
                const isManager = await checkIfManager(wxContext.OPENID)

                if (!isSuperAdmin && !isManager) {
                    return {
                        success: false,
                        message: 'Only super admin or existing managers can add new managers'
                    }
                }

                // If super admin is adding themselves and not already in the collection, add them first
                if (isSuperAdmin && openid === SUPER_ADMIN_OPENID && !isManager) {
                    await db.collection('managers').add({
                        data: {
                            openid: SUPER_ADMIN_OPENID,
                            name: 'Corn (Super Admin)',
                            email: '',
                            addedBy: 'system',
                            addedAt: new Date()
                        }
                    })
                }

                // Check if the target openid already exists
                const existingManager = await db.collection('managers').where({
                    openid: openid
                }).get()

                if (existingManager.data.length > 0) {
                    return {
                        success: false,
                        message: 'Manager already exists'
                    }
                }

                await db.collection('managers').add({
                    data: {
                        openid: openid,
                        name: name || '',
                        email: email || '',
                        addedBy: wxContext.OPENID,
                        addedAt: new Date()
                    }
                })

                return {
                    success: true,
                    message: 'Manager added successfully'
                }

            case 'update':
                // Update manager info (only super admin or existing managers can update others)
                const isSuperAdminForUpdate = wxContext.OPENID === SUPER_ADMIN_OPENID
                const isManagerForUpdate = await checkIfManager(wxContext.OPENID)
                if (!isSuperAdminForUpdate && !isManagerForUpdate) {
                    return {
                        success: false,
                        message: 'Only super admin or existing managers can update managers'
                    }
                }

                await db.collection('managers').where({
                    openid: openid
                }).update({
                    data: {
                        name: name || '',
                        email: email || '',
                        updatedBy: wxContext.OPENID,
                        updatedAt: new Date()
                    }
                })

                return {
                    success: true,
                    message: 'Manager updated successfully'
                }

            case 'remove':
                // Remove a manager (only super admin or existing managers can remove others)
                const isSuperAdminForRemove = wxContext.OPENID === SUPER_ADMIN_OPENID
                const isManagerForRemove = await checkIfManager(wxContext.OPENID)
                if (!isSuperAdminForRemove && !isManagerForRemove) {
                    return {
                        success: false,
                        message: 'Only super admin or existing managers can remove managers'
                    }
                }

                await db.collection('managers').where({
                    openid: openid
                }).remove()

                return {
                    success: true,
                    message: 'Manager removed successfully'
                }

            default:
                return {
                    success: false,
                    message: 'Invalid action'
                }
        }
    } catch (error) {
        console.error('Manager function error:', error)
        return {
            success: false,
            message: 'Operation failed',
            error: error.message
        }
    }
}

async function checkIfManager(openid) {
    try {
        const result = await db.collection('managers').where({
            openid: openid
        }).get()
        return result.data.length > 0
    } catch (error) {
        console.error('Error checking manager status:', error)
        return false
    }
} 