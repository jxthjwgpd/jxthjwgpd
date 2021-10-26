export function restfulUrl (url, params) {
  // let _paramArr = url.match(/(?<=\{).*?(?=\})/gi)
  let _paramArr = url.match(/\{(.+?)\}/g)
  _paramArr.forEach(el => {
    let e = el.substring(1, el.length - 1)
    url = url.replace(el, params[e])
  })
  return url
}
