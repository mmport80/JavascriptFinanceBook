function factorial(n, acc = 1) {
    "use strict";
    console.log("d");
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}
