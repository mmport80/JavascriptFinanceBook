"use strict";

console.log("//Generator");

var postBox = regeneratorRuntime.mark(function postBox(history) {
  var message;
  return regeneratorRuntime.wrap(function postBox$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return;

        case 2:
          message = _context.sent;

          console.log("History " + history);
          console.log("Input " + message);

          return _context.delegateYield(postBox(history.concat(message)), "t0", 6);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, postBox, this);
});

//init
var init = [];
var send = postBox(init);
send.next();

//send messages
send.next(1);
send.next(2);
send.next(3);