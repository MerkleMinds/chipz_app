// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyToken is ERC20, Ownable {
    address public constant BURN_ADDRESS = address(0);
    mapping(address => uint256) private _burned;  
    mapping(address => uint256) private _earned;  

    event TokensBurned(address indexed player, uint256 amount);
    constructor() ERC20("BlockBetLoyalty", "BLTY") Ownable(msg.sender) {}


    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        _earned[to] += amount; 
    }

    function transfer(uint256 amount) public returns (bool) {
        _burn(_msgSender(), amount);  
        _burned[_msgSender()] += amount; 
        emit TokensBurned(_msgSender(), amount);  
        return true;
    }

    function transferFrom(address sender, uint256 amount) public returns (bool) {
        uint256 currentAllowance = allowance(sender, _msgSender());
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _burn(sender, amount);  
        _burned[sender] += amount;  
        unchecked {
            _approve(sender, _msgSender(), currentAllowance - amount); 
        }
        emit TokensBurned(sender, amount);  
        return true;
    }

    function burnedByAddress(address account) public view returns (uint256) {
        return _burned[account];
    }

    function earnedByAddress(address account) public view returns (uint256) {
        return _earned[account];
    }
}
