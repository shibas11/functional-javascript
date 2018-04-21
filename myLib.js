// 커링(_curry)
var _curry = fn =>
    (a, b) => b ? // 2개 인자 받을 경우에도 바로 돌도록 개선
        fn(a, b) :
        b => fn(a, b);

var _curry1 = fn =>
    (a, b) => arguments.length == 2 ?   // curry1은 제대로 동작 안 함!
        fn(a, b) :                      // arrow function을 쓰면 arguments가
        b => fn(a, b);                  // 정상적으로 동작하지 않음.

var _curry2 = function (fn) {      // 이렇게 구현하면 OK
    return function (a, b) {
        return arguments.length == 2 ?
            fn(a, b) :
            b => fn(a, b);      // 여기는 arrow function을 썼지만
    };                          // arguments를 사용하지 않는다
};

// 커링(_curryr), 오른쪽부터 평가하는 커링함수
var _curryr = fn =>
    (a, b) => b ?
        fn(a, b) :
        b => fn(b, a); // 여기만 순서가 바뀜

// _get
var _get = _curryr((obj, key) => obj == null ? undefined : obj[key]);

var _length = _get('length');

var _is_object = obj => !!obj && typeof obj == 'object';
var _keys = obj => _is_object(obj) ? Object.keys(obj) : [];
var _identity = val => val;
var _values = obj => _map(obj, _identity);

// _each 만들어 보기
var _each = _curryr((list, iter) => {
    var keys = _keys(list);
    for (let i = 0; i < keys.length; i++) {
        iter(list[keys[i]]);
    }
});

// _filter, _map 만들어 보기
var _filter = _curryr((list, predicate) => { // 고차함수: 함수를 인자로 받거나 함수를 리턴하거나 인자로 받은 함수를 실행하는 함수
    var new_list = [];

    _each(list, x => {
        if (predicate(x)) {
            new_list.push(x);
        }
    });

    return new_list;
});
var _map = _curryr((list, mapper) => { // mapper 을 갈아끼울 수 있기 때문에 재사용성 높은 코드가 되었다.
    var new_list = [];

    _each(list, x => {
        new_list.push(mapper(x));
    });

    return new_list;
});

var _rest = (list, num) => Array.prototype.slice.call(list, num || 1);
var _reduce = (list, iter, acc) => {
    if (!acc) {
        acc = list[0];
        list = _rest(list);
    }

    _each(list, x => acc = iter(acc, x));

    return acc;
};

// pipe 를 더 추상화하면 reduce 가 됨.
// pipe 는 함수들을 받도록 특화된 버전
var _pipe = (...fnList) => {
    var list = fnList[0].constructor === Array.prototype.constructor ? fnList[0] : fnList;

    return acc => _reduce(list, (acc, fn) => fn(acc), acc);
};

// go 함수는 즉시 실행되는 pipe 함수
var _go = (acc, ...fnList) => {
    var list = fnList[0].constructor === Array.prototype.constructor ? fnList[0] : fnList;

    return _pipe.apply(null, fnList)(acc);
};

module.exports = {
    _curry, _curryr,
    _get, _length,
    _each,
    _is_object, _keys, _values, _rest, _identity,
    _filter, _map,
    _reduce, _pipe, _go
};
