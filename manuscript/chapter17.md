#Appendix - Pipes and Extending Prototypes

This book has used 'pipes' to show how data can flow through your program and how it appealing it is. However, the flexibility comes with provisos.

Up until now we have 'added pipes' or extended array prototypes in this way,

`Array.prototype.calculate =
 function(fun){
  return this.reduce(fun);
  }`

which was a way to change the name of `reduce` in chapter 5 on higher order functions to "calculate".

This is naive, it changes how JavaScript runs globally and when not used judiciously it causes problems with code in libraries which do not expect the changes.

The Sugar library is similar to the Underscore and Lo-Dash utility libraries mentioned in previous chapters however it extends JavaScript's *native* array objects etc. which leads to nice looking performant code. It is therefore [a good place to look for advice](http://sugarjs.com/native).

Their advice is to be wary, but do not worry too much.

Stay clear from modifying host objects (provided by the operating system itself) and also, do not step on the toes of JavaScript's native methods by using the same names.

The next is not so obvious, but important. We need to set new functions as 'non-enumerable', i.e. the new function is excluded when looping through an array or an object.

E.g. by typing this into the console,

`xs = [3,4,5];
for (var x in xs) console.log(x);`

we will see the name of the 'calculate' method printed along with our numbers. Not what you would expect! Faulty logic from JavaScript, but unfortunately it's our problem too.

We can solve this easily by extending our prototypes this way instead of the simpler method above,

`const calculate =
 function(fun){
  return this.reduce(fun);
  }`

`Object.defineProperty(
 Array.prototype,
 'calculate',
 { value: calculate, enumerable: false }
 );`

The first line defines the function, the *second* sets the `calculate` function as a property of `Array.prototype`, giving it the name `'calculate'` and ensures that it's not printed out when we use a `for in loop` by setting enumerable to `false` (which is actually the default value when the `defineProperty` function is called in any case).

On the one hand 'best practice' dictates defensively checking whether properties are indeed *direct* properties of that object and therefore should be included in the loop, on the other hand, assuming third party libraries follow best practice might be optimistic, so it is probably best to use the `defineProperty` method when extending prototypes.

Nevertheless, one way to check would be thus,

`'calculate' in xs`

`> true`

but unfortunately it evaluates to the same as an element which we do want to iterate over, e.g.

`'0' in xs`

`> true`

fortunately

`xs.hasOwnProperty('calculate')`

`> false`

`xs.hasOwnProperty('0')`

`> true`

which is just what we would want if we were to use such a loop, and is part of the aforementioned 'best practice'.

The last pitfall to be aware of is extending the base 'Object' prototype. As almost everything is related to the object prototype in one way or another, it would get very difficult to ensure no property names end up colliding together.

##Conclusion

Most of the prototype extension examples in this book were cosmetic. The main message is that you can extend prototypes and be confident that they will not cause bugs further down the line.

However, as the old saying goes,

>just because you're not paranoid doesn't mean they're not after you
