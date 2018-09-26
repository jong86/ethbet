pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Mambler is Ownable {
    struct Bet {
        address gambler;
        address miner;
        uint amount;
        uint block;
        bool prizeClaimed;
    }

    struct RoundInfo {
        uint block;
        uint totalAmount;
        uint totalBets;
        address miner;
    }

    mapping (uint => RoundInfo) public blockToRoundInfo;

    mapping (uint => mapping (address => Bet)) public bets;

    modifier valueGreaterThanZero() {
        if (msg.value < 1) {
            revert("Value must be greater than zero");
        }
        _;
    }

    function bet(address _miner) public payable valueGreaterThanZero {
        // Creates bet and adds it to the bets mapping
        // Bets are always for the next block
        uint nextBlock = block.number + 1;
        Bet memory _bet = Bet(msg.sender, _miner, msg.value, nextBlock, false);
        bets[nextBlock][msg.sender] = _bet;
    }

    function claimPrize() public {
        // Bets can only be claimed during the block the bet was for

    }
}