/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i], i)
  }
}

function _filter(list, predicator) {
  const newList = []

  _each(list, (x, idx) => {
    if (predicator(x, idx)) newList.push(x)
  })

  return newList
}
// console.log(_filter([1, 2, 3, 4, 5], x => x % 2 == 1))
// console.log(_filter([1, 2, 3, 4, 5], (x, idx) => idx > 1))

function _map(list, mapper) {
  const newList = []

  _each(list, (x, idx) => newList.push(mapper(x, idx)))

  return newList
}
// console.log(_map([1, 2, 3, 4, 5], val => ({ val })))
// class Val { constructor(v) { this.val = v } }
// console.log(_map([1, 2, 3, 4, 5], x => new Val(x)))
// console.log(_map([1, 2, 3, 4, 5], (x, idx) => ({ idx, v: x, v10x: x * 10 })))

function _reduce(list, reducer, acc) {
  let newList = list
  if (acc === undefined) {
    acc = list[0]
    newList = list.slice(1)
  }

  _each(newList, (x, idx) => acc = reducer(acc, x, idx))

  return acc
}
// console.log(_reduce([1, 2, 3, 4, 5], (acc, x, idx) => {
//   acc += x
//   return acc
// }, 0))
// console.log(_reduce([1, 2, 3, 4, 5], (acc, x, idx) => {
//   acc['id' + x] = x
//   return acc
// }, {}))

function _some(list, iter) {
  for (let i = 0; i < list.length; i++) {
    if (iter(list[i], i)) return true
  }

  return false
}
// console.log(_some([1, 2, 3, 4, 5], (x, idx) => x < 3))
function _all(list, iter) {
  for (let i = 0; i < list.length; i++) {
    if (!iter(list[i], i)) return false
  }

  return true
}
// console.log(_all([1, 2, 3, 4, 5], (x, idx) => x < 3))

const _curry = fn => (a, b) => {
  if (b !== undefined) {
    return fn(a, b)
  }

  return b => fn(a, b)
}
const _curryr = fn => (a, b) => {
  if (b !== undefined) {
    return fn(a, b)
  }

  return b => fn(b, a)
}


const add3 = _curry((a, b) => a + b)(3)
console.log(add3(5))                        // 5 + 3
console.log(_curry((a, b) => a + b)(3)(5))  // 5 + 3
console.log(_curry((a, b) => a + b)(3, 5))  // 5 + 3

const sub3 = _curry((a, b) => a - b)(3)
console.log(sub3(5))                        // 5 - 3 X
console.log(_curry((a, b) => a - b)(3)(5))  // 5 - 3 X
console.log(_curry((a, b) => a - b)(5, 3))  // 5 - 3

const sub3r = _curryr((a, b) => a - b)(3)
console.log(sub3r(5))                       // 5 - 3
console.log(_curryr((a, b) => a - b)(3)(5)) // 5 - 3
console.log(_curryr((a, b) => a - b)(5, 3)) // 5 - 3
