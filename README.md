# UserGen

This is a simple module that generates user data. Originally intended for
testing purposes, some of the methods could be useful outside of testing, such
as username generation.

## Installation

If you're using it for testing (usual case):

```sh
npm install usergen --save-dev
```

Otherwise:

```sh
npm install usergen --save
```

## Usage Example

Generating an entire user (to save to Mongoose, in this case):

```js
// Require the module.
var usergen = require('usergen');

// Generate user data.
var user = usergen.user();

// Example use case: saving this user to Mongoose.
SomeAwesomeModel.create(user);
```

Generating a username with custom data:

```js
var usergen = require('usergen');
var data = {
  Adj: [
    'Super',
    'Awesome'
  ],
  Verb: [
    'Jump',
    'Fly'
  ],
  Noun: [
    'Wizard',
    'Robot',
    'Zombie',
    'Ninja'
  ],
  pattern: {
    AdjNoun: 0.75,
    VerbingNoun: 0.25
  }
};

// Prints out the new username, rendered using `data`.
console.log(usergen.render(data));
```

## Alternatives

 - [randomuser.me](http://randomuser.me/) - A fantastic service with the same
 purpose. The only reason this module exists is because I wanted the same
 simple, useful feature offline. I also didn't need some of the features, like
 the profile picture. If you're looking for more fields and don't need to run
 your tests offline, _use this service_.
