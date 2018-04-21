// 커링(_curry)
var _curry = fn =>
    (a, b) => b ?                       // 2개 인자 받을 경우에도 바로 돌도록 개선
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
var _each = (list, iter) => {
    var keys = _keys(list);
    for (let i = 0; i < keys.length; i++) {
        iter(list[keys[i]]);
    }
};
_each = _curryr(_each);

// _filter, _map 만들어 보기
var _filter = (list, predicate) => { // 고차함수: 함수를 인자로 받거나 함수를 리턴하거나 인자로 받은 함수를 실행하는 함수
    var new_list = [];

    _each(list, x => {
        if (predicate(x)) {
            new_list.push(x);
        }
    });

    return new_list;
};
_filter = _curryr(_filter);

var _map = (list, mapper) => { // mapper 을 갈아끼울 수 있기 때문에 재사용성 높은 코드가 되었다.
    var new_list = [];

    _each(list, x => {
        new_list.push(mapper(x));
    });

    return new_list;
};
_map = _curryr(_map);

var _rest = (list, num) => Array.prototype.slice.call(list, num || 1);
var _reduce = function (list, iter, acc) {
    if (arguments.length == 2) {
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

var _pluck = function (list, key) {
    return _go(list,
        _filter(x => _get(x, key)),
        _map(x => x[key]));
};

var _negate = function (fn) {
    return function (val) {
        return !fn(val);
    };
};

var _reject = function (list, predicate) {
    return _filter(list, _negate(predicate));
};
_reject = _curryr(_reject);

var _compact = _filter(_identity);

var _find = function (list, predicate) {
    var keys = _keys(list);
    for (var i = 0; i < keys.length; i++) {
        var val = list[keys[i]];
        if (predicate(val)) return val;
    }
};
_find = _curryr(_find);

var _find_index = function (list, predicate) {
    var keys = _keys(list);
    for (var i = 0; i < keys.length; i++) {
        if (predicate(list[keys[i]])) return i;
    }
};
_find_index = _curryr(_find_index);

var _some = function (list, predicate) {
    //return _find_index(list, predicate || _identity) != -1; // undefined가 true로 나오는 문제가 있음

    var result = _find_index(list, predicate || _identity);
    return result != undefined && result != -1;
};

var _every = function (list, predicate) {
    var result = _find_index(list, _negate(predicate || _identity));
    return !(result != undefined && result != -1);
};

var _min = function (list) {
    return _reduce(list, function (a, b) {
        return a <= b ? a : b;
    });
};

var _max = function (list) {
    return _reduce(list, function (a, b) {
        return a >= b ? a : b;
    });
};

module.exports = {
    _curry, _curryr,
    _get, _length,
    _each,
    _is_object, _identity,
    _rest, _keys,
    _negate,
    _pipe, _go,

    // 수집하기
    _map, _values, _pluck,

    // 거르기
    _filter, _reject, _compact,

    // 찾기
    _find, _find_index, _some, _every,

    // 축약하기
    _reduce, _max, _min
};
