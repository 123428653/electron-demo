# Electron-demo

## 主进程与渲染进程

Electron主要由主进程与渲染进程组成。

#### 主进程

主要负责管理渲染进程，以及调用原生API操作。

#### 渲染进程

主要负责web页面UI部分。


electron-demo

```js
├── main                       
|    ├── main.js               // 主进程
├── renderer                   
│    ├── pages                 // 组件页面文件夹   
│    └── renderer.js           // 渲染进程
├── .gitignore                 
├── index.html                 // html模板
├── package.json               
└── README.md                  
```

创建好以上目录后安装Electron

```js
npm i electron@latest -D    // 获取最新版    

或者

yarn add electron@latest -D

// 当前版本为：
// Electron   4.1.4
// Node       10.11.0
// Chromium   69.0.3497.128
```
##### package.json  

```js
{
  "name": "electron-demo",
  "version": "1.0.0",
  "description": "",
  "main": "./main/main.js",     // 入口文件
  "scripts": {
    "start": "electron ."       // 添加启动应用程序
  },
  "keywords": [
    "Electron",
    "demo",
    "Electron-demo"
  ],
  "author": "Qin",
  "license": "ISC",
  "devDependencies": {
    "electron": "^4.1.4"
  }
}

```

## Hello World

主进程，代码内注释可以自行下载demo查看

##### main.js


```js

const {app, BrowserWindow, Menu} = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
```


渲染进程：
##### renderer.js
```js
// 获取index.html模板通过link import引入的组件页面
const links = document.querySelectorAll('link[rel="import"]')

// 遍历组件进行克隆，然后插入inde.html模板中。
Array.prototype.forEach.call(links, (link) => {
  let tpl = link.import.querySelector('.tpl')
  let clone = document.importNode(tpl.content, true)
  if (link.href.match('header.html')) {
    document.querySelector('body').prepend(clone)
  } else {
    document.querySelector('body').appendChild(clone)
  }
})
```

##### /renderer/pages/helloworld.html
```html
<template class="tpl">
  <section class="helloworld">
    <h1>Hello World!</h1>
  </section>
</template>
```

效果图如下：

![image](https://note.youdao.com/yws/res/7136/WEBRESOURCE7c3b5cca22900d244383d225c7781712)




看本demo请前往Github自行clone。地址：<span style="color:red">[https://github.com/123428653/electron-demo](https://github.com/123428653/electron-demo) </span>,喜欢就star一下吧！
