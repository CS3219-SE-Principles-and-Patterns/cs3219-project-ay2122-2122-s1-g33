const subtract = require('./subtract')

// 1 - 2 == -1
test('properly subtracts two numbers', () => {
    expect(
        subtract(1, 2)
    ).toBe(-1)
})

