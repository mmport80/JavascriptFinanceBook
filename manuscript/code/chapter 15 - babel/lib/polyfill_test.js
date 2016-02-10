"use strict";

function addAll() {
  return Array.from(arguments).reduce(function (a, b) {
    return a + b;
  });
}