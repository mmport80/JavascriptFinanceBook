"use strict";

var f = function f(y) {
        return y - 1 < 0 ? 0 : y + f(y - 1);
};