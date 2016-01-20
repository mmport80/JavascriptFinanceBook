"use strict";

var f = function f(y) {
        if (y < 0) {
                return r = 0;
        } else {
                return y + f(y - 1);
        }
};