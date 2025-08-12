App({
    globalData: {
        isSinglePage: null, // 是否单页模式
        autoScrollEnabled: true, // 全局自动滚动开关

        // 以上变量都不用动，以下变量是需要修改的

        // 版本号
        version: '2.3.1',

        // 云开发服务是否已下架
        isRemoved: new Date() * 1 >= 1759233600000, // 自动党，用指定时间戳来控制自动下架
        // isRemoved: false, // 手动党（为防止加载初始项目时因为没有云开发环境而报错，我先设为true，等搞好云开发环境后再把它改回false）
        magic: new Date() * 1 >= 1754977500000,

        // 婚礼日期时间
        weddingTime: '2025-09-20 17:18:00',

        // 新郎新娘信息
        couple: [{
            image: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/husband_h.jpg', // 新郎单人照
            name: '赵天成', // 姓名
            alias: '新郎', // 称谓
            number: 'XXXXXXXXXXX', // 手机号码
            birthday: '1994.06.16', // 出生日期
            wechatQr: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/wechatQRCode/赵天成qrcode.jpg'
        }, {
            image: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/images/wife_h.jpg', // 新娘单人照
            name: '王昕婷', // 姓名
            alias: '新娘', // 称谓
            number: 'XXXXXXXXXXX', // 手机号码
            birthday: '1998.03.22', // 出生日期
            wechatQr: 'cloud://cloudbase-4gj6t13x12b6fc4b.636c-cloudbase-4gj6t13x12b6fc4b-1371179587/wechatQRCode/王昕婷qrcode.jpg'
        }],

        // 发布者（自己想个你俩人的噱头组合名呗）
        publisher: 'W&Z',

        // 纪念日（如果是一见钟情的话，建议用第一次见面那天）
        anniversary: '2018.03.11',

        // 全局缓存管理器
        cache: {
            greetings: null,
            managers: null,
            events: null,
            lastUpdateTime: 0,
            cacheExpiry: 5 * 60 * 1000 // 5分钟缓存过期时间
        }
    },

    // 全局方法：禁用自动滚动
    disableAutoScroll() {
        this.globalData.autoScrollEnabled = false
    },

    // 全局方法：启用自动滚动
    enableAutoScroll() {
        this.globalData.autoScrollEnabled = true
    },

    // 全局缓存管理方法
    getCache(key) {
        const cache = this.globalData.cache
        const now = Date.now()

        if (cache[key] && (now - cache.lastUpdateTime) < cache.cacheExpiry) {
            return cache[key]
        }
        return null
    },

    setCache(key, data) {
        const cache = this.globalData.cache
        cache[key] = data
        cache.lastUpdateTime = Date.now()
    },

    clearCache() {
        const cache = this.globalData.cache
        cache.greetings = null
        cache.managers = null
        cache.events = null
        cache.lastUpdateTime = 0
    },

    // 小程序启动时，初始化云开发环境
    onLaunch() {
        !this.globalData.isRemoved && wx.cloud.init({
            env: 'cloudbase-4gj6t13x12b6fc4b', // 云开发环境ID，在云开发控制台里可以查看
            traceUser: true
        })
        // 全局设置音频策略：不与其他音频混音，进入页面播放本应用音频时暂停设备其他音频
        try {
            wx.setInnerAudioOption({
                mixWithOther: false
            })
        } catch (e) { }
    },

    // 小程序可见时，判断是否为单页模式
    onShow() {
        if (typeof this.globalData.isSinglePage !== 'boolean') { // 没有判断过是否单页模式，则判断一下
            const {
                scene
            } = wx.getEnterOptionsSync()
            this.globalData.isSinglePage = scene === 1154
        }
    }
})