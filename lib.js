var list1 = [0, 1, 3, 5, 6, 8]
var list2 = ['hello', 'world', '!']

// curry, curryr
const _curry = function(fn) {
  return function(a, b) {
    return !!b
      ? fn(a, b)
      : function(b) {
          return fn(a, b)
        }
  }
}
const _curryr = fn =>
  (a, b) => !!b
    ? fn(a, b)
    : b => fn(b, a)

// get
let _get = (obj, key) => !!obj ? obj[key] : undefined
_get = _curryr(_get)

// each
let _each = (list, iter) => {
  for (let i = 0; i < list.length; i++) {
    iter(list[i])
  }
}
_each = _curryr(_each)

// filter
let _filter = (list, pred) => {
  const new_list = []
  _each(list, x => {
    if (pred(x)) {
      new_list.push(x)
    }
  })
  return new_list
}
_filter = _curryr(_filter)

// map
let _map = (list, mapper) => {
  const new_list = []
  _each(list, x => {
    new_list.push(mapper(x))
  })
  return new_list
}
_map = _curryr(_map)

// rest, n개만큼 앞에서 자른 나머지를 반환
let _rest = (list, n) => Array.prototype.slice.call(list, n || 1)
_rest = _curryr(_rest)

// reduce
const _reduce = (list, iter, acc) => {
  if (!!acc == false) {
    acc = list[0]
    list = _rest(list)
  }

  _each(list, x => acc = iter(acc, x))
  return acc
}

// pipe, go
const _pipe = (...fnList) => {
  return function(acc) {
    return _reduce(fnList, (acc, fn) => fn(acc), acc)
  }
}
const _go = (acc, ...fnList) => {
  return _pipe.apply(null, fnList)(acc)
}
// _pipe(
//   _map(x => x * 2),
//   console.log
// )(list1)
// _go(list1,
//   _map(x => x * 2),
//   console.log
// )
