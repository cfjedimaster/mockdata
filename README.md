MockData
========

MockData is a simple service to generate fake JSON data via command line arguments. The idea being that
you may be offline, may not have access to an API, or simply need some fake data to test something on 
your front end.

Usage
=====

```
./node app 
```

Starts up the server on port 3000. To specify a port, just add it an argument:

```
./node app 6969
```

To get data from the service, point your XHR at:

http://localhost:3000/

Note: MockData uses CORS so if you're running a virtual domain then you will still be able to hit the service.
(As long as you have a decent browser.)

There are 2 types of arguments you pass to the URL. The first is the number of objects you want returned.

http://localhost:3000/?num=10

By default, MockData will return 10 objects. You can also specify a random number by using the form: rnd:X

http://localhost:3000/?num=rnd:10

This will return a random number of objects from 1 to 10. If you want to specify your own range, just use the form: rnd:X:Y

http://localhost:3000/?num=rnd:5:10

In order to define the type of data returned, you must specify one or more additional query string variables. The form is name=type, where name will be the name used in the result and type is the type of data. Here is a simple example:

http://localhost:3000/?num=3&author=name

This tells the service to return 10 objects with each containing an author field that has a type value of name. (More on types in a minute.) The result then would look something like this:

```
[
{
author: "Frank Smith"
},
{
author: "Gary Stroz"
},
{
author: "Lynn Padgett"
}
]
```

Additional fields than can just be appended to the URL:

http://localhost:3000/?num=3&author=name&gender=oneof:male:female

Which gives...

```
[
{
author: "Lisa Padgett",
gender: "male"
},
{
author: "Roger Clapton",
gender: "male"
},
{
author: "Heather Degeneres",
gender: "male"
}
]
```

Types
=====
string: Just returns string (not sure about this one)

name: Generates a random name.

fname: Generates a random first name.

lname: Generates a random last name.

age: Generates a random "adult" age of 18 to 75.

all_age: Generates a random age of 1 to 100.

email: Generates a random email.

ssn: Generates a random Social Security number.

tel: Generates a random (American) telephone number.

num: By default, a number from 1 to 10. You can also use the form num:X for a random number between 1 and X. Or num:X:Y for a random number between X and Y.

oneof: Requires you to pass N values after it delimited by a colon. Example: "oneof:male:female". Will return a random value from that list.

lorem: Returns lorem ipsum text. If used as lorem:N, returns N paragraphs. If used as lorem:X:Y, returns a random number of paragraphs between X and Y.
