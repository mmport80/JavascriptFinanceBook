"use strict";

var f = function f(x) {
        return x - 1 < 0 ? 0 : x + f(x - 1);
};