Page({
    data: {
        weddingDate: '2025-09-20', // 示例婚礼日期
        showCurrentActivity: true,
        activities: [
            {
                id: 1,
                startTime: '07:30',
                endTime: '08:00',
                location: '酒店总统包房',
                project: '新娘准备',
                content: '新娘起床洗漱，记得用早餐；伴娘准备游戏；家人准备莲子羹',
                remarks: '',
                icon: '💄',
                status: 'pending'
            },
            {
                id: 2,
                startTime: '08:00',
                endTime: '09:00',
                location: '新郎家（东海别墅）',
                project: '新郎准备',
                content: '检查好各类结婚道具，新郎出门前准备好迎亲用的红包及香烟喜糖',
                remarks: '',
                icon: '👔',
                status: 'pending'
            },
            {
                id: 3,
                startTime: '08:00',
                endTime: '09:00',
                location: '酒店总统包房',
                project: '化妆师到达',
                content: '化妆师为新娘、喜妈妈化妆',
                remarks: '确保等按照实际情况准备',
                icon: '💄',
                status: 'pending'
            },
            {
                id: 4,
                startTime: '09:00',
                endTime: '09:28',
                location: '',
                project: '摄影摄像到达',
                content: '拍摄新娘化妆花絮',
                remarks: '无晨拍',
                icon: '📷',
                status: 'pending'
            },
            {
                id: 5,
                startTime: '09:00',
                endTime: '09:28',
                location: '新郎家（东海别墅）',
                project: '婚车集合',
                content: '婚车停在新郎家小区内，提前到达扎好婚车',
                remarks: '提前一天到格乐丽雅取新娘手捧花、胸花、婚车车头花、跟车礼花及丝带等',
                icon: '🚗',
                status: 'pending'
            },
            {
                id: 6,
                startTime: '09:28',
                endTime: '10:28',
                location: '酒店总统包房',
                project: '新郎出发',
                content: '在酒店楼下，摄影摄像拍摄新郎花絮。新郎亲人朋友及伴娘过门，新郎伴郎共同过去后，新娘家接待来客',
                remarks: '新郎提前准备：小红包若干；新娘提前准备：游戏道具',
                icon: '🚶‍♂️',
                status: 'pending'
            },
            {
                id: 7,
                startTime: '09:28',
                endTime: '10:28',
                location: '酒店总统包房',
                project: '求婚',
                content: '新郎单膝跪地向新娘献手捧花求婚，摄像师、摄影师捕捉精彩镜头',
                remarks: '求婚所需物品：手捧花+戒指',
                icon: '💍',
                status: 'pending'
            },
            {
                id: 8,
                startTime: '09:28',
                endTime: '10:28',
                location: '',
                project: '新郎见新娘父母',
                content: '新郎给新娘父母敬茶，并改口叫妈妈爸爸，妈妈爸爸给改口红包，摄影摄像拍摄镜头，妈妈为两位新人送上早生贵子菜，其他人员拍作休息',
                remarks: '新娘家人准备物品：红色敬茶盖碗*2套，红色洗碗*2套；新郎需准备一个全空的小红包，把新娘口中的红豆移放入其中的红包，然后贴身放好',
                icon: '🍵',
                status: 'pending'
            },
            {
                id: 9,
                startTime: '10:28',
                endTime: '12:58',
                location: '',
                project: '新娘出嫁',
                content: '新娘父母送新人到婚车旁，母亲为女儿送婚鞋，父母拥抱女儿，然后前往新郎家',
                remarks: '路上告知新郎家总管新人到时间，准备鞭炮，预留停车位',
                icon: '👰',
                status: 'pending'
            },
            {
                id: 10,
                startTime: '10:28',
                endTime: '12:58',
                location: '新郎家门口',
                project: '新郎家接亲',
                content: '在家拍一些照片。新娘给新郎父母敬茶，并改口叫妈妈爸爸，妈妈爸爸给改口红包，摄影摄像拍摄镜头，敬茶结束后新郎妈妈为两位新人送上早生贵子菜，其他人员拍作休息',
                remarks: '新郎家人准备物品：红色敬茶盖碗*2套，红色洗碗*2套，家人提前准备好生贵子菜',
                icon: '🍵',
                status: 'pending'
            },
            {
                id: 11,
                startTime: '10:28',
                endTime: '12:58',
                location: '新郎家（东海别墅）',
                project: '用餐',
                content: '午餐时间',
                remarks: '帮工作人员点外卖8位工作人员',
                icon: '🍽️',
                status: 'pending'
            },
            {
                id: 12,
                startTime: '13:18',
                endTime: '13:58',
                location: '出发去格乐利雅（汐水路40号）',
                project: '婚车出发婚礼堂',
                content: '再次确认婚礼所需物品：婚纱礼服、海报，婚纱照摆台，婚纱照相册，葡萄汁、喜糖、喜酒等自带物品是否带齐',
                remarks: '新人提前准备葡萄汁，建议买全家每日C葡萄汁',
                icon: '🚗',
                status: 'pending'
            },
            {
                id: 13,
                startTime: '13:18',
                endTime: '13:58',
                location: '',
                project: '快到了提前15分钟打电话给策划',
                content: '告知到达格乐丽雅会馆大概时间',
                remarks: '',
                icon: '📞',
                status: 'pending'
            },
            {
                id: 14,
                startTime: '13:58',
                endTime: '14:30',
                location: '格乐利雅',
                project: '到达格乐利雅',
                content: '到达后休息片刻后，新娘房换装',
                remarks: '',
                icon: '🏨',
                status: 'pending'
            },
            {
                id: 15,
                startTime: '14:00',
                endTime: '15:00',
                location: '宴会厅',
                project: '仪式堂',
                content: '仪式堂，通知宾客14:30到',
                remarks: '',
                icon: '💒',
                status: 'pending'
            },
            {
                id: 16,
                startTime: '15:30',
                endTime: '16:30',
                location: '',
                project: '彩排+内景',
                content: '主仪式彩排',
                remarks: '来会所的所有项目在17:15前完成即可，顺序依据当天情况可作调整',
                icon: '🎭',
                status: 'pending'
            },
            {
                id: 17,
                startTime: '17:18',
                endTime: '18:18',
                location: '迎宾区',
                project: '迎宾（迎宾区）',
                content: '新人迎接来宾的到来，签到合影，服务人员引导客人去休息区休息',
                remarks: '与宾客合影',
                icon: '🤝',
                status: 'pending'
            },
            {
                id: 18,
                startTime: '18:18',
                endTime: '20:18',
                location: '宴会厅',
                project: '晚宴第一场',
                content: '新人进场，可提前也可推迟',
                remarks: '',
                icon: '🍽️',
                status: 'pending'
            },
            {
                id: 19,
                startTime: '18:18',
                endTime: '20:18',
                location: '宴会厅',
                project: '晚宴第一场敬酒',
                content: '抽奖、游戏、嘉宾表演等',
                remarks: '晚宴流程以司仪沟通的流程为准，提前将仪式所需的发言稿，材料前发至策划邮箱389909948@qq.com',
                icon: '🥂',
                status: 'pending'
            },
            {
                id: 20,
                startTime: '20:18',
                endTime: '20:30',
                location: '宴会厅',
                project: '谢幕',
                content: '感谢宾客的到来，婚礼仪式结束',
                remarks: '',
                icon: '🎬',
                status: 'pending'
            },
            {
                id: 21,
                startTime: '20:30',
                endTime: '21:00',
                location: '格乐利雅',
                project: '婚礼结束',
                content: '检查并打包所有婚纱礼服及烟酒等其他物品',
                remarks: '检查打包物品',
                icon: '📦',
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