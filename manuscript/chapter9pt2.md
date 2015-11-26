##Going 3D

Now for something a little more complex. The last chapter covered a way to numerically approximate European options using the Monte Carlo method.

How about visualising the reliability of the Monte Carlo method by display the results in 3d?

To do this we will price 100 different call option contracts with various expiries and volatilities. Specifically combinations of these inputs,

~~~~~~~~
const expiries = [1,2,3,4,5,6,7,8,9,10];
const volatilities = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1];
~~~~~~~~

As in the previous chapter each contract is concurrently processed by a web worker.

~~~~~~~~
expiries.map(
 e => volatilities.map(
 v => c(110, 100, v, e, 0.01)
 )
);
~~~~~~~~

This means we create 100 web workers (use FireFox to run this code from your desktop - as always - by default Chrome's security doesn't allow workers to be run locally).

If you had 100 cores they would process together, but I only have 2 (ignoring Intel's 'hyperthreading' feature) on my 2008 laptop. The upshot is that browsers running on machines with more cores will automagically scale to utilise all the cores available (even phones often have 8 cores nowadays).

Our `data` variable includes our new `z` dimension.

~~~~~~~~
var data = [
 {
 x: es,
 y: vs,
 z: ps,
 type: 'surface'
 }
];
~~~~~~~~

`es` is the list of expiries; `vs` volatilities; and `ps` price results from each Monte Carlo simulation our web workers run. 

![3D Volatility Term Structure](images/09_3d_term_structure.png)

Apart from having a whizz bang interactive 3D model, what do we have?

We can see that our model is smooth at shorter expiries and lower volatilities, it starts breaking up at the higher end and being inconsistent across contracts. Which means we should be more careful of such results. Perhaps more calculations are needed at that end and less required where the result are smoother?

Lastly, although not always applicable, we can get an intuitive idea how complex mathematical objects operate in three dimensions.

When stress testing portfolios for example, even very complex (at first sight) portfolios can often be broken down into three major risk factors. If we set a maximum allowed loss before we go bankrupt or a 'line in the sand' we can understand better how we might hedge against such catastrophes.

##Summary

We have just scratched the surface on *one* popular visualisation library. In the next chapter we will take a brief look at the Gorilla in the room - D3 - which we can use to produce tailor made visualisations.

In a world where Jupyter and Python notebooks are becoming ever more popular, publishing on the web is becoming more of a necessity, which ironically means that Python, R, Julia and the rest are depending on libraries like Plotly.

The advantage in using JavaScript is that we can speak the web's native language which we can use to fully express our ideas and tinker, rather than being limited by whatever hooks to JavaScript third party library's provide.

##More Info

1) Plotly's documentation is [here](https://plot.ly/javascript/)

2) Check our the cool 3D visualisations built by the [stack.gl](http://stack.gl/) (another pillar of plotly)

##Try

1) Do the same calculation with the  Black Scholes formula analytically instead of numerically

2) Plot the differences between the numerical and analytical results

3) Plot the futures term structure by yield rather than price

4) Plot the future term structure in 3D over time
