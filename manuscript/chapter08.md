#Concurrency

As we saw in the previous chapter, doing things asynchronously is really appealing when you can pull it off elegantly.

A bit like juggling, there's a lot going on, but a skilful juggler only ever interacts with one ball at a time if he is juggling one handed - and two with both hands.

In the same way our JavaScript code in the previous chapter juggled everything with *one* hand, dealing with each task as it needed to.

It seemed that we had a lot going on at the same time, but in fact we were just running the tasks in a very smart manner.

##Monte Carlo Method

Before we start getting all up-in-the-multi-core let's lay out a common problem in quant finance.

Many questions in finance cannot be solved analytically, and while the Monte Carlo method is the lowest denominator of numerical methods, it is also useful for many complicated problems.

As the name implies, we generate a series of random outcomes in order to understand better how our problem looks under different circumstances.

Our generic generation function looks like this,

~~~~~~~~
const generate = n =>
 n <= 1 ? 
  [1]
  :
  [1].concat( generate(n-1) );
~~~~~~~~

`concat` sticks two arrays together. `generate` returns either an array (`[1]`) or an array stuck together with the `generate` function itself.

So, `generate(100)` will return an array with one hundred ones.

Next, let's generate some random numbers.

~~~~~~~~
Array.prototype.randomNumbers = function(){
 return this.map( 
  _ => Math.random()
  );
 }
~~~~~~~~

Unsurprisingly for the English language readers amongst you, `generate(100).randomNumbers()` returns an array of 100 random numbers.

We can do the same for a series of numbers pulled from a Brownian Motion process.

~~~~~~~~
Array.prototype.bMPNumbers = function(){
 return this.map( 
  _ => jStat.normal.sample( 0, 1 )
  );
 }
~~~~~~~~

The jStat library's `normal` function pulls a number from the normal distribution with a mean of zero and a standard deviation of one.

`generate(100).bMPNumbers()` does exactly what you would expect it to do.

So in the usual way of things, let's define a geometric Brownian process as,

~~~~~~~~
Array.prototype.gBMPForwardPrices = 
 function(spot, volatility, expiry, interestRate){
  return this.map(
   _ =>
    spot * 
    Math.exp(
     (interestRate - 0.5 * Math.pow(volatility, 2) ) * 
     expiry + 
     volatility * 
     Math.sqrt(expiry) * 
     generate(1).bMPNumbers()
     )
   )
 }
~~~~~~~~

If we want to have an idea of where a stock price could end up at a particular 'expiry' date 10 years hence, we could write the following,

~~~~~~~~
generate(100).gBMPForwardPrices(100, 0.1, 10, 0.01)
~~~~~~~~

and now let's see how those 'forward' prices influence the value of a call option at the `expiry` date.

~~~~~~~~
Array.prototype.callOptionForwardPrices =
 function( forwardStrikePrice, spot, volatility, expiry, interestRate){
  return this.map(
   _ => Math.max(
    generate(1)
     .gBMPForwardPrices(spot, volatility, expiry, interestRate)
     - forwardStrikePrice
    , 0 
    )
   )
 }
~~~~~~~~

The average of our forward prices hover around the analytical Black Scholes solution (~14.12).

~~~~~~~~
jStat(
 generate(5000)
  .callOptionForwardPrices(110, 100, 0.1, 10, 0.01)
 ).mean()
~~~~~~~~

`>> 14.610885699674231`

As mentioned previously however, Monte Carlo should only be pulled out of the tool box as a last resort when there is no computationally concise or precise analytical solution to be had.

##Concurrency

There can never be enough computer hardware thrown at large numerical problems precisely because these solutions can never quite land on the right solution.

The best worst answer, is to fully utilise the hardware available and come as close as possible.

First we set up our web workers. Web workers process data independently - the extra hands needed as we need to juggle more balls simultaneously.

~~~~~~~~
//worker.js file
 var onmessage = input => {
  const parameters = input.data[0]
  const calls = 
   generate(5000)
   .callOptionForwardPrices(
    parameters.forwardStrikePrice,
    parameters.spot,
    parameters.volatility,
    parameters.expiry,
    parameters.interestRate 
    );     
  const result = jStat(calls).mean()   
  postMessage(result);
  }
~~~~~~~~

Web worker logic is stored in its own file - total separation of logic between web workers is crucial in concurrent systems.

As with our previous use of asynchronous generators in chapter 7, web workers are analogous to post boxes and wait for messages. The message received is called `input.data`, which is an array. We will send an object of call option parameters to our worker.

Once we have our result we post our message onwards, to be collated by the main script.

~~~~~~~~
//concurrency.html
const w = new Worker("worker.js");
~~~~~~~~

Our main script, i.e. the HTML page we run everything from, instantiates each new worker by calling the `worker.js` file we have created.

~~~~~~~~
w.postMessage(
 [
  {
   forwardStrikePrice:     forwardStrikePrice, 
   spot:                   spot, 
   volatility:             volatility, 
   expiry:                 expiry, 
   interestRate:           interestRate
  }
 ] 
);
~~~~~~~~

We mirror the structure in `worker.js`. First by setting up how to send data. Then by adding an `onmessage` function to retrieve data from the worker.

~~~~~~~~
w.onmessage =
 result =>
  send.next(result.data);
~~~~~~~~

What do we do with the results we receive from each worker? We send it to a `postBox` generator function just as we did in the previous chapter.

~~~~~~~~
const postBox = function*(){
 const a = yield;
 const b = yield;
 console.log( (a + b) / 2 );
 }
~~~~~~~~

How does this concurrent code compare with the original's performance?

My dual core 2008 laptop generates 10,000 prices in a little over 5 seconds; and two batches of 5,000 prices in a little over 2 seconds. Double the performance!

##Summary

We have covered a lot in a very small space. Let's recap.

The new method of number generation allows us to symbolically represent infinite series of numbers without loops or the traditional control structures, leading to clean intuitive code.

By repurposing the `postBox` generator template which we used to handle asynchronous execution cleanly, we have managed to do the same with concurrent execution. The performance benefits are clear.

As machines add ever more cores, concurrent programs will increase in performance linearly along with machine performance. We now find ourselves working with the grain of modern hardware rather than against it. Moreover many financial problems are ideally suited to this, as they can be broken up easily into smaller components.

##More Info

1) We touch ever so lightly on recursion in this chapter. Unfortunately it is not fully supported in JavaScript yet, search for and read up on Tail Call Optimisation (TCO), to understand the upcoming possibilities better.

2) Web Workers are quite versatile read more [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)!

##Try

1) Explore other mathematical sequences. Can you create Fibonacci and Prime number sequences in the same vein as above for example?

2) Generalise the concurrent code to run with an arbitrary number of workers, rather than a static two

3) How would you go about implementing a simulation for American options?

4) Can you implement a low discrepancy number sequence? A la Sobol?
