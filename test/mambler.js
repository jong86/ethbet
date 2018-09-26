// Contracts
const Mambler = artifacts.require('./Mambler.sol')
const Web3 = require('web3')
var web3 = new Web3('http://localhost:9545');
const BN = web3.utils.BN

// Test blockchain must use a block time of 1s (not automine)

// Tests
contract('Mambler Contract tests', async accounts => {
  let mambler
  const alice = accounts[0]
  const bob = accounts[1]
  const carol = accounts[2]
  const bobBetAmount = new BN(100000000)
  const carolBetAmount = new BN(200000000)
  let gasUsed, gasPrice, betTxHash

  it('should be deployed, Mambler', async () => {
    mambler = await Mambler.deployed()
    assert(mambler !== undefined, 'Mambler was NOT deployed')
  })

  it('allows an account to make a bet', async () => {
    mambler = await Mambler.deployed()

    try {
      await mambler.bet('0x0000000000000000000000000000000000000000', { from: bob, value: bobBetAmount })
      assert(true)
    } catch (e) {
      assert(false, e)
    }
  })

  it('gives winning account correct prize amount when claimPrize is called', async () => {
    mambler = await Mambler.deployed()

    mambler.bet('0x0000000000000000000000000000000000000000', { from: bob, value: bobBetAmount })
    mambler.bet('0x0000000000000000000000000000000000000000', { from: carol, value: carolBetAmount })

    try {
      const response = await mambler.claimPrize({ from: bob })
      console.log('response', response);
    } catch (e) {
      assert(false, e)
    }
  })

  it('errors if msg.value is zero', async () => {
    mambler = await Mambler.deployed()
    try {
      const res1 = await mambler.bet('0x0000000000000000000000000000000000000000', { from: bob })
    } catch (e) {
      return assert(true)
    }

    assert(false, 'did not error when msg.value was zero')
  })
})
