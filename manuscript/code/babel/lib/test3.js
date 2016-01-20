"use strict";

function factorial(n) {
    "use strict";

    var acc = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}