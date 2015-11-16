
#Asynchronicity & Performance

We are all waiting for something, and our computers are no different.

Computers are built on four building blocks. CPUs, memory, hard disks and networks.

Our programs are only as fast as the slowest component.

To put machine-scale wait times in a human context, this table normalises wait times to a base of one second.

![Latency Table](images/07_latency_table.png)

[[Systems Performance: Enterprise and the Cloud](http://www.amazon.com/dp/0133390098/?tag=codihorr-20) via [Jeff Atwood](http://blog.codinghorror.com/the-infinite-space-between-words/)]

As we saw right from the beginning of this book, JavaScript lives on the web, which means one of its biggest challenges is to overcome network wait times.

It turns out that solving network waiting issues leads to vastly more efficient processing times also.

##Async

Programmers solve this waiting problem caused by distributed systems using the concept of 'asychronicity'.

Usually when we do something in a programming language we expect the `A`, `B` and `C` commands to be executed in order.

~~~~~~~~
|----A-----||-----B-----------||-------C------|
~~~~~~~~

Once `A` is finished we move on to `B` and so on.

I.e. `A`'s input and output occur *synchronously* within the same time period 'A'.

~~~~~~~~
|----A-----|
  |-----B-----------| 
   |-------C------|
~~~~~~~~

With asynchronous execution, we kick off `A`, `B` then `C`, and they run *asynchronously* until they are finished.

The execution times are no longer clearly demarcated in relation to each other. A hold up in `A` won't a delay `B` and `C`.

We have stepped from the safety of line by line execution into a world which bedevils programmers everywhere, but we need to embrace this new world because the clear performance benefits are far too enticing to resist.

##VLookUp Example

The VLookUp function is bread and butter to every Spreadsheet warrior.

Let's start by using a helpful function similar to those we have encountered previously (`filter` and `map`).

`find` searches an array for the first object which matches specific criteria.

In your browser's console paste the following.

~~~~~~~~
const countries = [
 {name:"IBM",     country:"USA"},
 {name:"VW",      country:"Germany"},
 {name:"Xiaomi",  country:"China"},
 {name:"Lenovo",  country:"China"},
 {name:"Twitter", country:"USA"}
 ]
~~~~~~~~

and then,

~~~~~~~~
countries.find(
 row => row["country"] == "USA"
 )
~~~~~~~~

This searches through our array of objects and returns the first which has country equal to `USA`,

~~~~~~~~
>> Object { name: "IBM", country: "USA" }
~~~~~~~~

Let's do the same for China.

~~~~~~~~
countries.find(
 row => row["country"] == "China"
 )
~~~~~~~~

~~~~~~~~
>> Object { name: "Xiaomi", country: "China" }
~~~~~~~~

This is precisely how we would expect a lookup in a VLookUp spreadsheet function to behave.

If the first array represents the 'spreadsheet' which we are looking up, let's create an array which represents the 'sheet' from which we are looking up.

~~~~~~~~
const holdings = [
 {name:"IBM",     value:1000000},
 {name:"VW",      value:10000},
 {name:"Xiaomi",  value:5000000},
 {name:"Lenovo",  value:4000},
 {name:"Twitter", value:90000}
]
~~~~~~~~

We can imagine that we have a holdings report of our portfolio's investments and a spreadsheet with our country information, and we want to join both sets of data so we can summarise our holdings by `country`.

In essence, we would like to `map` each `holding` and for each `holding` object `find` the matching `name`, returning a `holding`-`country` object pairing.

This seems like a good way to begin,

~~~~~~~~
holdings.map(
 holding => {
 ...
 }
);
~~~~~~~~

what will we do with each `holding`?

We will use its name to match an object in our `countries` array,

~~~~~~~~
holdings.map(
 holding => {
  const country =
   countries.find(
    row => holding['name'] == row['name'] 
    );
  ...
 }
);
~~~~~~~~

Once we have our `country` object from the `countries` array we will return the `holding` and `country` objects as a pair to our `map` function.

~~~~~~~~
holdings.map(
 holding => {
  const country =
   countries.find(
    c => holding['name'] == c['name'] 
    );
  return {holding: holding, country: country};
 }
);
~~~~~~~~

which gives us a joined array of objects where we can access all of the data we need to summarise by value and country.

~~~~~~~~
>> Array[ 
 {
  holding: {name: "IBM", value: 1000000},
  country: {name: "IBM", country: "USA"} 
 }
 , ...
 ]
~~~~~~~~


##Generators

So far so good, but our VLookUps only work in a world where all the data has already been loaded.

Of course we could load data synchronously, but this is usually slow and is frowned upon in JavaScript.

Generator functions can be used for a variety of purposes, but here we will treat them like a postbox.

~~~~~~~~
const postBox = function*(){
 const a = yield;
 const b = yield;
 console.log(
  vlookup(a, 'date', b )
 )
}
~~~~~~~~

(Play with the example code [here](https://github.com/mmport80/JavascriptFinanceBook/blob/master/manuscript/code/chapter%207%20-%20concurrency/concurrency.zip) - only compatible with the latest FireFox right now!)

Generator functions are denoted by an asterisk.

This particular 'postbox' accepts two messages `a` and `b`.

After being sent two messages, the postbox will process the data. In this case it will log the output of a generalised VLookUp function.

We initialise `postBox` like so,

~~~~~~~~
const send = postBox();
send.next();
~~~~~~~~

Each message is sent in this format,

`send.next(data)`

We will demo this functionality in a demo application which is part of code used to backtest a strategy based on EuroDollar prices.  

![Euro Dollar Prices](images/07_eurodollar_prices.png)

(Example EuroDollar price history file)

The following function from the `D3` library parses a CSV file containing daily future prices from our hard disk,

~~~~~~~~
d3.csv(
 'CME-EDU2021.csv',
 data => send.next(data)
 );
~~~~~~~~

The first input is the file's name. The second is the 'callback' function used to process the data after parsing. We just send the data over to our `postBox`.

Doing the same again 'fills' the postbox,

~~~~~~~~
d3.csv(
 'CME-EDU2016.csv', 
 data => send.next(data) 
 );
~~~~~~~~

we end up with each future's data paired up by date.

~~~~~~~~
>> Array[
 {
  first: {
   Date: "2015-11-06",
   Settle: "97.11",
   ...
  },
  second: {
   Date: "2015-11-06",
   Settle: "99.025",
   ...
  }
 }
 , 
 ...
 ]
~~~~~~~~

##Summary

JavaScript was born on the web, in that world JavaScript users (read website visitors) will not be willing to make a cups of tea before a process completes as is often the case for complex Spreadsheets or Python scripts.

Instead JavaScript relies heavily on asynchronous execution to limit delays.

Our demo code shaved a handful of milliseconds off total execution by reading and parsing data concurrently.

If this was 'big data', this would result in a 'big' performance win, by loading and processing large files at the same time.

Also if we are continuously processing files over the network, we could shave seconds off execution time.

For example,

~~~~~~~~
d3.csv( 
 "https://www.quandl.com/api/v3/datasets/CME/EDU2016.csv", 
 data => send.next(data)
 );
~~~~~~~~

~~~~~~~~
d3.csv(
 "https://www.quandl.com/api/v3/datasets/CME/EDU2021.csv", 
 data => send.next(data)
);
~~~~~~~~

does the same as our previous code, but pulls the data asynchronously from Quandl's servers.

Now that we understand how to process data asynchronously the way is open to overcome performance bottlenecks and fully utilise modern multicore machines.

##More Info

1) Learn more about generators and their uses [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

2) Read a brief overview of the past, present and future of asynchronous JavaScript [here](https://blog.risingstack.com/asynchronous-javascript/)

##Try

1) Use the `time.console()` function to record single request execution times in comparison to the total

2) Come up with a process which taxes the CPU instead of the hard disk or network - see whether you noticed performance gains in comparison to running the code in a synchronous step by step fashion?