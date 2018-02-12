var users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 },
];

// 30세 이상인 users 만 고르기
// 30세 이상인 users 의 name 을 수집하기
var temp_users = [];
for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}
var names = [];
for (let i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].name);
}
console.log(names);

// 30세 미만인 users 만 고르기
// 30세 미만인 users 의 age 를 수집하기
// Array.prototype.filter, Array.prototype.map
var ages = users.filter(x => x.age < 30).map(x => x.age); 
console.log(ages);

// _each 만들어 보기
const _each = (list, iter) => {
    for (let i = 0; i < list.length; i++) {
        iter(list[i]);
    }
};

// _filter, _map 만들어 보기
const _filter = (list, predicate) => { // 고차함수: 함수를 인자로 받거나 함수를 리턴하거나 인자로 받은 함수를 실행하는 함수
    const new_list = [];
    
    _each(list, x => {
        if (predicate(x)) {
            new_list.push(x);
        }
    });

    return new_list;
};
const _map = (list, mapper) => { // mapper 을 갈아끼울 수 있기 때문에 재사용성 높은 코드가 되었다.
    const new_list = [];

    _each(list, x => {
        new_list.push(mapper(x));
    });

    return new_list;
};

var names = _map(
    _filter(users, x => x.age >= 30),
    x => x.name);
console.log(names);
    
var ages = _map(
    _filter(users, x => x.age < 30),
    x => x.age);
console.log(ages);
