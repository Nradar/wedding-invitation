const { getDateStringInTimeZone } = require("../../common/utils");

Component({
    properties: {
        // 婚礼日期，默认为今天
        weddingDate: {
            type: String,
            value: ''
        },
        // 是否显示当前活动高亮
        showCurrentActivity: {
            type: Boolean,
            value: true
        },
        // 活动列表
        activities: {
            type: Array,
            value: []
        }
    },

    data: {
        currentTime: '',
        currentActivity: null,
        isWeddingDay: false,
        isWeddingPassed: false,
        daysUntilWedding: 0,
        isWeddingUpcoming: false
    },

    lifetimes: {
        attached() {
            this.initTimeline();
            // 每分钟更新一次当前时间
            this.timer = setInterval(() => {
                this.updateCurrentTime();
            }, 60000);
        },

        detached() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    },

    pageLifetimes: {
        show() {
            // 页面显示时更新状态
            this.updateActivityStatus();
        }
    },

    methods: {
        initTimeline() {
            this.updateCurrentTime();
            this.checkWeddingDay();
            this.updateActivityStatus();
        },

        updateCurrentTime() {
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5); // 获取 HH:MM 格式

            this.setData({
                currentTime: currentTime
            });

            this.updateActivityStatus();
        },

        checkWeddingDay() {
            const weddingDate = this.properties.weddingDate;
            const today = new Date();

            if (weddingDate) {
                const wedding = new Date(weddingDate);
                const todayStr = getDateStringInTimeZone(today, 'America/Toronto');
                const weddingStr = getDateStringInTimeZone(wedding, 'Asia/Shanghai');
                const isWeddingDay = todayStr === weddingStr;
                const isWeddingPassed = todayStr > weddingStr;
                const isWeddingUpcoming = todayStr < weddingStr;

                // 计算距离婚礼的天数
                let daysUntilWedding = 0;
                if (isWeddingUpcoming) {
                    const todayTime = new Date(todayStr).getTime();
                    const weddingTime = new Date(weddingStr).getTime();
                    const diffTime = weddingTime - todayTime;
                    daysUntilWedding = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                }

                console.log(todayStr, weddingStr, isWeddingDay, isWeddingPassed, isWeddingUpcoming, daysUntilWedding);

                this.setData({
                    isWeddingDay: isWeddingDay,
                    isWeddingPassed: isWeddingPassed,
                    isWeddingUpcoming: isWeddingUpcoming,
                    daysUntilWedding: daysUntilWedding
                });
            } else {
                // 如果没有设置婚礼日期，默认今天就是婚礼日
                this.setData({
                    isWeddingDay: true,
                    isWeddingPassed: false,
                    isWeddingUpcoming: false,
                    daysUntilWedding: 0
                });
            }
        },

        updateActivityStatus() {
            if (!this.data.isWeddingDay && !this.data.isWeddingPassed && !this.data.isWeddingUpcoming) {
                return;
            }

            const currentTime = this.data.currentTime;
            const activities = this.properties.activities.map(activity => {
                const activityStartTime = activity.startTime || activity.time; // 兼容旧版本
                const activityEndTime = activity.endTime || this.getDefaultEndTime(activityStartTime);
                let status = 'pending';

                // 如果婚礼已过，所有活动都标记为已完成
                if (this.data.isWeddingPassed) {
                    status = 'completed';
                } else if (this.data.isWeddingUpcoming) {
                    // 如果婚礼还没到，所有活动都标记为待进行
                    status = 'pending';
                } else {
                    // 检查活动状态
                    const timeToStart = this.getTimeDifference(activityStartTime, currentTime);
                    const timeToEnd = this.getTimeDifference(activityEndTime, currentTime);

                    if (timeToStart <= 30 && timeToStart >= -30) {
                        // 活动开始前30分钟到开始时间
                        status = 'current';
                    } else if (timeToStart > 30) {
                        // 活动还未开始
                        status = 'pending';
                    } else if (timeToEnd > 0) {
                        // 活动正在进行中
                        status = 'current';
                    } else {
                        // 活动已结束
                        status = 'completed';
                    }
                }

                return {
                    ...activity,
                    status: status
                };
            });

            // 获取所有当前进行的活动（支持同步活动）
            const currentActivities = activities.filter(activity => activity.status === 'current');

            this.setData({
                currentActivity: currentActivities.length > 0 ? currentActivities : null
            });

            // 触发事件通知父组件活动状态更新
            this.triggerEvent('statusupdate', {
                activities: activities,
                currentActivity: currentActivities.length > 0 ? currentActivities[0] : null,
                currentActivities: currentActivities
            });
        },

        compareTime(time1, time2) {
            const [hours1, minutes1] = time1.split(':').map(Number);
            const [hours2, minutes2] = time2.split(':').map(Number);

            const totalMinutes1 = hours1 * 60 + minutes1;
            const totalMinutes2 = hours2 * 60 + minutes2;

            return totalMinutes1 - totalMinutes2;
        },

        getTimeDifference(time1, time2) {
            const [hours1, minutes1] = time1.split(':').map(Number);
            const [hours2, minutes2] = time2.split(':').map(Number);

            const totalMinutes1 = hours1 * 60 + minutes1;
            const totalMinutes2 = hours2 * 60 + minutes2;

            return totalMinutes1 - totalMinutes2;
        },

        getDefaultEndTime(startTime) {
            // 默认活动持续时间为2小时
            const [hours, minutes] = startTime.split(':').map(Number);
            const endHours = (hours + 2) % 24;
            return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        },

        onActivityTap(e) {
            const activityId = e.currentTarget.dataset.id;
            const activity = this.properties.activities.find(item => item.id === activityId);

            this.triggerEvent('activitytap', {
                activity: activity
            });
        }
    }
});
