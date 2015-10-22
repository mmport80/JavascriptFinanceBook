#Decomposition

So far we have been *composing* programs by piping small functions together.

*Composing* is apt, as we saw, this style leads to code which is read left to right like natural language (unless you speak Arabic!) with fewer nested brackets to boot.

Now we will look at taking a complex function and decomposing it into simpler parts.

##Lobotomised

The previous chapter was focused on functional inputs and higher order functions, this chapter is about functional outputs and down-trodden zombified functions.

As the old saying goes though,

> We are all in the gutter but some of us are looking at the stars

First let's create a 'complicated' function. Open your JavaScript console and paste the following,

~~~~~~~~
zeroCouponBondValue =
    (p,y,i) =>
        p / Math.pow(1+i,y);
~~~~~~~~

where

- `p` principal
- `y` years to maturity
- `i` interest rate

Financial markets are continuously writhing, but our principal will remain the same along with the bond's maturity date.

The one thing that does fluctuate is the interest rate, which a bond trader'd keep an eye on like a hawk.

Our valuation function might be perfectly fine for accountants, but for traders continuously looking at the outcome of many different scenarios on an ad hoc basis, two functions would be more convenient.

Let's *halve* the valuation function into two pieces, one half representing bond terms and conditions and the other fluctuating market data.

~~~~~~~~
partialVal =
    (p, y) =>
        (i) =>
            zeroCouponBondValue(p, y, i);
~~~~~~~~

Let's test.

`b = partialVal(100,10)`

Say the prevailing interest rate is 2%,

`b(0.02)`

then the bond's value is,

`>> 82.03`

let's change to 1%,

`b(0.01)`

`>> 90.52`

Of course, as well as modelling 'instantaneous' shocks to the portfolio, you might want to see shocks over longer periods as time to maturity gets closer.

We will carve out 'years to maturity' too then.

~~~~~~~~
partialVal =
    (p) =>
        (y) =>
            (i) =>
                zeroCouponBondValue(p, y, i);
~~~~~~~~

Now we only instantiate the partial valuation function with the principal value.

`b = partialVal(100)`

Recreating the original valuation looks like this.

`b(10)(0.02)`

`>> 82.03`

Roll down and shock,

`b(9)(0.03)`

`>> 76.64`

We see here, that while the initial function might be best suited for accounting back office purposes, it's malleable enough to transform it to fit very short term trader needs, and now perhaps longer term portfolio managers and strategists too!

##Frankenstein

As well as carving it up we can add to its functionality.

For example,

~~~~~~~~
partialVal =
    (p) =>
        (y) =>
            (i) =>
                (shock = 0)
                    zeroCouponBondValue(p, y, i+shock);
~~~~~~~~

Now we leave the current interest rate as is, and model shocks explicitly.

`b = partialVal(100)(10)(0.01)`

and

`b()`

returns the valuation as per usual

`>> 90.52`

but now we can add a shock,

`b(0.01)`

`>> 82.03`

Finally, a duration function,

~~~~~~~~
duration =
    ( fn, s = 0.01 ) =>
        ( fn(-s)-fn(s) )
        / fn()
        / (s*2);
~~~~~~~~

The shocks default to 1%.

Feeding it with our `b` bond,

`duration(b)`

gives us,

`9.92`

By no means is this a complicated function, but valuing securities can often require dozens of terms and conditions, not to mention many more pieces of market data describing term structures and the like.

##Conclusion

Usually refactoring production code to make functions more convenient is far too resource intensive or simply impossible due to the API being from a third party!

The arguments functions take often correlate well to problem domains. Decomposition provides  a way to tailor often frustrating APIs to suit our current needs *precisely*, making our code far more productive and robust.

##More Info

1) Check out more on partial function application [here](https://en.wikipedia.org/wiki/Partial_application)

2) [Currying](https://en.wikipedia.org/wiki/Currying) is related also

##Try

1) Repeat this bond example but with an option

2) Find three functions that you use frequently either available in JavaScript or elsewhere and carve them up on paper or in code

3) What does the order with which we list variables of decomposed functions imply?
