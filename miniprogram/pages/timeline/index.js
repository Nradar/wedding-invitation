Page({
    data: {
        weddingDate: '2025-09-20', // 示例婚礼日期
        showCurrentActivity: true,
        activities: [
            {
                id: 1,
                startTime: '00:00',
                endTime: '08:00',
                location: '新娘家',
                project: '新娘化妆',
                content: '新娘开始化妆准备，专业化妆师精心打造美丽妆容',
                remarks: '请提前准备好化妆用品',
                icon: '💄',
                status: 'pending' // pending, current, completed
            },
            {
                id: 2,
                startTime: '06:00',
                endTime: '08:00',
                location: '新郎家',
                project: '新郎准备',
                content: '新郎整理着装，准备迎接人生重要时刻',
                remarks: '检查礼服是否完整',
                icon: '👔',
                status: 'pending'
            },
            {
                id: 3,
                startTime: '09:30',
                endTime: '10:30',
                location: '新娘家',
                project: '接亲仪式',
                content: '新郎前往新娘家接亲，传统仪式正式开始',
                remarks: '准备红包和接亲道具',
                icon: '🚗',
                status: 'pending'
            },
            {
                id: 4,
                startTime: '11:00',
                endTime: '12:00',
                location: '婚礼现场',
                project: '婚礼仪式',
                content: '神圣的婚礼仪式，在亲朋好友见证下交换誓言',
                remarks: '仪式开始前请保持安静',
                icon: '💒',
                status: 'pending'
            },
            {
                id: 5,
                startTime: '12:30',
                endTime: '14:00',
                location: '宴会厅',
                project: '婚宴开始',
                content: '丰盛的婚宴，与宾客共享喜悦时光',
                remarks: '请按座位安排就座',
                icon: '🍽️',
                status: 'pending'
            },
            {
                id: 6,
                startTime: '12:30',
                endTime: '15:00',
                location: '宴会厅',
                project: '敬酒环节',
                content: '新人向宾客敬酒，表达感谢之情',
                remarks: '请准备祝福语',
                icon: '🥂',
                status: 'pending'
            },
            {
                id: 7,
                startTime: '16:00',
                endTime: '17:30',
                location: '婚礼现场',
                project: '拍照留念',
                content: '与亲朋好友合影留念，记录美好瞬间',
                remarks: '请保持微笑，配合摄影师',
                icon: '📸',
                status: 'pending'
            },
            {
                id: 8,
                startTime: '18:00',
                endTime: '19:30',
                location: '宴会厅',
                project: '晚宴',
                content: '温馨的晚宴，继续庆祝这个特殊的日子',
                remarks: '晚宴后还有精彩节目',
                icon: '🌙',
                status: 'pending'
            },
            {
                id: 9,
                startTime: '20:00',
                endTime: '21:00',
                location: '宴会厅门口',
                project: '送客',
                content: '感谢宾客的到来，送别亲朋好友',
                remarks: '请有序离场，注意安全',
                icon: '👋',
                status: 'pending'
            }
        ]
    },

    onLoad() {
        // 页面加载时的逻辑
    },

    onActivityTap(e) {
        const activity = e.detail.activity;
        wx.showModal({
            title: activity.project,
            content: `时间: ${activity.startTime || activity.time} - ${activity.endTime}\n地点: ${activity.location}\n内容: ${activity.content}\n备注: ${activity.remarks}`,
            showCancel: false,
            confirmText: '知道了'
        });
    },

    onStatusUpdate(e) {
        const { activities, currentActivity, currentActivities } = e.detail;
        this.setData({
            activities: activities
        });

        if (currentActivities && currentActivities.length > 0) {
            console.log('当前活动数量:', currentActivities.length);
            currentActivities.forEach(activity => {
                console.log('当前活动:', activity.project, '地点:', activity.location);
            });
        }
    },

    toggleCurrentActivity() {
        this.setData({
            showCurrentActivity: !this.data.showCurrentActivity
        });
    },

    setWeddingDate() {
        wx.showActionSheet({
            itemList: ['今天', '明天', '昨天', '3天后', '7天后', '自定义日期'],
            success: (res) => {
                const today = new Date();
                let weddingDate = '';

                switch (res.tapIndex) {
                    case 0: // 今天
                        weddingDate = today.toISOString().split('T')[0];
                        break;
                    case 1: // 明天
                        const tomorrow = new Date(today);
                        tomorrow.setDate(today.getDate() + 1);
                        weddingDate = tomorrow.toISOString().split('T')[0];
                        break;
                    case 2: // 昨天
                        const yesterday = new Date(today);
                        yesterday.setDate(today.getDate() - 1);
                        weddingDate = yesterday.toISOString().split('T')[0];
                        break;
                    case 3: // 3天后
                        const threeDaysLater = new Date(today);
                        threeDaysLater.setDate(today.getDate() + 3);
                        weddingDate = threeDaysLater.toISOString().split('T')[0];
                        break;
                    case 4: // 7天后
                        const sevenDaysLater = new Date(today);
                        sevenDaysLater.setDate(today.getDate() + 7);
                        weddingDate = sevenDaysLater.toISOString().split('T')[0];
                        break;
                    case 5: // 自定义日期
                        // 这里可以添加日期选择器
                        wx.showToast({
                            title: '请修改代码中的weddingDate',
                            icon: 'none',
                            duration: 3000
                        });
                        return;
                }

                this.setData({
                    weddingDate: weddingDate
                });

                wx.showToast({
                    title: `婚礼日期设置为: ${weddingDate}`,
                    icon: 'success'
                });
            }
        });
    }
}); 