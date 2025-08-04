const APP = getApp()

Page({
    data: {
        isSuperAdmin: false, // 只有Corn是超级管理员
        managers: [], // 管理员列表
        users: [], // 用户列表（从surveys获取）
        loading: true,
        showAddModal: false,
        showEditModal: false,
        showUserSelectModal: false,
        currentManager: null,
        newManager: {
            openid: '',
            name: '',
            email: ''
        },
        selectedUser: null
    },

    onLoad() {
        this.checkSuperAdmin()
        this.loadManagers()
        this.loadUsers()
    },

    // 检查是否为超级管理员（Corn）
    checkSuperAdmin() {
        const CORN_OPENID = 'oddtMvoHhuv5eumbiFstJ1qA8CbE'
        console.log('checksuper')
        wx.cloud.callFunction({
            name: 'greetings'
        }).then(({ result }) => {
            const isSuperAdmin = result.openid === CORN_OPENID
            this.setData({
                isSuperAdmin
            })

            if (!isSuperAdmin) {
                wx.showToast({
                    title: '无权限访问',
                    icon: 'error'
                })
                setTimeout(() => {
                    wx.navigateBack()
                }, 1500)
            } else {
                // If super admin, ensure they are in the managers collection
                this.ensureSuperAdminInCollection()
            }
        })
    },

    // 确保超级管理员在管理员集合中
    ensureSuperAdminInCollection() {
        const CORN_OPENID = 'oddtMvoHhuv5eumbiFstJ1qA8CbE'
        wx.cloud.callFunction({
            name: 'managers',
            data: {
                action: 'add',
                openid: CORN_OPENID,
                name: 'Corn (Super Admin)',
                email: ''
            }
        }).then(({ result }) => {
            if (result.success) {
                console.log('Super admin added to managers collection')
            } else if (result.message === 'Manager already exists') {
                console.log('Super admin already exists in managers collection')
            } else {
                console.log('Failed to ensure super admin in collection:', result.message)
            }
        }).catch((error) => {
            console.error('Error ensuring super admin in collection:', error)
        })
    },

    // 加载管理员列表
    loadManagers() {
        wx.showLoading({
            title: '加载中'
        })

        wx.cloud.callFunction({
            name: 'managers',
            data: {
                action: 'get'
            }
        }).then(({ result }) => {
            wx.hideLoading()
            if (result.success) {
                this.setData({
                    managers: result.managers,
                    loading: false
                })
            } else {
                wx.showToast({
                    title: '加载失败',
                    icon: 'error'
                })
            }
        }).catch((error) => {
            wx.hideLoading()
            wx.showToast({
                title: '加载失败',
                icon: 'error'
            })
            console.error('Load managers error:', error)
        })
    },

    // 加载用户列表
    loadUsers() {
        wx.cloud.callFunction({
            name: 'managers',
            data: {
                action: 'getUsers'
            }
        }).then(({ result }) => {
            if (result.success) {
                console.log('Loaded users:', result.users)
                this.setData({
                    users: result.users
                })
            } else {
                console.error('Failed to load users:', result.message)
            }
        }).catch((error) => {
            console.error('Load users error:', error)
        })
    },

    // 显示添加管理员模态框
    showAddManager() {
        this.setData({
            showAddModal: true,
            newManager: {
                openid: '',
                name: '',
                email: ''
            }
        })
    },

    // 显示用户选择模态框
    showUserSelectModal() {
        this.setData({
            showUserSelectModal: true
        })
    },

    // 隐藏用户选择模态框
    hideUserSelectModal() {
        this.setData({
            showUserSelectModal: false,
            selectedUser: null
        })
    },

    // 选择用户
    selectUser(e) {
        const { user } = e.currentTarget.dataset
        console.log('Selected user:', user)

        const newManagerData = {
            openid: user.openid,
            name: user.name,
            email: ''
        }

        console.log('Setting newManager data:', newManagerData)

        // First hide the user selection modal
        this.setData({
            showUserSelectModal: false
        })

        // Then show the add manager modal with pre-filled data
        setTimeout(() => {
            this.setData({
                selectedUser: user,
                newManager: newManagerData,
                showAddModal: true
            })
            console.log('Data set, modal should be visible with pre-filled data')
        }, 100)
    },

    // 隐藏添加管理员模态框
    hideAddModal() {
        this.setData({
            showAddModal: false
        })
    },

    // 显示编辑管理员模态框
    showEditManager(e) {
        const { manager } = e.currentTarget.dataset
        this.setData({
            showEditModal: true,
            currentManager: manager,
            newManager: {
                openid: manager.openid,
                name: manager.name || '',
                email: manager.email || ''
            }
        })
    },

    // 隐藏编辑管理员模态框
    hideEditModal() {
        this.setData({
            showEditModal: false,
            currentManager: null
        })
    },

    // 输入框变化处理
    onInputChange(e) {
        const { field } = e.currentTarget.dataset
        const { value } = e.detail
        this.setData({
            [`newManager.${field}`]: value
        })
    },

    // 添加管理员
    addManager() {
        const { openid, name, email } = this.data.newManager

        if (!openid.trim()) {
            wx.showToast({
                title: '请输入openid',
                icon: 'error'
            })
            return
        }

        wx.showLoading({
            title: '添加中'
        })

        wx.cloud.callFunction({
            name: 'managers',
            data: {
                action: 'add',
                openid: openid.trim(),
                name: name.trim(),
                email: email.trim()
            }
        }).then(({ result }) => {
            wx.hideLoading()
            if (result.success) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success'
                })
                this.hideAddModal()
                this.loadManagers()
            } else {
                wx.showToast({
                    title: result.message || '添加失败',
                    icon: 'error'
                })
            }
        }).catch((error) => {
            wx.hideLoading()
            wx.showToast({
                title: '添加失败',
                icon: 'error'
            })
            console.error('Add manager error:', error)
        })
    },

    // 更新管理员信息
    updateManager() {
        const { openid, name, email } = this.data.newManager

        if (!openid.trim()) {
            wx.showToast({
                title: '请输入openid',
                icon: 'error'
            })
            return
        }

        wx.showLoading({
            title: '更新中'
        })

        wx.cloud.callFunction({
            name: 'managers',
            data: {
                action: 'update',
                openid: openid.trim(),
                name: name.trim(),
                email: email.trim()
            }
        }).then(({ result }) => {
            wx.hideLoading()
            if (result.success) {
                wx.showToast({
                    title: '更新成功',
                    icon: 'success'
                })
                this.hideEditModal()
                this.loadManagers()
            } else {
                wx.showToast({
                    title: result.message || '更新失败',
                    icon: 'error'
                })
            }
        }).catch((error) => {
            wx.hideLoading()
            wx.showToast({
                title: '更新失败',
                icon: 'error'
            })
            console.error('Update manager error:', error)
        })
    },

    // 删除管理员
    deleteManager(e) {
        const { manager } = e.currentTarget.dataset

        // 防止删除自己
        wx.cloud.callFunction({
            name: 'greetings'
        }).then(({ result }) => {
            if (manager.openid === result.openid) {
                wx.showToast({
                    title: '不能删除自己',
                    icon: 'error'
                })
                return
            }

            wx.showModal({
                title: '确认删除',
                content: `确定要删除管理员 ${manager.name || manager.openid.substring(0, 8) + '...'} 吗？`,
                success: (res) => {
                    if (res.confirm) {
                        wx.showLoading({
                            title: '删除中'
                        })

                        wx.cloud.callFunction({
                            name: 'managers',
                            data: {
                                action: 'remove',
                                openid: manager.openid
                            }
                        }).then(({ result }) => {
                            wx.hideLoading()
                            if (result.success) {
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success'
                                })
                                this.loadManagers()
                            } else {
                                wx.showToast({
                                    title: result.message || '删除失败',
                                    icon: 'error'
                                })
                            }
                        }).catch((error) => {
                            wx.hideLoading()
                            wx.showToast({
                                title: '删除失败',
                                icon: 'error'
                            })
                            console.error('Delete manager error:', error)
                        })
                    }
                }
            })
        })
    },

    // 刷新列表
    refreshManagers() {
        this.loadManagers()
    },

    // 阻止事件冒泡
    stopPropagation() {
        // 空函数，用于阻止事件冒泡
    },

    // 返回上一页
    goBack() {
        wx.navigateBack()
    }
}) 