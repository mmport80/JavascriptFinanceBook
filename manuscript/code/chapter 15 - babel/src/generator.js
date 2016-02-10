"use strict";

console.log( "//Generator" );

const postBox = function*(history){
  const message = yield;

  console.log( "> History " + history );
  console.log( "> Input " + message );

  yield* postBox( history.concat(message) );
  }

//init
const init = [];
const send = postBox(init);
send.next();

//send messages
send.next( 1 );
send.next( 2 );
send.next( 3 );
