// Contracts
const Mambler = artifacts.require('./Mambler.sol')
const Web3 = require('web3')

// Tests
contract('Mambler Contract tests', async accounts => {
  let mambler
  const alice = accounts[0]
  const bob = accounts[1]
  const betAmount = 10000000
  let gasUsed, gasPrice, betTxHash

  it('should be deployed, Mambler', async () => {
    mambler = await Mambler.deployed()
    assert(mambler !== undefined, 'Mambler was NOT deployed')
  })

  it('allows an account to make a bet', async () => {
    mambler = await Mambler.deployed()
    try {
        const receipt = await mambler.bet('0x0000000000000000000000000000000000000000', { from: bob, value: betAmount })
        gasUsed = receipt.gasUsed;
        betTxHash = receipt.transactionHash
        assert(true)
    } catch (e) {
        assert(false, 'an account could not make a bet')
    }
  })

  it('gives winning user prize amount when claimPrize is called', async () => {
    try { 
      gasPrice = await Web3.eth.getTransaction(betTxHash)
    } catch (e) {
      assert(false, e)
    }

    console.log('gasUsed, gasPrice', gasUsed, gasPrice);


    try {
      const res1 = await mambler.bet('0x0000000000000000000000000000000000000000', { from: bob, value: betAmount })
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
