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