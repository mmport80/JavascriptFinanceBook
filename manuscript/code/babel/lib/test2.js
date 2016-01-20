"use strict";

var f = function f(y) {
        if (y < 0) {
                r = 0;
        } else {
                r = y + f(y - 1);
        }
        return r;
};