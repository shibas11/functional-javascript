const lib = require('./myLib');

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

var names = lib._map(
    lib._filter(users, x => x.age >= 30),
    lib._get('name'));
console.log(names);
    
var ages = lib._map(
    lib._filter(users, x => x.age < 30),
    lib._get('age'));
console.log(ages);

// 외부 다형성에 관한 이야기
//      Array 의 함수를 쓴다는 것은 함수가 먼저가 아니라 자료의 인스턴스가 먼저다.
//      만약, Array 로 들어올 인자가 null 이거나 한다면 오류가 발생할 것이다.
//      Array-like 객체(주로 jQuery 객체)를 Array 라고 생각하고 메소드(멤버 함수)를 돌리면 에러가 날 수 있다.
//      객체같은 경우는 객체(자료)가 먼저 있어야 인스턴스에 대해 메소드(멤버 함수)를 돌릴 수 있지만
//      함수형 프로그래밍은 함수가 먼저가 되어야 한다. 순수 함수를 사용하자.
var obj1 = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    length: 4
};
//console.log(obj1.map(x => x)); // 에러 발생, obj1.map is not a function
console.log(lib._map(obj1, x => x));


// 커링 as-is
var add = (a, b) => a + b;
console.log(add(3, 5));
// 커링 to-be
var addForCurry = lib._curry((a, b) => a + b);
var add3 = addForCurry(3);
console.log(add3(7));
console.log(addForCurry(10)(5));
console.log(addForCurry(1, 2)); // 3이 나오지 않고 함수가 리턴되는 문제가 있어 _curry 개선함
console.clear();

// 커링r as-is
var sub = lib._curry((a, b) => a - b);
//console.log(sub(10, 5)); // 10 - 5 = 5
var sub10 = sub(10); // 10을 빼기하는 함수
console.log(sub10(5)); // 5 - 10 이 아니라 10 -5 ???? 이럴 때 오른쪽부터 평가하는 _curryr이 필요함
// 커링r to-be
var sub = lib._curryr((a, b) => a - b);
var sub10 = sub(10); // 10을 빼기하는 함수
console.log(sub10(5)); // 제대로 -5가 출력됨
console.clear();

// get 예제
var user1 = users[10];
//console.log(user1.name); // 에러 발생, Cannot read property 'name' of undefined
console.log(lib._get(user1, 'name'));
console.log(lib._get(users[0], 'name'));
console.log(lib._get('name')(users[0])); // _curryr 적용됐으므로 name 이 먼저다
var _get_name = lib._get('name');
console.log(_get_name(users[0]));
