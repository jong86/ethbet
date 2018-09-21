pragma solidity ^0.4.24;

contract HelloWorld {
    // Track the owner
    address internal owner;

    constructor() public {
        owner = msg.sender; // Deployer of contract
    }

    // Log string
    event Hello(string _msg);

    modifier onlyOwner {
        require(msg.sender == owner, "You must be the contract owner");
        _;
    }

    function hello(string _msg) external onlyOwner {
        emit Hello(_msg); // Note emit keyword
    }

    function transferOwnership(address _owner) external onlyOwner returns(address) {
        owner = _owner;
        return owner;
    }
}