#Numerical Analysis

The central theme of this book has been transforming data in a stateless manner using `map`, `reduce` and other functional constructs. Data flows through our code until it's in the form we want it to be.

It comes in all shapes and sizes, but when when we are only working with numbers we can set aside our usual functional programming syntax and pick up familiar mathematical linear algebra tools instead.

Numeric.js is a library chock full of the numerical analysis tools you'd expect plus a few handy extras.

##Keeping Things Simple

As per usual, let's extract the close prices from the price data we usually request from Quandl.

~~~~~~~~
const closesPrices = _.chain(a)
 .take(n)
 .pluck("Adjusted Close")
 .map(x => +x);
~~~~~~~~

We are going to calculate daily returns, first step is to find an array of numerators and denominators.

~~~~~~~~
const before = closePrices.rest().value();
const after = closePrices.initial().value();
~~~~~~~~

The `after` array will be our numerators array and so on.

Dividing `after` by `before` is as simple as,

~~~~~~~~
numeric['/'](after, before)
~~~~~~~~

and taking the natural logarithm of each element is simple too,

~~~~~~~~
numeric.log( numeric['/'](after, before) );
~~~~~~~~

Which is slightly more convenient than in classic linear algebra syntax.

E.g.

~~~~~~~~
A = x*B, A*B^-1 = x
~~~~~~~~

and a lot simpler than using a `reduce` function.

Finally, let's demean (or detrend) our return series,

~~~~~~~~
const mean = jStat.mean(returns);
const R = numeric['-'](returns, mean);
~~~~~~~~

##Portfolio Optimisation

How about putting those returns to good use and optimising a portfolio's Sharpe ratio with them? As per usual the code follows the ['postbox' generator pattern](http://blog.johnorford.com/2015/11/08/the-waiting-game/) which elegantly handles asynchronous calculations (refer to previous chapters).

Firstly set the daily risk free rate.

~~~~~~~~
const rf = 0.000063;
~~~~~~~~

Then remove it from our returns. `getReturns` encapsulates the previous code outlined above.

~~~~~~~~
const returns = numeric['-'](
 getReturns(closePrices),
 rf );
~~~~~~~~

We find the mean, and also demean the time series, like so,

~~~~~~~~
const mean = jStat.mean(returns);
const demeanedReturns = numeric['-'](returns, mean);
~~~~~~~~

And adding our results to any previous results which have been 'posted' to us,

~~~~~~~~
const currentResults = 
 previousResults
  .concat(
   {Mean: mean, DemeanedReturns: demeanedReturns}
   );
~~~~~~~~

As a way of understanding how successful our optimisation results are, we will first calculate a Sharpe ratio for a portfolio of equally weighted stocks.

The 'rep' function from the numeric library creates a vector of repeated numbers.

~~~~~~~~
const w = numeric.rep(
 [currentResults.length],
 1/currentResults.length
 );
~~~~~~~~

E.g. with four stocks in our portfolio we have,

~~~~~~~~
>> [0.25,0.25,0.25,0.25]
~~~~~~~~

Set `R` to all of our stock's demeaned returns and calculate a variance covariance matrix using this formula,

~~~~~~~~
(R' * R) / (n - 2)
~~~~~~~~

which looks like this in code,

~~~~~~~~
const S = numeric
 .div(
  numeric
   .dot( R, numeric.transpose( R ) )
  , n-2
  );
~~~~~~~~

The code squares our demeaned return matrices and divides them by the number of returns we have minus one (in order to calculate sample variances).

But the code doesn't do it that nicely. Let's "add pipes" to these functions and rewrite the code.

~~~~~~~~
Array.prototype.x = function(input){
 return numeric.dot(this, input);
 }
~~~~~~~~

~~~~~~~~
Array.prototype.d = function(input){
 return numeric.div(this, input);
 }
~~~~~~~~

~~~~~~~~
const S = R
 .x( numeric.transpose( R ) )
 .d(n-2);
~~~~~~~~

Finally, aggregate the variance across the portfolio,

~~~~~~~~
const portfolioVariance = w.x(S).x(w);
~~~~~~~~

and find the return,

~~~~~~~~
const m = _.chain(currentResults)
 .pluck("Mean")
 .value();
~~~~~~~~
~~~~~~~~
const portolioReturn = m.x(w);
~~~~~~~~

Now we can calculate the Sharpe ratio. For a portfolio of social network stocks (Twitter, Facebook and LinkedIn) as of January 2016 the result is a Sharpe of `-0.7`.

How about turning a frown into a smile by optimising? 20-20 hindsight is a wonderful thing!

The optimal weights are a simple-to-calculate ratio.

~~~~~~~~
( S^-1 * m ) / (1' * S^-1 * m)
~~~~~~~~

Where `1` is a vector of ones.

~~~~~~~~
const numerator = numeric
 .inv(S)
 .x(m);
~~~~~~~~
~~~~~~~~
const denominator = numeric
 .rep([currentResults.length],1)
 .x(numerator);
~~~~~~~~
~~~~~~~~
const ow = numerator.d(denominator);
~~~~~~~~

We can now calculate the aggregate portfolio variance, return and Sharpe ratio in the same way as before.

The upshot? A Sharpe of 1.9! (No surprise - the solution shorts Twitter and LinkedIn)

##Summary

We have only touched upon the basic linear algebra features of the Numeric.js library, it packs in many more useful features though.

Mathematics is a little like wearing an Iron Man suit. It allows us to go further and think bigger. Apart from anything else, adopting the semantics and syntax of linear algebra leads to succinct reliable solutions which would be harder to achieve otherwise.

##More Info

1) All of numeric.js' features are documented [here](http://www.numericjs.com/documentation.html).

2) This is [a nice introduction](http://faculty.washington.edu/ezivot/econ424/portfolioTheoryMatrix.pdf) to portfolio linear algebra mathematics

##Try

1) Read the portfolio mathematics introduction linked to above and implement optimisers to find minimum variance, and the various optimal portfolios described
