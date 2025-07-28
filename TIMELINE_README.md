# 婚礼时间线组件 (Wedding Timeline Component)

一个专为婚礼设计的微信小程序时间线组件，能够根据当前时间自动显示当前进行的活动。每个活动包含时间、地点、项目、内容和备注等详细信息。

## 功能特性

- 🕐 **实时时间显示** - 显示当前时间
- 🎯 **当前活动高亮** - 自动识别并高亮当前进行的活动（支持同步活动）
- 📅 **婚礼日期检测** - 只在婚礼当天显示时间线功能
- ⏰ **婚礼倒计时** - 婚礼前显示距离婚礼的天数
- 🎉 **婚礼结束状态** - 婚礼日期过后显示结束信息和回忆录
- 🎨 **精美设计** - 婚礼主题的粉色渐变设计
- 📱 **响应式布局** - 适配不同屏幕尺寸
- ⚡ **自动更新** - 每分钟自动更新当前时间
- 🎪 **动画效果** - 当前活动带有脉冲动画效果
- 📍 **详细信息** - 每个活动包含时间、地点、项目、内容、备注

## 组件结构

```
miniprogram/components/timeline/
├── timeline.js      # 组件逻辑
├── timeline.wxml    # 组件模板
├── timeline.wxss    # 组件样式
└── timeline.json    # 组件配置
```

## 使用方法

### 1. 在页面中引入组件

在页面的 `index.json` 中注册组件：

```json
{
  "usingComponents": {
    "timeline": "../../components/timeline/timeline"
  }
}
```

### 2. 在页面中使用组件

在页面的 `index.wxml` 中使用组件：

```xml
<timeline 
  wedding-date="{{weddingDate}}" 
  show-current-activity="{{showCurrentActivity}}"
  activities="{{activities}}"
  bind:activitytap="onActivityTap"
  bind:statusupdate="onStatusUpdate"
/>
```

### 3. 在页面中处理事件

在页面的 `index.js` 中处理组件事件：

```javascript
Page({
  data: {
    weddingDate: '2024-12-25', // 婚礼日期
    showCurrentActivity: true,  // 是否显示当前活动
    activities: [
      {
        id: 1,
        startTime: '06:00',
        endTime: '08:00',
        location: '新娘家',
        project: '新娘化妆',
        content: '新娘开始化妆准备，专业化妆师精心打造美丽妆容',
        remarks: '请提前准备好化妆用品',
        icon: '💄',
        status: 'pending'
      },
      // 添加更多活动...
    ]
  },

  onActivityTap(e) {
    const activity = e.detail.activity;
    console.log('点击了活动:', activity.project);
    console.log('时间:', activity.startTime || activity.time);
    console.log('地点:', activity.location);
    console.log('内容:', activity.content);
    console.log('备注:', activity.remarks);
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
  }
});
```

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| weddingDate | String | '' | 婚礼日期，格式：'YYYY-MM-DD' |
| showCurrentActivity | Boolean | true | 是否显示当前活动高亮 |
| activities | Array | [] | 活动列表数组 |

## 组件事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| activitytap | 点击活动时触发 | e.detail.activity: 活动对象 |
| statusupdate | 活动状态更新时触发 | e.detail.activities: 更新后的活动列表, e.detail.currentActivity: 第一个当前活动, e.detail.currentActivities: 所有当前活动数组 |

## 活动数据结构

每个活动包含以下字段：

```javascript
{
  id: 1,                    // 活动ID
  startTime: '06:00',      // 开始时间 (HH:MM格式)
  endTime: '08:00',        // 结束时间 (HH:MM格式，可选)
  location: '新娘家',       // 地点
  project: '新娘化妆',      // 项目/活动名称
  content: '新娘开始化妆...', // 活动内容描述
  remarks: '请提前准备...',  // 备注信息
  icon: '💄',              // 活动图标
  status: 'pending'        // 状态 (pending/current/completed)
}
```

## 活动状态

组件会自动根据当前时间和婚礼日期更新活动状态：

- **pending** - 待进行（灰色）
- **current** - 进行中（粉色，带脉冲动画）
- **completed** - 已完成（绿色）

**注意：** 支持同步活动，多个同时进行的活动都会被标记为"进行中"状态。例如：新娘化妆和新郎准备可以同时进行。活动状态基于开始时间和结束时间计算，开始前30分钟进入"进行中"状态。

## 婚礼状态

组件会根据婚礼日期显示不同的状态：

- **婚礼前** - 显示倒计时天数，所有活动标记为待进行
- **婚礼当天** - 显示实时时间线和当前活动
- **婚礼后** - 显示婚礼已结束信息和回忆录，所有活动标记为已完成

## 默认活动安排

组件包含以下默认的婚礼活动安排：

1. **06:00-08:00** - 新娘家 - 新娘化妆 💄
   - 内容：新娘开始化妆准备，专业化妆师精心打造美丽妆容
   - 备注：请提前准备好化妆用品

2. **06:00-08:00** - 新郎家 - 新郎准备 👔
   - 内容：新郎整理着装，准备迎接人生重要时刻
   - 备注：检查礼服是否完整

3. **09:30-10:30** - 新娘家 - 接亲仪式 🚗
    - 内容：新郎前往新娘家接亲，传统仪式正式开始
    - 备注：准备红包和接亲道具

4. **11:00-12:00** - 婚礼现场 - 婚礼仪式 💒
    - 内容：神圣的婚礼仪式，在亲朋好友见证下交换誓言
    - 备注：仪式开始前请保持安静

5. **12:30-14:00** - 宴会厅 - 婚宴开始 🍽️
    - 内容：丰盛的婚宴，与宾客共享喜悦时光
    - 备注：请按座位安排就座

6. **12:30-15:00** - 宴会厅 - 敬酒环节 🥂
    - 内容：新人向宾客敬酒，表达感谢之情
    - 备注：请准备祝福语

7. **16:00-17:30** - 婚礼现场 - 拍照留念 📸
    - 内容：与亲朋好友合影留念，记录美好瞬间
    - 备注：请保持微笑，配合摄影师

8. **18:00-19:30** - 宴会厅 - 晚宴 🌙
    - 内容：温馨的晚宴，继续庆祝这个特殊的日子
    - 备注：晚宴后还有精彩节目

9. **20:00-21:00** - 宴会厅门口 - 送客 👋
    - 内容：感谢宾客的到来，送别亲朋好友
    - 备注：请有序离场，注意安全

## 自定义活动

组件本身不包含活动数据，活动数据由使用组件的页面提供。如需自定义活动安排，可以在页面的 `data` 中定义 `activities` 数组：

```javascript
activities: [
  {
    id: 1,
    time: '06:00',
    location: '新娘家',
    project: '新娘化妆',
    content: '新娘开始化妆准备，专业化妆师精心打造美丽妆容',
    remarks: '请提前准备好化妆用品',
    icon: '💄',
    status: 'pending'
  },
  // 添加更多活动...
]
```

## 演示页面

项目包含一个演示页面 `pages/timeline/index`，展示了组件的完整功能：

- 设置婚礼日期（今天/明天/昨天/3天后/7天后/自定义）
- 切换当前活动显示
- 点击活动查看详细信息
- 显示完整的活动信息（时间、地点、项目、内容、备注）
- 活动数据管理示例
- 测试各种婚礼状态（倒计时/进行中/已结束）

访问路径：`/pages/timeline/index`

**注意：** 演示页面包含了完整的婚礼活动数据，可以作为自定义活动的参考模板。选择不同日期可以测试各种状态的显示效果。

## 样式定制

组件使用 CSS 变量和类名，可以通过以下方式定制样式：

### 修改主题色

在 `timeline.wxss` 中修改颜色变量：

```css
/* 主色调 */
--primary-color: #ec4899;
--primary-light: #fce7f3;
--primary-dark: #be185d;
```

### 修改备注样式

备注区域使用黄色渐变背景，可以自定义：

```css
.activity-remarks {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-left: 4rpx solid #f59e0b;
}
```

### 修改婚礼倒计时样式

婚礼倒计时区域使用紫色渐变背景，可以自定义：

```css
.wedding-countdown-section {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}
```

### 修改婚礼结束样式

婚礼结束区域使用绿色渐变背景，可以自定义：

```css
.wedding-ended-section {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
```

### 修改动画效果

可以调整脉冲动画的参数：

```css
@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
```

## 注意事项

1. **时间格式**：时间必须使用 'HH:MM' 格式（24小时制）
2. **日期格式**：婚礼日期必须使用 'YYYY-MM-DD' 格式
3. **时区**：组件使用本地时区
4. **性能**：组件每分钟更新一次，避免频繁更新影响性能
5. **字段要求**：所有活动必须包含 time、location、project、content、remarks 字段
6. **数据管理**：活动数据由页面管理，组件只负责显示和状态更新

## 浏览器兼容性

- 微信小程序 2.0+
- 支持 ES6+ 语法
- 支持 CSS3 动画

## 许可证

MIT License 