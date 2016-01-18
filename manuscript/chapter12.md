#Turbo Boost

Starting JavaScript development is like deciding to support the Yankees or Manchester United. It's got a lot of history; the most money; and the deepest bench of developers, but sometimes, sometimes you wish it was a little more edgy.

JavaScript does not move quickly and the changes that are made are conservative.

Luckily there are many creative libraries which both add to JavaScript's capabilities and make it more performant.

##Underscore

After importing the Underscore library, '_' is used to call Underscore functions, like so:

`_.chain( [1,2,3,4] )
 .map( x => x+1 )
 .value()`

The `chain` function creates an Underscore object with which we can pipe into Underscore functions (i.e. we are using the Underscore version of `map` here). The `value` function drops us out of the 'Underscore world' into native JavaScript and returns a normal array or value.

Underscore brings two big benefits to the table.

Firstly it packages up useful and commonly used utility functions, which are not built into JavaScript by default.

For example,

~~~~~~~~
const bonds = [
 {ticker:"IBM",bps:12},
 {ticker:"MCD",bps:65},
 {ticker:"FB",bps:864}
 ]
~~~~~~~~

~~~~~~~~
_.chain(bonds)
 .pluck('ticker')
 .value()
~~~~~~~~

returns

`>> ["IBM","MCD","FB"]`

Sure we could do this with native JavaScript but as mentioned before, it can be clunky.

See how simple grouping can be,

~~~~~~~~
_.chain(bonds)
 .groupBy( x => x.bps > 500 )
 .value()
~~~~~~~~

~~~~~~~~
>> {
 true: [
  {ticker:"IBM", bps:12},
  {ticker:"MCD", bps:65}
  ]
 false: [
  {ticker:"FB",bps:864}
  ]
 }
~~~~~~~~

or shuffling,

~~~~~~~~
_.chain(bonds)
 .shuffle()
 .value()
~~~~~~~~

which randomly reorders our array.

Secondly Underscore improves on native JavaScript's performance massively, to the tune of 5-25% depending on the functions and data used.

##Lo Level Skulduggery

Lo-Dash is a library which feels a lot like Underscore but pushes the envelope further.

Benchmarks are more anecdotal than scientific, but some report Lo-Dash to be multiples faster than Underscore (i.e. 2x, 3x ...) or at the very least on a par.

What skulduggery is required to achieve this?

Lots of cleverness and some low level ugliness under the hood, which means you can take advantage of all the performance advantages while keeping your code pristine.

This prompts the question - why are the native functions so slow? Mainly because they are very conservative, they run well even in the worst of circumstances and corner cases; whereas Underscore, Lo-Dash and the rest optimise for the most common scenarios.

##Lazy.js

Laziness is a virtue in programming, and this idea has recently been embodied in a library called Lazy.js, the smartest library of its kind in the last few years (so smart that Lo-Dash has now adopted its ideas).

Rather than focusing on low level performance it takes a step back and approaches the problem from a different angle.

An extreme example might be having a lot of data, an array of a quintrillion numbers (10^18) perhaps. How do you go about processing this?

Well if you are using Lazy.js a good start is writing down the problem, i.e.,

~~~~~~~~
Lazy
 .range(1000000000000000000)
 .map( x => Math.pow(x,2) )
 .take(100)
 .value()
~~~~~~~~

`>> [0,1,4,9,16,...]`

Here we generate an array of numbers from one to a quintrillion, square each one, take the first 100, and perhaps print the result on a website or whatever.

The ingenious insight of Lazy.js is that results are only ever seen by the user at the end when the `value()` function is called. So rather than process the data at each step from top to bottom, it combines all three functions into one when `value()` has been called, which means we only need to traverse an array *at most* once.

One too many times if we have an array of a quintillion numbers! Luckily Lazy.js lives up to its name and stops once it has the required number of results - in this case 100.

While an extreme example, the marginal benefits from eeking out gains from low level speedups are dwarfed by improvements from realising many calculations are redundant and can be completely ignored.

##Summary

JavaScript is a like a mundane petri dish in which creative library authors cultivate new ideas, improving productivity and speed. In turn these ideas provide a roadmap for the JavaScript language itself.

##More Info

1) Take a look at the documentation for [Underscore](http://underscorejs.org/), [Lazy.js](http://danieltao.com/lazy.js/docs/) and [lodash](https://lodash.com/docs)

2) An [overview](http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/) of lazy evaluation

##Try

1) Look at previous chapter's code or your own and see whether you can simplify it by using functions from the any of the libraries mentioned here

