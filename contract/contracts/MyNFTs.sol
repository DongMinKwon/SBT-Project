//Contract based on [<https://docs.klaytn.com/contracts/3.x/erc721>](<https://docs.klaytn.com/contracts/3.x/erc721>)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@klaytn/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@klaytn/contracts/utils/Counters.sol";
import "../node_modules/@klaytn/contracts/access/Ownable.sol";
import "../node_modules/@klaytn/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTs is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("MyNFTs", "MNFT") {}

  event minting(string tokenURI);

  function mintNFT(string memory tokenURI) public onlyOwner returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);

    emit minting(tokenURI);

    return newItemId;
  }
}
