#Appendix - Recursion

Our chapter on concurrency introduced a common programming technique called recursion. This is not just any old programming pattern however.

In 1933 a mathematician, Gödel, showed that with recursion you can calculate anything you could calculate with pen and paper. A new way of doing maths, in essence this was the first Turing complete programming language, three years before Turing discovered Turing machines and Church found Lambda calculus. It turns out that the three approaches are more or less equivalent, Church and Gödel providing the rigour and Turing the dream of practical universal computing machines.

Eighty years later we live in a world founded on those three ideas, we can also mix and match them, to fit our sensibilities. Currently, only the developer preview of Safari, supports a stable version of recursion ('tail call' optimisation) for JavaScript (not even Babel) even though it is defined in the current ECMAScript standard.

In almost every browser each recursive call uses up a little memory, however the WebKit browser sees when a recursive call is run from the end of the function and it knows it can then safely discard everything from before the recursive call. In this way 'tail optimised' recursive calls conserve memory and can be run safely.

The 'generate array' example in our concurrency chapter shows how we can build up an array,

`const generate = n =>
 n <= 1 ?
  [1]
  :
  [1].concat(generate(n-1));`

E.g. if we paste this into our console, and would call `generate(100)`, we can generate an array with 100 ones.

However, if I want to create an array of 6,000 ones (on my machine) I see an error instead,

`InternalError: too much recursion`

On the other hand we can use the usual mutable and imperative style of coding and achieve the same result.

`const generateW = x => {
 var r = [];
 while (x > 0)
  {
  r.push(1);
  x--;
  }
 return r;
 };`

Now we can generate large arrays, but what is lost? Simplicity. We exchange our constants for variables. The road to hell is paved by good intentions, as they say, and the reason why it is best to avoid loops.

##Conclusion

Recursion is a prickly topic in JavaScript right now, we are so close to gaining support in modern browsers and yet it is still not available.

For many data structures such as arrays [`reduce` is a convenient substitute](http://www.cs.nott.ac.uk/~pszgmh/fold.pdf). There are some corner cases where `reduce` is not a neat fit, and you may be tempted to use recursion. Most of the time, you should not worry, just keep in mind current limitations, i.e. you can only call recursively so many times before your browser will run out of steam.

If you want to be safe in terms of memory usage, you can either use `while` loops or look into 'trampoline' functions. Trampolines are a substitute for recursion which keep your code immutable - they are a little convoluted to implement and not dealt with here.

##More Info

1) The current state of support for [EcmaScript 6](http://kangax.github.io/compat-table/es6/)

2) Using [Trampolines in JavaScript](http://raganwald.com/2013/03/28/trampolines-in-javascript.html)

3) Entertaining talk [on recursion, lambdas and Turing machines](https://www.youtube.com/watch?v=aeRVdYN6fE8) amongst other things

##Try

1) Write a recursive function which intentionally errors out with 'too much recursion'

2) Implement a while-loop version, of the previous function which never errors

3) Write a trampoline function which doesn't compromise on our functional principals and also never fails
