// 应用窗口
const {app, BrowserWindow, Menu} = require('electron')

// 保留窗口对象的全局引用，否则，
// 当JavaScript对象被垃圾回收时，窗口将自动关闭。
let mainWindow

function createWindow () {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false  // 关闭窗口尺寸修改
  })

  // 获取menu是否存在
  var hasMenu = Menu.getApplicationMenu()
  
  // 当窗口从最小化状态恢复时触发
  mainWindow.on('restore', function () {
    // 解决最小化恢复正常状态时，窗口高度不断减少的bug
    if (process.platform === 'win32') {
      if (!!hasMenu) {
        // 620多出的20高度是菜单栏的高度
        mainWindow.setSize(800, 620)
      } else {
        console.log('No')
      }
    }
  })

  // 引入模板
  mainWindow.loadFile('index.html')

  // 自动打开开发者工具
  mainWindow.webContents.openDevTools()

  // 监听窗口关闭后触发的方法
  mainWindow.on('closed', function () {
    // 取消引用窗口对象，如果您的应用程序支持多窗口，
    // 通常会将窗口存储在数组中，
    // 这是您应该删除相应元素的时间。
    mainWindow = null
  })
}

// 当Electron完成初始化并准备创建浏览器窗口时，
// 将调用此方法。 
// 某些API只能在此事件发生后使用。
app.on('ready', createWindow)

// 监听关闭所有窗户退出后的操作。
app.on('window-all-closed', function () {
  // 在macOS上，应用程序及其菜单栏通常保持活动状态，
  // 直到用户使用Cmd + Q显式退出
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // 在macOS上，当单击停靠图标并且没有其他窗口打开时，
  // 通常会在应用程序中重新创建一个窗口。
  if (mainWindow === null) {
    createWindow()
  }
})

// 在此文件中，您可以包含应用程序的其余特定主流程代码。 
// 您也可以将它们放在单独的文件中并在此处要求它们。
