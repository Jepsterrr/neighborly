// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NeighborlyToken is ERC20, Ownable {
    // Konstruktorn körs en gång när kontraktet deployas.
    // initialOwner är den som får ägandeskapet.
    constructor(address initialOwner) ERC20("Neighborly Token", "NLYT") Ownable(initialOwner) {}

    // En funktion så att endast ägaren (t.ex. ServiceExchange-kontraktet)
    // kan skapa (minta) nya tokens.
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}