"use strict";

function addAll() {
  console.log(222);
  return Array.from([0, 1, 2, 3, 4]).reduce(function (a, b) {
    return a + b;
  });
}