// SPDX-License-Identifier: MIT
/** The PrismDAO membership NFT contract
 */

pragma solidity ^0.8.0;

import "https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol;

contract PrismDAOMembership is ERC721A {
    // max minting batch size for ERC721A batch minting
    uint256 internal maxMintBatchSize = 100;

    // to set the owner of the contract
    address private owner;

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // modifier to check if caller is owner
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }

     /**
     * @dev Set contract deployer as owner, params are name, symbol, and max mint batch size
     */
    constructor() ERC721A("The Greed Games", "GLADIATOR", maxMintBatchSize) 
    {
        // set the owner of this contract as the deployer
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * set the baseUri and allow it to be edited by the owner
     * 
     */

    // the API address at uri/<token_id>
    string private baseUri = "https://greed.games/member/";

    // event for changing baseUri
    event BaseUriSet(string indexed oldBaseUri, string indexed newBaseUri);

    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }

    /**
     * @dev Change baseUri
     * @param newBaseUri new base uri where NFT metadata can be found
     */
    function changeBaseUri(string calldata newBaseUri) public isOwner {
        emit BaseUriSet(baseUri, newBaseUri);
        baseUri = newBaseUri;
    }

    // for opensea uri check
    function baseTokenURI() public view returns (string memory) {
        return baseUri;
    }

    /**
     * configure mint price
     * 
     */

    // set price in wei -- defaults to 0.01 eth
    uint256 private mintPriceWei = 10000000000000000 wei;

    /**
     * @dev Return mint price in wei 
     * @return wei price
     */
    function getMintPriceWei() external view returns (uint256) {
        return mintPriceWei;
    }

    // event for changing baseUri
    event MintPriceWeiSet(uint256 indexed oldBaseUri, uint256 indexed newMintPriceWei);

    /**
     * @dev Change mintPriceWei
     * @param newMintPriceWei is the new minting price
     */
    function changeMintPriceWei(uint256 newMintPriceWei) public isOwner {
        emit MintPriceWeiSet(mintPriceWei, newMintPriceWei);
        mintPriceWei = newMintPriceWei;
    }

    /**
     * configure max memberships
     * 
     */

    // set hard cap for memberships?

    // set starting max memberships
    uint256 private maxMemberships = 3000;

    /**
     * @dev Return mint price in wei 
     * @return wei price
     */
    function getMaximumMemberships() external view returns (uint256) {
        return maxMemberships;
    }

    // event for changing maximum memberships
    event MaximumMembershipsSet(uint256 indexed oldMaxMemberships, uint256 indexed newMaxMemberships);

    /**
     * @dev Change maxMemberships
     * @param newMaxMemberships is the new maximum number of NFTs that can be minted total
     */
    function changeMaxMemberships(uint256 newMaxMemberships) public isOwner {
        emit MaximumMembershipsSet(maxMemberships, newMaxMemberships);
        maxMemberships = newMaxMemberships;
    }

    /**
     * configure max mint batch size and owner control
     * 
     */

    /**
     * @dev Return mint price in wei 
     * @return wei price
     */
    function getMaxMintBatchSize() external view returns (uint256) {
        return maxMintBatchSize;
    }

    // event for changing maximum memberships
    event MaximumMintBatchSizeSet(uint256 indexed oldMaxMintBatchSize, uint256 indexed newMaxMintBatchSize);

    /**
     * @dev Change maxMintBatchSize
     * @param newMaxMintBatchSize is the new maximum number of NFTs that can be minted in a single transaction
     */
    function changeMaxMintBatchSize(uint256 newMaxMintBatchSize) public isOwner {
        emit MaximumMintBatchSizeSet(newMaxMintBatchSize, newMaxMintBatchSize);
        maxMintBatchSize = newMaxMintBatchSize;
    }

    /**
     * set up ERC721 minting capability
     * 
     */

    // log an event that includes the address, the number of tokens minted, and the index of the first minted token
    event MintItem(address indexed _from, uint256 indexed _tokensMinted, uint256 indexed _firstTokenId);

    /** 
     * Mints a token and emits an event
     * @param numberToMint the number of memberships to mint
     */
    function mintMemberships(uint256 numberToMint) public payable returns (uint256) {
        // msg.value is in wei, as is our price above
        require(numberToMint > 0, "Must mint at least one token.");
        require(numberToMint <= maxMintBatchSize || owner == msg.sender, "Must mint fewer tokens in a single batch. See getMaxMintBatchSize() for the current batch size.");
        require(msg.value >= (mintPriceWei*numberToMint), "Must send correct amount of ether to buy tokens. See getMintPriceWei() for the current price.");
        require(this.totalSupply() <= (maxMemberships-numberToMint), "You can't mint this many memberships! The maximum number of GUILD memberships have been minted or your batch size is too high. See getMaxMintBatchSize() for the current batch size.");

        // mint the token to the sender 
        _safeMint(msg.sender, numberToMint);

        // get the token id of the last minted token for the return value
        uint256 firstTokenId = this.totalSupply() - numberToMint;
        
        // emit event for the creation of this membership NFT
        emit MintItem(msg.sender, numberToMint, firstTokenId);
        
        // return the id of the first token minted
        return firstTokenId;
    }

    /**
     * set up ether withdraw by owner capability
     * always withdraws the full balance to the owner address
     */
    function withdraw() public isOwner {
        uint256 etherBalance = payable(address(this)).balance;
        payable(owner).transfer(etherBalance);
    }
}