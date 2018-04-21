// 커링(_curry)
const _curry = fn =>
    (a, b) => b ? // 2개 인자 받을 경우에도 바로 돌도록 개선
        fn(a, b) :
        b => fn(a, b);

const _curry1 = fn =>
    (a, b) => arguments.length == 2 ?   // curry1은 제대로 동작 안 함!
        fn(a, b) :                      // arrow function을 쓰면 arguments가
        b => fn(a, b);                  // 정상적으로 동작하지 않음.

const _curry2 = function (fn) {      // 이렇게 구현하면 OK
    return function (a, b) {
        return arguments.length == 2 ?
            fn(a, b) :
            b => fn(a, b);      // 여기는 arrow function을 썼지만
    };                          // arguments를 사용하지 않는다
};

// 커링(_curryr), 오른쪽부터 평가하는 커링함수
const _curryr = fn =>
    (a, b) => b ?
        fn(a, b) :
        b => fn(b, a); // 여기만 순서가 바뀜

// _get
const _get = _curryr((obj, key) => obj == null ? undefined : obj[key]);

const _length = _get('length');

const _is_object = obj => !!obj && typeof obj == 'object';
const _keys = obj => _is_object(obj) ? Object.keys(obj) : [];
const _identity = val => val;
const _values = obj => _map(obj, _identity);

// _each 만들어 보기
const _each = _curryr((list, iter) => {
    const keys = _keys(list);
    for (let i = 0; i < keys.length; i++) {
        iter(list[keys[i]]);
    }
});

// _filter, _map 만들어 보기
const _filter = _curryr((list, predicate) => { // 고차함수: 함수를 인자로 받거나 함수를 리턴하거나 인자로 받은 함수를 실행하는 함수
    const new_list = [];

    _each(list, x => {
        if (predicate(x)) {
            new_list.push(x);
        }
    });

    return new_list;
});
const _map = _curryr((list, mapper) => { // mapper 을 갈아끼울 수 있기 때문에 재사용성 높은 코드가 되었다.
    const new_list = [];

    _each(list, x => {
        new_list.push(mapper(x));
    });

    return new_list;
});

const _rest = (list, num) => Array.prototype.slice.call(list, num || 1);
const _reduce = (list, iter, acc) => {
    if (!acc) {
        acc = list[0];
        list = _rest(list);
    }

    _each(list, x => acc = iter(acc, x));

    return acc;
};

// pipe 를 더 추상화하면 reduce 가 됨.
// pipe 는 함수들을 받도록 특화된 버전
const _pipe = (...fnList) => {
    const list = fnList[0].constructor === Array.prototype.constructor ? fnList[0] : fnList;

    return acc => _reduce(list, (acc, fn) => fn(acc), acc);
};

// go 함수는 즉시 실행되는 pipe 함수
const _go = (acc, ...fnList) => {
    const list = fnList[0].constructor === Array.prototype.constructor ? fnList[0] : fnList;

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
