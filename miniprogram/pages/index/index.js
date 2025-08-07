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
        daysUntilWedding: 0,

        // 自动滚动相关数据
        isAutoScrolling: false, // 是否正在自动滚动
        autoScrollPaused: true, // 是否暂停自动滚动（初始为true，等待延迟后启动）
        currentScrollTop: 0, // 当前滚动位置
        maxScrollTop: 0 // 页面最大滚动高度
    },

    // 小程序加载时，拉取表单信息并填充，以及格式化各种婚礼时间
    onLoad() {
        this.timer = null
        this.music = null
        this.isSubmit = false
        this.autoScrollTimer = null
        this.userInteractionTimer = null
        this.autoScrollInitialized = false
        this.formFocused = false

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
                this.lunisolarDate.format('YYYY年MM月DD号  HH:mm'),
                this.lunisolarDate.format('农历lMlD  dddd'),
                this.lunisolarDate.format('YYYY年MM月DD号')
            ]
        })

        // 计算倒计时
        this.calculateCountdown()

        // 设置每日更新倒计时的定时器
        this.countdownTimer = setInterval(() => {
            this.calculateCountdown()
        }, 24 * 60 * 60 * 1000) // 每24小时更新一次

        // 初始化自动滚动
        this.initAutoScroll()
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

        // 清理自动滚动相关定时器
        this.stopAutoScroll()
        if (this.userInteractionTimer !== null) {
            clearTimeout(this.userInteractionTimer)
            this.userInteractionTimer = null
        }
    },

    // 小程序可见时，拉取祝福语，并设置定时器每20s重新拉取一次祝福语
    onShow() {
        if (!isRemoved) {
            this.getGreetings()

            this.timer === null && (this.timer = setInterval(() => this.getGreetings(), 20000));
        }

        // 重新启用自动滚动（当返回到首页时）
        APP.enableAutoScroll()

        // 恢复自动滚动（只有在已经初始化过且不是暂停状态时才恢复）
        if (this.autoScrollInitialized && !this.data.autoScrollPaused) {
            this.startAutoScroll()
        }
    },

    // 小程序不可见时，取消自动拉取祝福语定时器
    onHide() {
        if (this.timer !== null) {
            clearInterval(this.timer)
            this.timer = null
        }

        // 暂停自动滚动
        this.stopAutoScroll()
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
            this.music.loop = false
            this.music.autoplay = false
        }

        // 获取页面最大滚动高度
        this.getPageScrollInfo()
    },

    // 页面滚动事件处理
    onPageScroll(e) {
        const { scrollTop } = e
        const { currentScrollTop } = this.data

        // 检测是否是用户手动滚动（滚动距离较大）
        if (Math.abs(scrollTop - currentScrollTop) > 5) {
            this.handleUserInteraction()
        }

        this.setData({
            currentScrollTop: scrollTop
        })
    },

    // 获取页面滚动信息
    getPageScrollInfo() {
        // 延迟获取页面信息，确保页面完全渲染
        setTimeout(() => {
            // 获取系统信息
            wx.getSystemInfo({
                success: (systemInfo) => {
                    // 使用选择器获取底部元素的高度
                    const query = wx.createSelectorQuery()
                    query.select('.bottom-element').boundingClientRect((bottomRect) => {
                        if (bottomRect) {
                            // 使用底部元素的位置来计算最大滚动高度
                            const maxScrollTop = Math.max(0, bottomRect.bottom - systemInfo.windowHeight)
                            this.setData({
                                maxScrollTop: maxScrollTop
                            })
                            // console.log('页面最大滚动高度:', maxScrollTop, '底部元素位置:', bottomRect.bottom, '窗口高度:', systemInfo.windowHeight)
                        } else {
                            // 如果找不到底部元素，使用备选方案
                            query.selectAll('view').boundingClientRect((rects) => {
                                if (rects && rects.length > 0) {
                                    // 找到最底部的元素
                                    let maxBottom = 0
                                    rects.forEach(rect => {
                                        if (rect && rect.bottom) {
                                            maxBottom = Math.max(maxBottom, rect.bottom)
                                        }
                                    })

                                    const maxScrollTop = Math.max(0, maxBottom - systemInfo.windowHeight)
                                    this.setData({
                                        maxScrollTop: maxScrollTop
                                    })
                                    // console.log('使用备选方案 - 页面最大滚动高度:', maxScrollTop, '最大底部位置:', maxBottom, '窗口高度:', systemInfo.windowHeight)
                                } else {
                                    // 如果都找不到，使用默认值
                                    const defaultHeight = 9600 // 默认页面高度
                                    const maxScrollTop = Math.max(0, defaultHeight - systemInfo.windowHeight)
                                    // console.log('使用默认高度:', maxScrollTop, '窗口高度:', systemInfo.windowHeight)
                                    this.setData({
                                        maxScrollTop: maxScrollTop
                                    })
                                }
                            }).exec()
                        }
                    }).exec()
                }
            })
        }, 1000)
    },

    // 初始化自动滚动
    initAutoScroll() {
        // console.log('初始化自动滚动')
        // 确保初始状态为暂停
        this.setData({
            autoScrollPaused: true,
            isAutoScrolling: false
        })

        // 延迟启动自动滚动，等待页面完全加载
        setTimeout(() => {
            // console.log('延迟后启动自动滚动')
            this.autoScrollInitialized = true
            this.setData({
                autoScrollPaused: false
            })
            this.startAutoScroll()
        }, 3000)
    },

    // 开始自动滚动
    startAutoScroll() {
        // console.log('开始自动滚动, autoScrollPaused:', this.data.autoScrollPaused)
        if (this.data.autoScrollPaused || this.formFocused || !APP.globalData.autoScrollEnabled) return

        this.stopAutoScroll() // 先停止之前的滚动

        this.autoScrollTimer = setInterval(() => {
            // 再次检查全局开关
            if (!APP.globalData.autoScrollEnabled) {
                this.stopAutoScroll()
                return
            }

            const { currentScrollTop, maxScrollTop } = this.data
            // console.log('自动滚动中, currentScrollTop:', currentScrollTop, 'maxScrollTop:', maxScrollTop)

            // 如果maxScrollTop为0，使用一个默认值
            let effectiveMaxScrollTop = maxScrollTop
            if (maxScrollTop <= 0) {
                effectiveMaxScrollTop = 3000 // 使用默认滚动高度
                console.log('使用默认滚动高度:', effectiveMaxScrollTop)
            }

            if (currentScrollTop >= effectiveMaxScrollTop) {
                // 滚动到底部，停止自动滚动
                console.log('滚动到底部，停止自动滚动')
                this.stopAutoScroll()
            } else {
                // 继续向下滚动，每次滚动6px使滚动更明显
                const newScrollTop = Math.min(currentScrollTop + 6, effectiveMaxScrollTop)
                // console.log('滚动到:', newScrollTop)
                this.smoothScrollTo(newScrollTop)
            }
        }, 100) // 每100ms滚动3px，实现平滑滚动

        this.setData({
            isAutoScrolling: true
        })
        // console.log('自动滚动已启动')
    },

    // 停止自动滚动
    stopAutoScroll() {
        if (this.autoScrollTimer !== null) {
            clearInterval(this.autoScrollTimer)
            this.autoScrollTimer = null
        }
        this.setData({
            isAutoScrolling: false
        })
    },

    // 平滑滚动到指定位置
    smoothScrollTo(targetScrollTop) {
        wx.pageScrollTo({
            scrollTop: targetScrollTop,
            duration: 100 // 100ms的滚动动画，更平滑
        })
    },

    // 处理用户交互
    handleUserInteraction() {
        // 停止自动滚动
        this.stopAutoScroll()
        this.setData({
            autoScrollPaused: true
        })

        // 清除之前的定时器
        if (this.userInteractionTimer !== null) {
            clearTimeout(this.userInteractionTimer)
        }

        // 10秒后重新开始自动滚动
        this.userInteractionTimer = setTimeout(() => {
            this.setData({
                autoScrollPaused: false
            })
            this.startAutoScroll()
        }, 10000) // 10秒
    },

    // 表单获得焦点
    onFormFocus() {
        console.log('表单获得焦点，停止自动滚动')
        this.formFocused = true
        this.stopAutoScroll()
        this.setData({
            autoScrollPaused: true
        })
    },

    // 表单失去焦点
    onFormBlur() {
        console.log('表单失去焦点，恢复自动滚动')
        this.formFocused = false
        // 延迟恢复自动滚动，给用户一些时间
        setTimeout(() => {
            if (!this.formFocused) {
                this.setData({
                    autoScrollPaused: false
                })
                this.startAutoScroll()
            }
        }, 5000) // 5秒后恢复
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
        this.handleUserInteraction() // 用户交互

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
        this.handleUserInteraction() // 用户交互

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
        this.handleUserInteraction() // 用户交互

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
        this.handleUserInteraction() // 用户交互

        wx.makePhoneCall({
            phoneNumber: e.target.dataset.phone
        })
    },

    // 提交表单
    submit(e) {
        this.handleUserInteraction() // 用户交互

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

    // 跳转到主页日期板块
    goCalendar() {
        this.handleUserInteraction() // 用户交互

        wx.pageScrollTo({
            selector: '.calendar-event',
            offsetTop: 20
        })
    },

    // 跳转到写表单板块
    goWrite() {
        this.handleUserInteraction() // 用户交互

        wx.pageScrollTo({
            selector: '.form',
            offsetTop: -200
        })
    },

    // 跳转到公告栏页面
    goInfo() {
        this.handleUserInteraction() // 用户交互
        APP.disableAutoScroll() // 禁用自动滚动

        wx.navigateTo({
            url: '../info/index'
        })
    },

    // 跳转到管理员管理页面（仅超级管理员可见）
    goAdmin() {
        this.handleUserInteraction() // 用户交互
        APP.disableAutoScroll() // 禁用自动滚动

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
        this.handleUserInteraction() // 用户交互

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
        this.handleUserInteraction() // 用户交互

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