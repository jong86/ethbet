//jshint ignore: start

// Contracts
const HelloWorld = artifacts.require('./HelloWorld.sol')

// Tests
contract('HelloWorld Contract tests', async accounts => {
  let helloWorld;
  const message = 'hello world'
  const alice = accounts[0]
  const bob = accounts[1]

  it('should be deployed, HelloWorld', async () => {
    helloWorld = await HelloWorld.deployed()
    assert(helloWorld !== undefined, 'HelloWorld was NOT deployed')
  })

  it(`should NOT let bob say "${message}"`, async () => {
    let tx;

    try {
      tx = await helloWorld.hello(message, { from: bob })
    } catch (e) {}

    assert.isNotOk(tx, `bob was not allowed to say "${message}"`)
  })

  it(`alice can say "${message}"`, async () => {
    helloWorld = await HelloWorld.deployed()

    try {
      await helloWorld.hello(message, { from: alice })
      assert(true, `alice can say "${message}"`)
    } catch (e) {
      assert(false, `alice could not say "${message}", but should be able to`)
    }
  })

  it('alice can transfer ownership to bob', async () => {
    helloWorld = await HelloWorld.deployed()

    try {
      await helloWorld.transferOwnership(bob, { from: alice })
      assert(true, 'alice transferred ownership to bob')
    } catch (e) {
      assert(false, "alice could NOT transfer ownership to bob")
    }
  })

  it(`now only bob can say "${message}"`, async () => {
    try {
      await helloWorld.hello(message, { from: bob })
      assert(true)
    } catch (e) {
      assert(false, `bob should be able to say "${message}", but could not`)
    }

    try {
      await helloWorld.hello(message, { from: alice })
      assert(false, `alice should not be allowed to say "${message}", but could`)
    } catch (e) {
      assert(true, `alice could not say "${message}" after bob was transferred ownership`)
    }
  })
})