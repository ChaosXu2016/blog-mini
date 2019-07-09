# 个人博客小程序版

> 平时写写demo，想到什么写什么，当作个人网站移动版吧。比`app`方便。

## 日常任务表

> 主要是用来管理个人的`to do list`。目前主要是管理学习计划和健身计划。表结构设计如下：  

### done_log  

> 记录完成情况

```json
{
  "_id": "主键id",
  "_openid": "openid",
  "todo_id": "todo_id",
  "create_time": "创建日期",
  "update_time": "更新时间"
}
```  

### todos  

```json
{
  "_id": "主键id",
  "_openid": "openid",
  "name": "名称",
  "mark": "备注",
  "detail_id": "详情id",
  "type": "类型；sport|study",
  "status": "状态：0-无效 1-有效",
  "start_time": "开始时间",
  "end_time": "截止日期",
  "create_time": "创建日期",
  "update_time": "更新时间"
}
```  

### study  

```json
{
  "_id": "主键id",
  "_openid": "openid",
  "name": "名称",
  "mark": "备注",
  "value": "数值",
  "unit": "单位",
  "create_time": "创建日期",
  "update_time": "更新时间"
}
```  

### sport  

```json
{
  "_id": "主键id",
  "_openid": "openid",
  "name": "名称",
  "mark": "备注",
  "value": "数值",
  "unit": "单位",
  "group_num": "组数",
  "sleep_time": "间隔时间",
  "create_time": "创建日期",
  "update_time": "更新时间"
}
```  

