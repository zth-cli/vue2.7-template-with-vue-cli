// 将多维数组转化为一维
export const newArr = function (arr) {
  return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? newArr(cur) : cur), [])
}
// 计算数组中每个元素出现的次数
// let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
export const nameNum = function (names) {
  return names.reduce((pre, cur) => {
    if (cur in pre) {
      pre[cur]++
    } else {
      pre[cur] = 1
    }
    return pre
  }, {})
}

// 转数组
export function toArray(likeArray) {
  return Array.isArray(likeArray) ? likeArray : [likeArray]
}
