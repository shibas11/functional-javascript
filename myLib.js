// 커링(_curry)
const _curry = function(fn) {
    return function(a) {
        return arguments.length == 2 // 2개 인자 받을 경우에도 바로 돌도록 개선
            ? fn(a, arguments[1])
            : b => fn(a, b);
    }
};

// 커링(_curryr), 오른쪽부터 평가하는 커링함수
const _curryr = function(fn) {
    return function(a) {
        return arguments.length == 2
            ? fn(a, arguments[1])
            : b => fn(b, a); // 여기만 순서가 바뀜
    }
};

// _get
const _get = _curryr((obj, key) => obj ? obj[key] : undefined);

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

const _reduce = (list, iter, acc) => {
    if (!list) return undefined;

    if (!acc) {
        acc = list[0];
        list = Array.prototype.slice.call(list, 1); // for Array-like object
    }

    _each(list, x => acc = iter(acc, x));
    
    return acc;
};

module.exports = { _curry, _curryr, _get, _each, _filter, _map, _reduce };
