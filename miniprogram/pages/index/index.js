const {
    genLocation
} = require('../../common/utils')

// 管理员openid列表现在从云端获取，不再硬编码

const APP = getApp()
const isRemoved = APP.globalData.isRemoved


Page({
    data: {
        ...APP.globalData,
        isManager: false, // 当前用户是否为管理员
        isSuperAdmin: false, // 当前用户是否为超级管理员（Corn）
        managers: [], // 管理员列表从云端获取
        musicIsPaused: false, // 是否暂停背景音乐
        activeIdx: isRemoved ? 0 : -1, // 祝福语轮播用，当前显示的祝福语索引值
        form: { // 表单信息
            name: '',
            num: '',
            greeting: ''
        },
        weddingTimeStr: [''], // 格式化的婚礼日期列表

        // 以上变量都不用动，以下变量是需要手动修改的

        // 是否显示彩蛋（由于彩蛋我没有改动，显示的还是我本人的内容，所以我把它默认隐藏起来，方便别人抄作业）
        showEggs: true,

        // 祝福语列表
        greetings: isRemoved ? [
            // 云开发下架后显示的祝福语数据，可以在云开发环境销毁前把数据库的数据导出来并贴到这里
            {
                name: '新郎 & 新娘',
                num: 2,
                greeting: '欢迎大家来见证我们的幸福时刻，我们婚礼上见哦~'
            }, {
                name: '伴郎 & 伴娘',
                num: 2,
                greeting: '祝帅气的新郎和美丽的新娘新婚快乐~白头偕老💐'
            }
        ] : [],

        // 背景音乐（默认用陈奕迅的《I DO》，想换的话自己去找音频资源，我是在「婚贝」上找的）
        music: {
            // src: 'https://amp3.hunbei.com/mp3/IDo_ChenYiXun.mp3', // 音频资源链接
            src: '',
            name: '快鱼仔', // 歌名
            singer: '卢广仲' // 歌手名
        },

        // 酒店信息（通过页面上的「选择位置并获取定位信息」按钮可以获取定位信息，发布前记得把按钮注释起来）
        location: genLocation([{
            name: '婚宴地址：格乐利雅GALLERIA艺术中心(大宁店)',
            address: '详细地址：上海市静安区汶水路40号',
            latitude: 31.2942468,
            longitude: 121.4590051
        }])[0],

        // 图片信息（其实就是婚纱照了）
        imgs: {
            // 封面图
            cover: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz.jpg',

            // 音乐封面
            poster: 'https://res.wx.qq.com/t/fed_upload/d811d254-e5d6-4c19-9ff8-77c4b6128137/poster.jpg',

            // 新郎独照
            husband: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/husband.jpeg',

            // 新娘独照
            wife: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/wife.jpeg',

            // 轮播图1
            swiper1: [
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_v_4.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_v_5.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_v_3.jpg'
            ],

            // 连续图
            series: [
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_h_4.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_h_5.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_h_6.jpg'
            ],

            // 左上图
            leftUp: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_men_s_1.jpg',

            // 左下图
            leftDown: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_men_l_1.jpg',

            // 四宫图
            map: [
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_men_1.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_men_2.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_men_3.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_men_4.jpg'
            ],

            // 轮播图2
            swiper2: [
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_cb_1.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_cb_2.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_cb_3.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_cb_4.jpg'
            ],

            // 轮播图2下方常驻图
            swiper2Static: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/hsz_cb_l.jpg',

            // 轮播图3
            swiper3: [
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/lz_3.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/lz_4.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/lz_1.jpg',
                'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/lz_2.jpg'
            ],

            // 结尾图1
            // end1: 'https://res.wx.qq.com/t/fed_upload/9b5bad9c-216b-4fd5-a3da-01bdb3a5e832/end1.jpg',

            // 结尾图2
            // end2: 'https://res.wx.qq.com/t/fed_upload/9b5bad9c-216b-4fd5-a3da-01bdb3a5e832/end2.jpg'
        },

        // 婚礼时间线事件
        timelineEvents: [
            {
                id: 'guests_arriving',
                project: '宾客到场',
                startTime: '17:18',
            },
            {
                id: 'reception',
                project: '婚礼晚宴',
                startTime: '18:18',
            }
        ],

        // 倒计时相关数据
        isWeddingUpcoming: false,
        daysUntilWedding: 0
    },

    // 小程序加载时，拉取表单信息并填充，以及格式化各种婚礼时间
    onLoad() {
        this.timer = null
        this.music = null
        this.isSubmit = false

        if (!isRemoved) {
            const db = wx.cloud.database()
            db.collection('surveys').get({
                success: res => {
                    if (res.data.length) {
                        const {
                            name,
                            num,
                            greeting
                        } = res.data[0]
                        this.setData({
                            form: {
                                name,
                                num,
                                greeting
                            }
                        })
                    }
                }
            })
        }

        this.lunisolarDate = this.selectComponent('#calendar').lunisolarDate
        this.setData({
            weddingTimeStr: [
                this.lunisolarDate.format('YYYY-MM-DD HH:mm'),
                this.lunisolarDate.getSeason(),
                this.lunisolarDate.format('YYYY年MM月DD号  HH:mm'),
                this.lunisolarDate.format('农历lMlD  dddd'),
                this.lunisolarDate.format('YYYY年MM月DD号')
            ]
        })

        // 计算倒计时
        this.calculateCountdown()

        // 设置每日更新倒计时的定时器
        this.countdownTimer = setInterval(() => {
            this.calculateCountdown()
        }, 24 * 60 * 60 * 1000) // 每24小时更新一次
    },

    // 小程序卸载时，取消自动拉取祝福语定时器，销毁背景音乐
    onUnload() {
        if (this.timer !== null) {
            clearInterval(this.timer)
            this.timer = null
        }

        if (this.countdownTimer !== null) {
            clearInterval(this.countdownTimer)
            this.countdownTimer = null
        }

        if (this.music !== null) {
            this.music.destroy()
            this.music = null
        }
    },

    // 小程序可见时，拉取祝福语，并设置定时器每20s重新拉取一次祝福语
    onShow() {
        if (!isRemoved) {
            this.getGreetings()

            this.timer === null && (this.timer = setInterval(() => this.getGreetings(), 20000));
        }
    },

    // 小程序不可见时，取消自动拉取祝福语定时器
    onHide() {
        if (this.timer !== null) {
            clearInterval(this.timer)
            this.timer = null
        }
    },

    // 小程序可用时，初始化背景音乐并自动播放
    onReady() {
        if (this.music === null) {
            this.music = wx.createInnerAudioContext({
                useWebAudioImplement: false
            })
            // this.music.src = this.data.music.src
            //load music from cloudstorage
            wx.cloud.getTempFileURL({
                fileList: ['cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/快魚仔.mp3'],
                success: res => {
                    this.setData({
                        'music.src': res.fileList[0].tempFileURL
                    })
                    this.music.src = res.fileList[0].tempFileURL
                }
            })
            this.music.loop = true
            this.music.autoplay = true
        }
    },

    // 分享到会话
    onShareAppMessage() {
        return {
            title: '好久不见，婚礼见٩(๑^o^๑)۶',
            imageUrl: '../../images/shareAppMsg.jpg'
        }
    },

    // 分享到朋友圈
    onShareTimeline() {
        return {
            title: '好久不见，婚礼见٩(๑^o^๑)۶',
            imageUrl: '../../images/shareTimeline.jpg'
        }
    },

    // 点击右上角音乐按钮控制音频播放和暂停
    toggleMusic() {
        if (this.music.paused) {
            this.music.play()
            this.setData({
                musicIsPaused: false
            })
        } else {
            this.music.pause()
            this.setData({
                musicIsPaused: true
            })
        }
    },

    // 打开酒店定位
    openLocation() {
        const {
            latitude,
            longitude,
            name,
            address
        } = this.data.location
        wx.openLocation({
            latitude,
            longitude,
            name,
            address
        })
    },

    // 仅用于获取定位信息，获取后会打印到控制台并写入到粘贴板，正式发布时记得注释起来
    chooseLocation() {
        wx.chooseLocation({
            success(res) {
                wx.setClipboardData({
                    data: JSON.stringify(res),
                    success() {
                        wx.showToast({
                            title: '已写入剪贴板'
                        })
                        console.log(res)
                    }
                })
            }
        })
    },

    // 呼叫
    call(e) {
        wx.makePhoneCall({
            phoneNumber: e.target.dataset.phone
        })
    },

    // 提交表单
    submit(e) {
        if (!this.isSubmit) {
            const {
                name,
                num
            } = e.detail.value
            if (name === '') {
                wx.showToast({
                    title: '要写上名字哦~',
                    icon: 'error'
                })
            } else if (num === '') {
                wx.showToast({
                    title: '要写上人数哦~',
                    icon: 'error'
                })
            } else if (!/^[1-9]\d*$/.test(num)) {
                wx.showToast({
                    title: '人数不对哦~',
                    icon: 'error'
                })
            } else {
                if (isRemoved) {
                    wx.showToast({
                        title: '婚礼结束了哦~'
                    })
                } else {
                    this.isSubmit = true
                    const wording = this.data.form.name ? '更新' : '提交';
                    wx.showLoading({
                        title: `${wording}中`
                    })
                    wx.cloud.callFunction({
                        name: 'surveys',
                        data: e.detail.value
                    }).then(({
                        result: {
                            name,
                            num,
                            greeting,
                            _id
                        }
                    }) => {
                        const greetings = this.data.greetings
                        !greetings.some(item => {
                            if (item._id === _id) { // 如果找到了该祝福语，更新之
                                item.greeting = greeting
                                return true
                            }
                            return false
                        }) && greetings.push({ // 如果没有找到，追加之
                            name,
                            greeting,
                            _id
                        })
                        this.setData({
                            form: {
                                name: '',
                                num: '',
                                greeting: ''
                            },
                            greetings
                        })
                        this.isSubmit = false
                        wx.showToast({
                            title: `${wording}成功`,
                            icon: 'success'
                        })
                    })
                }
            }
        }
    },

    // 获取祝福语和管理员列表
    getGreetings() {
        // Get greetings
        wx.cloud.callFunction({
            name: 'greetings'
        }).then(({
            result: {
                greetings,
                openid
            }
        }) => {
            console.log('当前用户 openid:', openid)

            // Get managers list separately
            wx.cloud.callFunction({
                name: 'managers',
                data: {
                    action: 'getList'
                }
            }).then(({ result: managersResult }) => {
                console.log('Managers result:', managersResult)
                const managers = managersResult.success ? managersResult.managers : []
                console.log('管理员列表:', managers)
                console.log('管理员列表类型:', typeof managers)
                console.log('管理员列表长度:', managers ? managers.length : 'undefined')

                const isManager = managers && Array.isArray(managers) && managers.indexOf(openid) > -1
                const CORN_OPENID = 'oddtMvoHhuv5eumbiFstJ1qA8CbE'
                const isSuperAdmin = openid === CORN_OPENID
                console.log('isManager: ', isManager, 'isSuperAdmin: ', isSuperAdmin, greetings.length)

                this.setData({
                    isManager,
                    isSuperAdmin,
                    managers,
                    greetings,
                    ...(this.data.activeIdx === -1 ? { activeIdx: 0 } : {})
                })
            }).catch((error) => {
                console.error('Error getting managers:', error)
                // Set default values if managers call fails
                this.setData({
                    isManager: false,
                    isSuperAdmin: openid === 'oddtMvoHhuv5eumbiFstJ1qA8CbE',
                    managers: [],
                    greetings,
                    ...(this.data.activeIdx === -1 ? { activeIdx: 0 } : {})
                })
            })
        }).catch((error) => {
            console.error('Error getting greetings:', error)
        })
    },

    // 轮播动画结束时切换到下一个
    onAnimationend() {
        // 计算总长度（引导短语 + 祝福语）
        const totalLength = this.data.greetings.length + 1 // +1 是因为有引导短语
        this.setData({
            activeIdx: (this.data.activeIdx === totalLength - 1) ? 0 : (this.data.activeIdx + 1)
        })
    },

    // 跳转到联系新郎新娘板块
    goPhone() {
        wx.pageScrollTo({
            selector: '.phone',
            offsetTop: -200
        })
    },

    // 跳转到写表单板块
    goWrite() {
        wx.pageScrollTo({
            selector: '.form',
            offsetTop: -200
        })
    },

    // 跳转到公告栏页面
    goInfo() {
        wx.navigateTo({
            url: '../info/index'
        })
    },

    // 跳转到管理员管理页面（仅超级管理员可见）
    goAdmin() {
        if (this.data.isSuperAdmin) {
            wx.navigateTo({
                url: '../admin/index'
            })
        } else {
            wx.showToast({
                title: '无权限访问',
                icon: 'error'
            })
        }
    },

    // 添加管理员（仅管理员可用）
    addManager() {
        if (!this.data.isManager) {
            wx.showToast({
                title: '只有管理员才能添加管理员',
                icon: 'error'
            })
            return
        }

        wx.showModal({
            title: '添加管理员',
            content: '请输入要添加的管理员openid',
            editable: true,
            placeholderText: '请输入openid',
            success: (res) => {
                if (res.confirm && res.content) {
                    wx.showLoading({
                        title: '添加中'
                    })
                    wx.cloud.callFunction({
                        name: 'managers',
                        data: {
                            action: 'add',
                            openid: res.content
                        }
                    }).then(({ result }) => {
                        wx.hideLoading()
                        if (result.success) {
                            wx.showToast({
                                title: '添加成功',
                                icon: 'success'
                            })
                            // 重新获取管理员列表
                            this.getGreetings()
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
                }
            }
        })
    },

    // 移除管理员（仅管理员可用）
    removeManager() {
        if (!this.data.isManager) {
            wx.showToast({
                title: '只有管理员才能移除管理员',
                icon: 'error'
            })
            return
        }

        if (this.data.managers.length <= 1) {
            wx.showToast({
                title: '至少需要保留一个管理员',
                icon: 'error'
            })
            return
        }

        const managerList = this.data.managers.map(openid => ({
            name: openid.substring(0, 8) + '...',
            value: openid
        }))

        wx.showActionSheet({
            itemList: managerList.map(item => item.name),
            success: (res) => {
                const selectedOpenid = managerList[res.tapIndex].value
                wx.showModal({
                    title: '确认移除',
                    content: `确定要移除管理员 ${managerList[res.tapIndex].name} 吗？`,
                    success: (modalRes) => {
                        if (modalRes.confirm) {
                            wx.showLoading({
                                title: '移除中'
                            })
                            wx.cloud.callFunction({
                                name: 'managers',
                                data: {
                                    action: 'remove',
                                    openid: selectedOpenid
                                }
                            }).then(({ result }) => {
                                wx.hideLoading()
                                if (result.success) {
                                    wx.showToast({
                                        title: '移除成功',
                                        icon: 'success'
                                    })
                                    // 重新获取管理员列表
                                    this.getGreetings()
                                } else {
                                    wx.showToast({
                                        title: result.message || '移除失败',
                                        icon: 'error'
                                    })
                                }
                            }).catch((error) => {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '移除失败',
                                    icon: 'error'
                                })
                                console.error('Remove manager error:', error)
                            })
                        }
                    }
                })
            }
        })
    },

    // 计算倒计时
    calculateCountdown() {
        const weddingDate = this.data.weddingTime
        const today = new Date()

        if (weddingDate) {
            const wedding = new Date(weddingDate)
            const todayStr = today.toISOString().split('T')[0]
            const weddingStr = wedding.toISOString().split('T')[0]
            const isWeddingUpcoming = todayStr < weddingStr

            // 计算距离婚礼的天数
            let daysUntilWedding = 0
            if (isWeddingUpcoming) {
                const todayTime = new Date(todayStr).getTime()
                const weddingTime = new Date(weddingStr).getTime()
                const diffTime = weddingTime - todayTime
                daysUntilWedding = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            }

            this.setData({
                isWeddingUpcoming: isWeddingUpcoming,
                daysUntilWedding: daysUntilWedding
            })
        }
    }
})