#Immutability

There is a subterranean theme flowing under each chapter of this book. Furthermore, you see it again and again in far flung fields and yet people rarely discuss it.

That is, often, tying your hands behind your back, i.e. prohibiting certain actions can help you immeasurably.

This book presents a functional style of programming, which only uses a subset of features available to JavaScript programmers. Specifically, you will have noticed that each snippet of code present here has used `const` or 'constant' to name values or functions rather than the more traditional `var` or 'variable' definition.

Constant values can't be reassigned, they are carved in stone, whereas variables are flexible.

##S&M

The variable concept in programming is unheard of in mathematics. Once you set an `x` to a value it won't be changed a few lines down, right? If you need a holder for a new value or function, you will use `y`, `z`, `g()` or `h()` rather than recycling `x` again.

Why? Mostly due to clarity. Changing x from '1' to '2' halfway down a list of equations is likely to throw the cat amongst the pigeons; and yet programmers do this all of the time!

Except for functional programmers that is, they eschew variables for the most part in favour of constants, ensuring that there can be no ambiguity.

##Mutable Hell

It turns out *the* big skeleton in JavaScript's closet is mutability. Almost everything is in fact mutable, even our beloved 'constants'! Leading to slippery buggy code that every JavaScript developer has to contend with.

For example type this in your console,

~~~~~~~~
const a = {value:1}
~~~~~~~~

let's copy the `a` object,

~~~~~~~~
const b = a
~~~~~~~~

and change our constant(!)

~~~~~~~~
b.value = 2
~~~~~~~~

now `b` looks like

~~~~~~~~
>> {value: 2}
~~~~~~~~

constants obviously aren't very constant.

Moreover, our original `a` also returns,

~~~~~~~~
>> {value: 2}
~~~~~~~~

We have two problems.

Firstly, while *we* see `a` and `b` as separate entities they are in fact the same object in the JavaScript runtime. Changes in one are reflected in the other.

This is why Underscore and Lo Dash libraries include a `clone` function. E.g. cloning `b` to `c` results in `c` *looking* identical but not linked in any way.

~~~~~~~~
const c = _.clone(b)
~~~~~~~~
~~~~~~~~
c.value = 4
~~~~~~~~

gives us the result we expect, `c` is,

~~~~~~~~
>> {value: 4}
~~~~~~~~

while leaving `b` and `a` alone.

Secondly cloning lots of data is at best cumbersome but also terribly wasteful.

##Simplicity

Facebook's Immutable library ensures our data is held securely in immutable structures which help us patch over the mess we would otherwise be in.

Let's replay the previous examples. Opening the 'immutable.html' page on this book's GitHub repository will import the Immutable library. We will convert our object to an Immutable Map (i.e. a list of key value pairs).

~~~~~~~~
const a_imm = Immutable.Map({value:1})
~~~~~~~~

and convert back to JavaScript,

~~~~~~~~
a_imm.toJS()
~~~~~~~~

~~~~~~~~
>> {value:1}
~~~~~~~~

Let's copy,

~~~~~~~~
const b_imm = a_imm
~~~~~~~~

and change `b_imm` as before,

~~~~~~~~
b_imm.set('value',2)
~~~~~~~~

`b_imm` remains the same! Just as we would expect - it's untouchable!

~~~~~~~~
>> {value:1}
~~~~~~~~

Where does our change go? It gets returned as a new immutable object.

~~~~~~~~
const b_imm_change = b_imm.set('value',2)
~~~~~~~~

~~~~~~~~
>> {value:2}
~~~~~~~~

Another big win is that *because* everything is secure, the Immutable library just links back to previous pieces of data transparently removing all the wasteful and redundant copying and storing of data in memory.

Which leads to the next win. Testing whether an object has changed is a surprisingly big topic in JavaScript, because objects are mutable, every last nook and cranny of both objects needs to be traversed and compared.

All of our immutable objects on the other hand neatly link to each other. By definition the Immutable objects *know* `b_imm_changed` is different from `b_imm` because of the link between them.

~~~~~~~~
b_imm === b_imm_change
~~~~~~~~

~~~~~~~~
>> false
~~~~~~~~

And when we 'change back' the link between `b_imm_changed` and `b_imm` is removed, the objects 'know' they are equal because they are indeed one and the same.

~~~~~~~~
const b_imm_change_back = b_imm_change.set('value',1)
~~~~~~~~

~~~~~~~~
b_imm === b_imm_change_back
~~~~~~~~

~~~~~~~~
>> true
~~~~~~~~

All the while, the cleverness of such structural sharing is hidden behind the simple API.

##An Example

Let's take a couple of thousand fund transactions and process them using our new found immutable data structures (take a look at a working example in the GitHub repository).

The program parses a CSV file of transactions in the usual way, and then we have to convert each row object into an immutable map in order to excise all mutable data.

The CSV file has four columns, called 'Date', 'Symbol', 'Issue_Description' and 'Transaction'.

~~~~~~~~
const convertToImmutableList = data =>
  Immutable
    .List(data)
    .map( row =>
      new Immutable.Map(
        {
        Date: row.Date,
        Symbol: row.Symbol,
        Issue_Description: row.Issue_Description,
        Transaction: +row.Transaction
        }
        )
      );
~~~~~~~~

`Immutable.List(data)` converts our *array* of transaction row objects, but the map goes one step further and converts each individual row.

Next we take each transaction and add them together by `Symbol` or 'ticker', to give the current holding of each stock.

~~~~~~~~
const update = (convertedData, previousTotal) =>
  convertedData.reduce(
    (accumulant, row) =>
      //check whether symbol has already been inserted
      accumulant.get( row.get( "Symbol" ) ) === undefined ?
        accumulant.set(
          row.get( "Symbol" )
          , row.get("Transaction")
          )
        :
        //add transaction to current running total
        accumulant.set(
          row.get( "Symbol" )
          , row.get("Transaction") +
            accumulant.get(
              row.get( "Symbol" )
              )
         )
    , previousTotal
    )
~~~~~~~~

In this way we add transactions to the `previousTotal`, which are the total for the previous day, and the `convertedData` list contains the transactions of the current day, the result will show our holdings for the current day.

Now we can leverage Immutable's extremely efficient way of utilising memory. Depending on the granularity of the data and requirements you could save each total by day or minute, replaying or fast forwarding through each snapshot with ease and speed.

We can collect each day's totals or each minute's if you need the granularity, which remember, is much more space efficient that usual mutable data, rewind and fast forward through the holdings snapshots.

##Conclusion

Immutable data is a slam dunk. It both simplifies our code and makes our programs far more efficient. It's a pity that JavaScript does not support it out of the box - as it is the one major feature which it so sorely lacks.

##More Info

1) Facebook's [Immutable JS library](http://facebook.github.io/immutable-js/)

2) The [Seamless Immutable library](https://github.com/rtfeldman/seamless-immutable) from the indefatigable Richard Feldman gives you immutable data which is backwards compatible with JavaScript's normal arrays and objects

3) Two videos ([1](https://www.youtube.com/watch?v=I7IdS-PbEgI) + [2](https://www.youtube.com/watch?v=wA98Coal4jk)) introducing immutability to a Javascript audience

##Try

1) Add a reconciliation step which would check a back office holdings file for a particular day with the running total we obtain from our transactions.

2) Build up a mutable data structure for option pricing (all the market data inputs, terms and conditions and finally pricing).

3) Add memoisation to your small immutable option calculation program. Memoisation stores results of computationally heavy processes (such as option pricing and greek calculations) so that you do not have to calculate them twice. This takes advantages of both our new found memory efficiency and fast equality checks.
