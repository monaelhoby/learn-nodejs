const { forEach, map } = require('./index');

const assert = require('assert')

const test = (desc, fn) => {
  console.log('----', desc);
  try {
    fn();
  } catch (err) {
    console.log(err.message);
  }
};

// test('The forEach function', () => {
//   let sum = 0;
//   forEach([1, 2, 3], value => {
//     sum += value;
//   });

//   assert.strictEqual(sum, 6, 'Expected summing array to equal 6')

// });

//using mocha
it('The forEach function', () => {
    let sum = 0;
    forEach([1, 2, 3], value => {
      sum += value;
    });
  
    assert.strictEqual(sum, 6, 'Expected summing array to equal 6')
  
  });

test('The map function', () => {
  const result = map([1, 2, 3], value => {
    return value * 2;
  });

//   assert.strictEqual(result[0], 2)
//   assert.strictEqual(result[1], 4)
//   assert.strictEqual(result[2], 6)
  assert.deepStrictEqual(result, [2, 4, 7])

//   if (result[0] !== 2) {
//     throw new Error(`Expected to find 2, but found ${result[0]}`);
//   }
//   if (result[1] !== 4) {
//     throw new Error(`Expected to find 4, but found ${result[0]}`);
//   }
//   if (result[2] !== 6) {
//     throw new Error(`Expected to find 6, but found ${result[0]}`);
//   }
});

//uing mocha

it('The map function', () => {
    const result = map([1, 2, 3], value => {
      return value * 2;
    });
    assert.deepStrictEqual(result, [2, 4, 7])
})
