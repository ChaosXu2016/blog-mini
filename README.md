# 个人博客小程序版

> 平时写写demo，想到什么写什么，当作个人网站移动版吧。比`app`方便。

## 说明

+ 采用`Taro`的云开发模板。  
> `client`为小程序客户端代码，`cloud`是小程序云函数代码。开发的时候，进入到`client`文件夹开发。  

+ 命令
```bash
# dev 需要先进入client目录
npm run dev:weapp

# build 需要先进入client目录
npm run build weapp

```

## 预计功能点  
+ 一个个人的打卡小程序（因为这部分发布需要企业小程序才行，我个人小程序没有这个权限）  
 - [ ] 打卡项目管理
 - [ ] tab-首页，打卡主页面
 - [ ] tab-时间线页面（可切换为日历视图），记录任务完成情况
 - [ ] tab-管理页面，分模块入口

+ 小日记功能  
 - [x] 简易的`markdown`编辑器和解析器
 - [x] 日记时间线

## 表结构设计

### project

```json
{
  "_id": "string",
  "groupId": "string",
  "openId": "string",
  "name": "string",
  "avatar": "urlString",
  "desc": "string",
  "permission": "number",
  "createBy": "string",
  "createAt": "date",
  "updateBy": "string",
  "updateAt": "date"
}
```

### group  

```json
{
  "_id": "string",
  "name": "string",
  "avatar": "urlString",
  "desc": "string",
  "permission": "number",
  "createBy": "string",
  "createAt": "date",
  "updateBy": "string",
  "updateAt": "date"
}
```

### schedule

```json
{
  "_id": "string",
  "projectId": "string",
  "createBy": "string",
  "createAt": "date",
  "updateBy": "string",
  "updateAt": "date"
}
```  

### userGroup

```json
{
  "_id": "string",
  "groupId": "string",
  "openId": "string",
  "createBy": "string",
  "createAt": "date",
  "updateBy": "string",
  "updateAt": "date"
}
```

> `permission`说明

```js
permission = 0 // 公开
permission = 1 // 私人可见
permission = 2 // 组内可见
```  
