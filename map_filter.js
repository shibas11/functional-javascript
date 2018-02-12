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


// filter, map
console.log('\n filter, map 예제');
lib._go(users,
    lib._filterr(x => x.age >= 30),
    lib._mapr(lib._get('name')),
    console.log);
lib._go(users,
    lib._filterr(x => x.age < 30),
    lib._mapr(lib._get('age')),
    console.log);


// 커링 as-is
console.log('\n 커링 예제');
var add = (a, b) => a + b;
console.log(add(3, 5));
// 커링 to-be
var addForCurry = lib._curry((a, b) => a + b);
var add3 = addForCurry(3);
console.log(add3(7));
console.log(addForCurry(10)(5));
console.log(addForCurry(1, 2)); // 3이 나오지 않고 함수가 리턴되는 문제가 있어 _curry 개선함


// 커링r as-is
console.log('\n 커링r 예제');
var sub = lib._curry((a, b) => a - b);
//console.log(sub(10, 5)); // 10 - 5 = 5
var sub10 = sub(10); // 10을 빼기하는 함수
console.log(sub10(5)); // 5 - 10 이 아니라 10 -5 ???? 이럴 때 오른쪽부터 평가하는 _curryr이 필요함
// 커링r to-be
var sub = lib._curryr((a, b) => a - b);
var sub10 = sub(10); // 10을 빼기하는 함수
console.log(sub10(5)); // 제대로 -5가 출력됨


// get 예제
console.log('\n get 예제');
console.log(lib._get(users[0], 'name'));
console.log(lib._get('name')(users[0])); // _curryr 적용됐으므로 name 이 먼저다
var _get_name = lib._get('name');
console.log(_get_name(users[0]));


// reduce 예제
console.log('\n reduce 예제');
console.log(lib._reduce([1, 2, 3, 4], (acc, elm) => acc + elm));
console.log(lib._reduce([1, 2, 3, 4], (acc, elm) => acc + elm, 0));


// pipe 예제
console.log('\n pipe 예제');
var f1 = lib._pipe([ // array
    x => x + 1,
    x => x * 2,
    x => x * x
]);
console.log(f1(1));
var f2 = lib._pipe( // not array
    x => x + 1,
    x => x * 2,
    x => x * x
);
console.log(f2(1));


// go 예제
console.log('\n go 예제');
lib._go(1,
    [ // array
        x => x + 1,
        x => x * 2,
        x => x * x,
        console.log
    ]
);
lib._go(1,
    // not array
    x => x + 1,
    x => x * 2,
    x => x * x,
    console.log
);
