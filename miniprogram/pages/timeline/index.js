Page({
    data: {
        weddingDate: '2025-09-20', // 示例婚礼日期
        showCurrentActivity: true,
        activities: [],
        loading: true
    },

    onLoad() {
        // 页面加载时从云数据库获取活动数据
        this.loadEventsFromCloud();
    },

    onShow() {
        // 页面显示时刷新数据
        this.loadEventsFromCloud();
    },

    // 从云数据库加载事件数据
    async loadEventsFromCloud() {
        try {
            this.setData({ loading: true });

            const result = await wx.cloud.callFunction({
                name: 'events'
            });

            if (result.result.success) {
                // 数据已经是正确的格式，直接使用
                const activities = result.result.events.map(event => ({
                    ...event,
                    status: 'pending' // 确保每个活动都有status字段
                }));

                this.setData({
                    activities: activities,
                    loading: false
                });
            } else {
                console.error('Failed to load events:', result.result.message);
                this.setData({ loading: false });
                wx.showToast({
                    title: '加载活动失败',
                    icon: 'none'
                });
            }
        } catch (error) {
            console.error('Error loading events:', error);
            this.setData({ loading: false });
            wx.showToast({
                title: '网络错误',
                icon: 'none'
            });
        }
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