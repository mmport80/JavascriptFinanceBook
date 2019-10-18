#Pipes

The first chapter ended with code which included a map and a filter which we will dive back into now with a less applied more intuitive example.

Open up the JavaScript console and paste or type in the following code,

~~~~~~~~
[0,1,2,3,4,5,6,7,8,9]
 .filter(
  item => item % 2 === 1
  )
~~~~~~~~

This code filters the array of numbers and returns an array of odd numbers.

`> [1,3,5,7,9]`

One feature of filter and map has been implicit until now. Arrays are both inputs and outputs to filters and maps.

What does this mean? It means we can plumb filters and maps together, letting the data flow through our code.

E.g.,

~~~~~~~~
[0,1,2,3,4,5,6,7,8,9]
 .filter(
  item => item %2 === 1
  )
 .map(
  item => item * item
  )
~~~~~~~~

The code filters out even numbers then squares whatever's left,

`>> [1, 9, 25, 49, 81]`

##Plumbing Aesthetics

There are two things to note.

Firstly, because the inputs and outputs of the filters and maps are arrays, our data flows through the logic piping we have built, in short this means we can read our code from top to bottom or left to right - in contrast to usual coding styles which are read inside out; bottom to top or right to left.

E.g. in illustrative *pseudo* code,

~~~~~~~~
map(
 filter(
  [0,1,2,3,4,5,6,7,8,9],
  item =>
   item % 2 === 1
  ),
 item =>
  item * item
 )
~~~~~~~~

This ‘classic’ code style is positively mind bending in comparison, and yet this is how code is often written!

Secondly, whenever the order of our logic 'blocks' is not important we know we are onto something!

E.g. we can switch the order of map and filter,


~~~~~~~~
[0,1,2,3,4,5,6,7,8,9]
 .map(
  item => item * item
  )
 .filter(
  item => item % 2 === 1
  )
~~~~~~~~

and the result is the same.

Think about describing a dog. The order with which we describe its colour, size or number of legs doesn't really matter, they are independent descriptive facts.

Code is the same, except we use it to describe problems. If the order of our logic doesn't matter, each block of code is more or less independent of the other, which means when we run into trouble with one block we need only revisit that piece of code to get things up and running again.

This style of coding is called 'declarative', i.e. we are *declaring* the problem rather than telling the machine exactly how to solve it, and we end up with more reliable and intuitive code.

At first, the pipe analogy seems like an attempt at overly dumbing down, but in fact the abstraction does simplify our code substantially. Reducing extraneous boilerplate down to a minimum, leaves us with a richer more expressive code vocabulary.

##More Info 

1) Read up on declarative programming [here](https://en.wikipedia.org/wiki/Declarative_programming).

2) Mozilla's JavaScript [filter documentation](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

##Try

1) Tweak the map above to multiply each element by two instead of squaring, then figure out how to make it declarative. I.e. filtering before or after the map should result in doubling the odd numbers, e.g. `>> [2,6,10,14]`.

2) Add a filter to the previous chapter's map which results in weekly and monthly data rather than daily.

3) Add a filter to the previous chapter's map which would remove rows which aren't populated with the correct data (e.g. blank cells or strings in numeric fields)

4) As in number 3, but return only the *incorrect* rows, so that we can easily troubleshoot data inputs
