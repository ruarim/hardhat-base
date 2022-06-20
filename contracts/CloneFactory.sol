// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import "hardhat/console.sol";

contract Vault {
    address payable public owner;
    bool public isBase;

    constructor() {
        isBase = true;
    }

    function initialize(address payable _owner) external {
        require(isBase == false, "ERROR - Base Contract");
        require(_owner != address(0), "invalid address");
        owner = _owner;
    }

    function withdraw() public {
        require(owner == msg.sender);
        owner.transfer(address(this).balance);
    }
}

interface IVault {
    function initialize(address payable owner) external;
}

contract CloneFactory {
    address immutable implementation;
    //array of clones
    address[] clones; //this boundless arrays is pretty sketch. especially since anyone can call create clone.

    constructor() {
        //deploy implementation thats referenced by clones
        implementation = address(new Vault());
    }

    //create a new clone then emit an event.
    function createClone() external returns (address) {
        address newClone = Clones.clone(implementation);

        IVault(newClone).initialize(payable(msg.sender));

        //vunerable to gas explot
        clones.push(newClone);

        emit CloneCreated(newClone, msg.sender, msg.sender);
        //should be readable when called by contract.
        return newClone;
    }

    //return latest
    function getLatestClone() external view returns (address) {
        return clones[clones.length - 1];
    }

    event CloneCreated(address newClone, address owner, address creator);
}
