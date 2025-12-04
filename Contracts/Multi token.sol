// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MultiToken
 * @dev ERC-1155 multi-token contract with minting, batch transfers, and supply control
 */
contract MultiToken is ERC1155, Ownable {
    // Token ID counter
    uint256 public currentTokenId;

    // Token max supply mapping
    mapping(uint256 => uint256) public maxSupply;

    // Token minted amount
    mapping(uint256 => uint256) public minted;

    constructor(string memory _uri) ERC1155(_uri) {
        currentTokenId = 0; // Initialize first token ID
    }

    /**
     * @dev Mint a new token type to an address
     * @param to Recipient address
     * @param amount Number of tokens to mint
     * @param max Maximum supply of this token
     */
    function mint(address to, uint256 amount, uint256 max) external onlyOwner {
        uint256 tokenId = currentTokenId;
        require(minted[tokenId] + amount <= max, "Exceeds max supply");

        maxSupply[tokenId] = max;
        _mint(to, tokenId, amount, "");
        minted[tokenId] += amount;

        currentTokenId += 1; // Increment token ID for next mint
    }

    /**
     * @dev Batch mint multiple tokens to an address
     * @param to Recipient address
     * @param amounts Array of amounts for each token
     * @param maxes Array of max supply for each token
     */
    function batchMint(address to, uint256[] calldata amounts, uint256[] calldata maxes) external onlyOwner {
        require(amounts.length == maxes.length, "Amounts and maxes length mismatch");

        uint256[] memory ids = new uint256[](amounts.length);

        for (uint256 i = 0; i < amounts.length; i++) {
            uint256 tokenId = currentTokenId;
            require(minted[tokenId] + amounts[i] <= maxes[i], "Exceeds max supply");

            ids[i] = tokenId;
            maxSupply[tokenId] = maxes[i];
            minted[tokenId] += amounts[i];

            currentTokenId += 1;
        }

        _mintBatch(to, ids, amounts, "");
    }

    /**
     * @dev Set a new base URI for all token types
     */
    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }
}
