#Babel
Like all superheroes JavaScript's biggest strength is also its main weakness. JavaScript can be distributed and run anywhere, easily. The problem is that each browser or platform supports a slightly different subset of the language.

This book follows the current 2015 or EcmaScript 6 version of the language, which is OK for those of us running the latest browsers but unworkable for those lagging behind.

This is where the Babel transpiler library comes into play. It reads our ES6 code and transforms it into ES5 code, which means browsers such as Internet Explorer 10 or 11 which don't support ES6 can nevertheless run our code!

##Setup

NPM is the JavaScript package manager which helps us download and use JavaScript libraries. Visit the [NPM website](https://www.npmjs.com/) and install it on your system.

Then move to the directory which contains this chapter's code (cf. [here](https://github.com/mmport80/JavascriptFinanceBook/tree/master/manuscript/code/chapter%2015%20-%20babel)) and install the following libraries using your operating system's command line interface (CLI).

~~~~~~~~
npm install babel-cli babel-polyfill babel-preset-es2015
~~~~~~~~

`babel-cli` gives us the 'transpiler tool' which we use in conjunction with a 'polyfill' tool (which backports new API features to older browsers). `babel-preset-es2015` tells Babel what standard we will code in.

The transpiler transforms ES6 syntax. For example, fat arrow functions.

~~~~~~~~
const fat = input => input;
~~~~~~~~

The transpiler takes this code and outputs the classic JavaScript syntax,

~~~~~~~~
var fat = function fat(input) {
 return input;
 };
~~~~~~~~

Note, how not only `=>` is replaced, but also `const`.

To do this, all we have to do is run the following command in our operating system's CLI.

~~~~~~~~
babel src -d lib
~~~~~~~~

This command transpiles every `.js` file found in the `src` (source) folder to the `lib` folder.

Now we can write using the modern syntax while still being backwards compatible.

##Postbox Example

The main asynchronous pattern used throughout this book has been the postbox. We post messages asynchronously into our `postBox` which processes them in an elegant manner.

Again, the basic pattern is as follows.

~~~~~~~~
const postBox = function*(history){
  const message = yield;
  yield* postBox( history.concat(message) );
  }

const init = [];
const send = postBox(init);
send.next();`

send.next( 1 );
send.next( 2 ); 
send.next( 3 );
~~~~~~~~

Trying to do this with ES5 code is much uglier. This is the code that Babel-Polyfill generates for us,

~~~~~~~~
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
      return _context.delegateYield(postBox(history.concat(message)), "t0", 6);
     case 6:
     case "end":
      return _context.stop();
    }
   }
  }, postBox, this);
 });
~~~~~~~~

Of course we never have to worry about looking at the generated code.

However, we can see that the code here references an objects and functions from the Polyfill library. We need to link to it before we can run the code. To do so, we add the library at the top of our HTML file.

~~~~~~~~
<script type="text/javascript" charset="utf-8" src="node_modules/babel-polyfill/dist/polyfill.min.js" ></script>
~~~~~~~~

This path is where NPM install the packages we requested with respect to our html file.

Why be just be backwards compatible though? Babel also supports many ES7 language features. Such as `aysnc` functions and `await` keywords, which are similar to generators but are tailor made for asynchronicity. All of which can be transpiled down to ES5 code.

##A Neat Trick
Babel can be setup to run automatically once one of our files changes. The `package.json` in this chapter's code folder configures Babel.

~~~~~~~~
{
 "name": "my-project",
  "version": "1.0.0",
  "scripts": {
  "build": "babel --watch src -d lib"
  },
 "devDependencies": {
  "babel-cli": "^6.0.0",
  "babel-preset-es2015": "~6.5.0"
  },
 "dependencies": {
  "babel-polyfill": "^6.3.14"
  }
 }
~~~~~~~~

We have added the `--watch` parameter to our build command.

Now we can run,

~~~~~~~~
npm run build &
~~~~~~~~

and our transpiled files will be kept in sync with any changes made.


##Conclusion
Babel gives us a robust solution to compatibility issues, along with a certain amount of ease of mind while we are taking advantage of new technologies.

##More Info
1) Further instructions on Babel installation can be found [here](https://babeljs.io/docs/usage/polyfill/) and [here](https://babeljs.io/docs/setup/#babel_cli)

2) A full [list of supported ES2015 language features](https://babeljs.io/docs/learn-es2015/)

3) A table showing which platforms are compatible with [ES5](http://kangax.github.io/compat-table/es5/) and [ES6](http://kangax.github.io/compat-table/es6/)

##Try
1) Take an example from the book or one of your own pieces of code, try transpiling it and running on an older browser
