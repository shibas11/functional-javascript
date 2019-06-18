function addMaker1(a) {
  return function (b) {
    return a + b
  }
}

let addMaker = a => b => a + b

console.log(addMaker1(5)(10))
console.log(addMaker(5)(10))

let add5 = addMaker(5)
console.log(add5(3))
console.log(add5(4))

let add3 = addMaker(3)
console.log(add3(3))
console.log(add3(4))
