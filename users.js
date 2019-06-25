/* eslint-disable no-console */
class User {
  constructor(id, name, age) {
    this.id = id
    this.name = name
    this.age = age
  }
}
const users = [
  new User(1, "ID", 32),
  new User(2, "HA", 25),
  new User(3, "BJ", 32),
  new User(4, "PJ", 28),
  new User(5, "JE", 27),
  new User(6, "JM", 32),
  new User(7, "HI", 24),
]
//console.log(users)

const youngers = users.filter(u => u.age < 30)
console.log(youngers)
console.log(youngers.map(u => u.age))

const olders = users.filter(u => u.age >= 30);
console.log(olders)
console.log(olders.map(u => u.name))
