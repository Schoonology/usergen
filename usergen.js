var weighted = require('weighted')
  , usergen = {}

/**
 * Load source user data.
 */
usergen.data = {}
;['default'].forEach(function (name) {
  usergen.data[name] = require('./data/' + name + '.json')
})

/**
 * Generates a new, random user from the given source data.
 */
usergen.user = user
function user(data) {
  if (!data) {
    data = usergen.data.default
  }

  return {
    name: {
      first: selectOrRender(data.first),
      last: selectOrRender(data.last)
    },
    email: selectOrRender(data.email),
    username: selectOrRender(data.username)
  }
}

/**
 * Render the source data to a single, random value. If the input is an Array,
 * it's "rendered" by selection. If it's an Object, it's rendered by selecting
 * a `pattern`, replacing keys in that pattern with rendered elements (by key)
 * in the same object.
 */
usergen.render = selectOrRender
function selectOrRender(data) {
  if (!data.pattern) {
    return select(data)
  }

  var pattern = select(data.pattern)

  return renderPattern(pattern, data)
}

/**
 * Renders a patter with other data.
 */
function renderPattern(pattern, data) {
  var fragments = Object.keys(data)
    , rendered = pattern

  fragments.forEach(function (frag) {
    while (rendered.indexOf(frag) !== -1) {
      rendered = rendered.replace(frag, selectOrRender(data[frag]))
    }
  })

  return rendered
}

/**
 * Randomly selects an option from `options`.
 */
function select(options) {
  if (Array.isArray(options)) {
    return weighted.select(options, makeWeightSet(options))
  }

  return weighted.select(options)
}

function makeWeightSet(arr) {
  var weights = arr.__weights
    , idx = arr.length

  if (weights && weights.length === arr.length) {
    return weights
  }

  weights = new Array(arr.length)

  for (;idx--;) {
    weights[idx] = 1
  }

  // LEAK: Minor optimization knowing `weighted`.
  weights.__weighted_total = arr.length

  delete arr.__weights
  Object.defineProperty(arr, '__weights', {
    value: weights
  })

  return weights
}

/*!
 * Export `usergen`.
 */
module.exports = usergen
