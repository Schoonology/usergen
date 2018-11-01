var test = require('tape')
var usergen = require('../usergen')
var DATA = {
  string: 'value',
  number: 42,
  boolean: true,
  oneArray: ['one'],
  manyArray: [
    'many-one',
    'many-two',
    'many-three',
    'many-four'
  ]
}

test('usergen.user string value', function (t) {
  var subject = usergen.user(DATA)

  t.equal(subject.string, 'value')
  t.end()
})

test('usergen.user number value', function (t) {
  var subject = usergen.user(DATA)

  t.equal(subject.number, 42)
  t.end()
})

test('usergen.user boolean value', function (t) {
  var subject = usergen.user(DATA)

  t.equal(subject.boolean, true)
  t.end()
})

test('usergen.user Array select from one', function (t) {
  var subject = usergen.user(DATA)

  t.equal(subject.oneArray, 'one')
  t.end()
})

test('usergen.user Array select from many', function (t) {
  var subject = usergen.user(DATA)

  t.ok(/^many-/.test(subject.manyArray))
  t.end()
})

test('usergen.user Object select with pattern')
test('usergen.user Object select without pattern')
test('usergen.user nested keys output')
