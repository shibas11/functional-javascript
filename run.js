var add_maker = function(a) {
    return function(b) { // closure. a is not in this function context.
        return a + b;
    }
}
//var add_maker = a => b => a + b;
var add10 = add_maker(10);
console.log(add10(20));
console.log(add_maker(10)(20));
