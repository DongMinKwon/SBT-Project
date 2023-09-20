//Contract based on [<https://docs.openzeppelin.com/contracts/3.x/erc721>](<https://docs.openzeppelin.com/contracts/3.x/erc721>)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Sbt.sol";
import "./Pausable.sol";

contract Poap is ERC721URIStorage, Ownable, Sbt, Pausable {
  //utils
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("Poap", "DYE") {}

  //events
  event CreateCollection(string collectionName, string metaURI);
  event UpdateCollection(string collectionName, string newMetaURI);
  event MintToken(uint256 tokenId, string tokenURI, uint256 createdAt);

  //mapping

  // tokenId => collectionName
  mapping(uint256 => string) private _tokenCollection;

  // tokenId => created time
  mapping(uint256 => uint256) private _tokenCreatedAt;

  // collectionName => collection owner address
  mapping(string => string) private _collectionOwners;

  // collectionName => token total supply
  mapping(string => uint256) private _collectionMinted;

  // collectionName => collection meta URL
  mapping(string => string) private _collectionMeta;

  //transactions

  /**
   * @dev transfer admin ownership(change server address)
   * @param newOwner new server address
   */
  function transferOwnership(address newOwner) public override onlyOwner {
    require(newOwner != address(0), "Ownable: new owner is the zero address");
    _transferOwnership(newOwner);
  }

  /**
   * @dev create new collection
   * @param collectionName unique collection name(same with id)
   * @param owner string collection owner
   * @param metaURI string metaData URI, it is copied to tokenURI
   */
  function createCollection(
    string memory collectionName,
    string memory owner,
    string memory metaURI
  ) public onlyOwner whenNotPaused {
    require(!_existsCol(collectionName), "Poap: collection already created");

    _collectionOwners[collectionName] = owner;
    _collectionMinted[collectionName] = 0;
    _collectionMeta[collectionName] = metaURI;

    emit CreateCollection(collectionName, metaURI);
  }

  function updateCollection(
    string memory collectionName,
    string memory newMetaURI
  ) public onlyOwner whenNotPaused existCollection(collectionName){
    _collectionMeta[collectionName] = newMetaURI;

    emit UpdateCollection(collectionName, newMetaURI);
  }

  /**
   * @dev mint new token to users
   * @param recipient address user address
   * @param collectionName string collection name what the token is from
   * @return uint256 new token id
   */
  function mintToken(
    address recipient,
    string memory collectionName
  )
    public
    onlyOwner
    whenNotPaused
    existCollection(collectionName)
    returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();

    _tokenCollection[newItemId] = collectionName;
    _collectionMinted[collectionName] += 1;
    string memory tokenURI = _collectionMeta[collectionName];

    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);
    _lock(newItemId);

    _tokenCreatedAt[newItemId] = block.timestamp;

    emit MintToken(newItemId, tokenURI, _tokenCreatedAt[newItemId]);

    return newItemId;
  }

  /**
   * @dev lock token for restricting transfer function(only by owner - if there is an unavoidable circumstance)
   * @param tokenId uint256 tokenId for lock
   */
  function unlock(
    uint256 tokenId
  ) public onlyOwner existToken(tokenId) whenNotPaused {
    _unlock(tokenId);
  }

  /**
   * @dev unlock token for restricting transfer function
   * @param tokenId uint256 tokenId for unlock
   */
  function lock(
    uint256 tokenId
  ) public onlyOwner existToken(tokenId) whenNotPaused {
    _lock(tokenId);
  }

  //view

  /**
   * @dev get collection name from tokenId
   * @param tokenId uint256
   * @return string collection name corresponding to tokenId
   */
  function tokenCollection(
    uint256 tokenId
  ) public view existToken(tokenId) returns (string memory) {
    return _tokenCollection[tokenId];
  }

  /**
   * @dev get total token supply from collectionName
   * @param collectionName string
   * @return uint256 total token supply corresponding to collection name
   */
  function collectionMinted(
    string memory collectionName
  ) public view existCollection(collectionName) returns (uint256) {
    return _collectionMinted[collectionName];
  }

  /**
   * @dev get collection owner from collectionName
   * @param collectionName string
   * @return uint256 collection owner corresponding to collection name
   */
  function collectionOwner(
    string memory collectionName
  ) public view existCollection(collectionName) returns (string memory) {
    return _collectionOwners[collectionName];
  }

  /**
   * @dev get token created time from tokenId
   * @param tokenId uint256
   * @return uint256 token created time corresponding to tokenId
   */
  function tokenCreatedAt(
    uint256 tokenId
  ) public view existToken(tokenId) returns (uint256) {
    return _tokenCreatedAt[tokenId];
  }

  /**
   * @dev get token lock status
   * @return bool true if token is locked, or false
   */
  function locked(uint256 tokenId) public view override returns (bool) {
    return super.locked(tokenId);
  }

  //sbt

  //override below functions for lock transfer function when the token status is locked

  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId
  ) public override(ERC721, IERC721) isUnLocked(tokenId) whenNotPaused {
    super.safeTransferFrom(from, to, tokenId);
  }

  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId,
    bytes memory data
  ) public override(ERC721, IERC721) isUnLocked(tokenId) whenNotPaused {
    super.safeTransferFrom(from, to, tokenId, data);
  }

  function transferFrom(
    address from,
    address to,
    uint256 tokenId
  ) public override(ERC721, IERC721) isUnLocked(tokenId) whenNotPaused {
    super.transferFrom(from, to, tokenId);
  }

  //internal

  function _stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
    bytes memory b1 = bytes(s1);
    bytes memory b2 = bytes(s2);
    uint256 l1 = b1.length;
    if (l1 != b2.length) return false;
    for (uint256 i=0; i<l1; i++) {
        if (b1[i] != b2[i]) return false;
    }
    return true;
}

  /**
   * @dev confirm exist collection internal(like _exist)
   */
  function _existsCol(
    string memory collectionName
  ) internal view virtual returns (bool) {
    return !_stringsEquals(_collectionOwners[collectionName] , "");
  }

  //modifier

  /**
   * @dev Modifier to confirm token exist
   */
  modifier existToken(uint256 tokenId) {
    require(_exists(tokenId), "Poap: nonexistent token");
    _;
  }

  /**
   * @dev Modifier to confirm collection exist
   */
  modifier existCollection(string memory collectionName) {
    require(_existsCol(collectionName), "Poap: nonexistent collection");
    _;
  }
}
