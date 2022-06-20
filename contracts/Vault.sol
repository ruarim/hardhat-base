pragma solidity ^0.8.0;

contract Vault {
    address payable public owner;
    bool public isBase;

    constructor() {
        isBase = true;
    }

    function initialize(address payable _owner) external {
        require(isBase == false, "ERROR - Base Contract");
        require(_owner == address(0), "invalid address");
        owner = _owner;
    }

    function withdraw() public {
        require(owner == msg.sender);
        owner.transfer(address(this).balance);
    }
}
