#Post Script
This book was aimed at introducing a VBA replacement. No doubt VBA has its place, but it is also stuck in that same niche, unable to evolve and in turn not giving VBA developers a chance to grow.

Set in stark contrast is the rich and vibrant JavaScript landscape. The language provides a variety of styles, but we have kept tightly to a functional approach which allows us to simply but effectively navigate problems. Instead of referring to it as the usual 'map reduce' methodology perhaps it's better to call it 'map rejoice'!

##Libraries
On top of the aesthetic joy to be derived from JavaScript there are the libraries, so many libraries to explore and use. We have only covered a handful, but there are so many more, for example,

###[PouchDB](http://pouchdb.com/)

A client side NoSQL database. Keep a store of all your data while online or offline and optionally sync it up to a server whenever you need to.

###[sql.js](https://github.com/kripken/sql.js)
Need some beefier data modelling than what NOSQL provides? How about using client side SQLite for JavaScript?

###[JSON Editor](https://github.com/jdorn/json-editor)
Want to build HTML forms from your JSON object data easily? This library does it for you *automagically*!

###[freeboard](https://github.com/Freeboard/freeboard)
Blow minds by packaging your tools into a set of dashboards. That's right, multiple connected and interactive apps on one web page.

###[Vega Lite](https://medium.com/@uwdata/introducing-vega-lite-438f9215f09e#.gaucngl0e)
We covered two visualisation libraries in this book, but there are many more. Vega Lite focuses on simplicity, steering clear of the usual prescribed spreadsheet-chart-template-approach, i.e. it remains quite expressive.

###[Convnet](http://cs.stanford.edu/people/karpathy/convnetjs/)
A machine learning neural network library. Take a look at their website for many examples to see what's possible.

###[JSHint](http://jshint.com/about/)
JavaScript is not a compiled language, which means many bugs may only be caught by the user when running the application. JSHint is a community based project which scans your code for pitfalls. Not only that, but it enforces writing styles, to keep your code looking smart also.

##In Relation to Python and R
Scientific computing is dominated by two giants. In truth each language is of course a tool, and different jobs require different tools. Nevertheless, JavaScript's unique selling point is distribution. If you want to distribute your analysis in an interactive form to the widest audience possible you need JavaScript.

Moreover, many financial analysts may not have Python or R environments to hand, while the availability of JavaScript is a certainty.

##Node
This book is aimed at financial analysts needing to complete their daily tasks efficiently. There may be a time however when a solution is so compelling that others need to use it, or perhaps it takes longer than usually comfortable in a browser.

Node.js is the answer, it takes the fast JavaScript engine from the Chrome browser and packages it up as a multi purpose runtime able to power desktop or server applications just as Python or any other language can.

While developers currently devote more time into running JavaScript on the browser than anything else, Node.js is a big deal in its own right in comparison to other server or desktop bound runtime environments. On the server side Chrome's V8 engine (Microsoft's Chakra engine is also available for Node.js now) is very competitive. Also, perhaps surprisingly to some, the desktop, JavaScript and HTML are increasingly at the cutting edge of interface design which is seeing more Node.js desktop applications being developed.

##Runtime Improv
We have seen how to compile cutting edge JavaScript down to lowest common denominator versions of the language in order to maximise backwards compatibility. It turns out, that you can compile totally different languages into JavaScript and run them anywhere. These languages range from those which aim to paper over JavaScript's cracks ([Microsoft's TypeScript](http://www.typescriptlang.org/), [Coffeescript](http://coffeescript.org/)) to those aimed at speeding browser scripts up ([Google's Dart](https://www.dartlang.org/)) to those offering a saner stricter functional experience ([ClojureScript](https://github.com/clojure/clojurescript), [Elm](http://elm-lang.org/), [PureScript](http://www.purescript.org/)) to the exotic but nevertheless 'Pac-Man complete' [Idris](http://www.idris-lang.org/) (i.e. the minimum barrier of any language is that you should be able to code a game of Pac-Man with it).

##Conclusion
Learning anything new is daunting, however I hope this book has shown you that you can enjoy coding in JavaScript and be productive. On top of all that, see how the JavaScript universe is a far richer and more interesting place than VBA and Excel would lead you to believe possible.

##More Info
1) Browse through the [hundreds of languages](https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js) which compile down to JavaScript (spot the Python to JavaScript compiler).

##Try
1) Pick a language which compiles down to JavaScript, install it and run a 'Hello World' script in your browser
