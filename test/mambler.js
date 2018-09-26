// Contracts
const Mambler = artifacts.require('./Mambler.sol')
const Web3 = require('web3')
var web3 = new Web3('http://localhost:9545');


// Tests
contract('Mambler Contract tests', async accounts => {
  let mambler
  const alice = accounts[0]
  const bob = accounts[1]
  const carol = accounts[2]
  const bobBetAmount = 10000000
  const carolBetAmount = 20000000
  let gasUsed, gasPrice, betTxHash

  it('should be deployed, Mambler', async () => {
    mambler = await Mambler.deployed()
    assert(mambler !== undefined, 'Mambler was NOT deployed')
  })

  it('allows an account to make a bet', async () => {
    mambler = await Mambler.deployed()
    try {
      const { receipt } = await mambler.bet('0x0000000000000000000000000000000000000000', { from: bob, value: bobBetAmount })
      gasUsed = receipt.gasUsed;
      betTxHash = receipt.transactionHash
      assert(true)
    } catch (e) {
      assert(false, 'an account could not make a bet')
    }
  })

  it('gives winning account correct prize amount when claimPrize is called', async () => {
    await mambler.bet('0x0000000000000000000000000000000000000000', { from: carol, value: carolBetAmount })

    try { 
      const tx = await web3.eth.getTransaction(betTxHash)
      gasPrice = tx.gasPrice
    } catch (e) {
      assert(false, e)
    }

    const txFee = gasUsed * gasPrice

    const balance1 = await web3.eth.getBalance(bob)

    try {
      await mambler.claimPrize({ from: bob })
    } catch (e) {
      assert(false, e)
    }
    
    const balance2 = await web3.eth.getBalance(bob)

    assert(balance1 === (balance2 + bobBetAmount + carolBetAmount - txFee), 'account did not receive correct prize amount')
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
