#Higher Order Functions

The most difficult thing to do in computer science is naming things.

It has made many a programmer go insane. Exhibit A - Android's code names.

- Cupcake
- Donut
- Eclair
- Froyo
- Gingerbread
- Honeycomb
- Ice Cream Sandwich
- Jelly Bean
- KitKat
- Lollipop
- Marshmallow

Whoever coined the term 'functional' programming however was right on the money - functional programming is really just about functions. Specifically, 'higher order' functions.

`map`, `filter` and `reduce` are all higher order functions. Meaning, functions which take other functions as inputs.

##Functional Inputs

Simplifying the example found in the previous chapter, paste this into your JavaScript console,

~~~~~~~~
[1,1,1,1,1]
    .reduce(
        function(total,item){
            return total + item;
            }
        );
~~~~~~~~

The output will be,

`>> 5`

The `reduce` function takes an 'anonymous' function (or 'lambda') as an input.

Functions are first class citizens of Javascript, we can of course name them also (if you want to jump down that rabbit hole).

~~~~~~~~
sum =
    (total,item) =>
        total + item
~~~~~~~~
~~~~~~~~
[1,1,1,1,1].reduce(sum)
~~~~~~~~

Again the result is,

`>> 5`

It is easy to imagine a complicated scenario similar to the last chapter where we have to summarise a spreadsheet of data but moreover we need to convert the exposures to summarise the data with different currencies.

Rewriting or copying code is irksome and trouble prone, luckily functions in JavaScript are super flexible.

~~~~~~~~
toGBP = 
    item =>
        item * 1.5
~~~~~~~~
~~~~~~~~
Number.prototype.convert =
    function(funs){
        return funs.map( f => f(this) );
        }
~~~~~~~~

Before we deconstruct this, let's run it.

~~~~~~~~
[1,2,3].reduce(sum).convert( [toGBP] );
~~~~~~~~

`>> [ 9 ]`

`sum` does exactly what you would expect.

`[1,2,3]` is our 'data' set.

Lastly our FX conversion function.

We add `convert` to the JavaScript language's `Number` object which is used for numerical calculations. Doing this essentially adds pipes to our function.

Why is `toGBP` encased in square array brackets?

Let's add `toUSD` and find out.

~~~~~~~~
toUSD =
    item =>
        item * 1
~~~~~~~~

It doesn't actually do much, our base currency is USD.

~~~~~~~~
[1,2,3].reduce(sum).convert( [toGBP, toUSD] )
~~~~~~~~

`>> [ 9, 6 ]`

As you might have guessed our array of functions outputs an array of results.

Simple right? Need another currency? Just throw another converter function into the array.

For fun let's rename the `reduce` function.

~~~~~~~~
Array.prototype.calculate =
    function(fun){
        return this.reduce(fun);
        }
~~~~~~~~

~~~~~~~~
[1,2,3].calculate(sum).convert( [toGBP, toUSD] );
~~~~~~~~

Now our code almost reads like natural language. I.e.,

>Calculate sum; then convert to GBP and to USD

##Form and Function

The last chapter showed off the processing efficiency of `reduce` - as you saw how a single pass through an array could generate a slew of summary analytics.

This chapter shows the articulate nature of being able to pass functions around like any other variable and using higher order functions to operate on them.

The next chapters will explore the other side of the coin - functional outputs!

##More Info

1) Learn more about Lambda Calculus [here](http://palmstroem.blogspot.de/2012/05/lambda-calculus-for-absolute-dummies.html)

##Try


1) Modify the `calculate` function to accept more analytics - average and median perhaps

2) Modify the `convert` function to convert multiple arbitrary analytics

3) Instead of just returning numbers from the `toCCY` functions, return an object. E.g. `{ ccy: 'USD', amt: 10 }` is 10 USD.

4) List out an extension of our current set of vocabulary (`calculate`, `sum`, `convert`, `toCCY`) which would complete a current task you have at work.

5) Chapter 3 extolled a declarative style in which the order of our operations doesn't matter (i.e. commutative). Can you code `calculate` and `convert` so that they still work after swapping them about?
