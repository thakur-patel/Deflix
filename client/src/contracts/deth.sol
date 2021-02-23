//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";


contract Deflix is ERC721, Ownable{

    /**
    * @dev Mapping from NFT ID to metadata uri => ideally a link pointing to json stored on IPFS (locally for now).
    */
    mapping (uint256 => string) internal idToUri; //storing metadata
    uint256 licenseCount = 0;
    
    mapping (address => uint256[]) internal owners; //Track of liceenses by address
  
    constructor (
    )
    
    ERC721 ( "Deflix_License", "DX")
    {
    
    }
    
    //Owner Only functions
    function mintLicense(address to) public onlyOwner {
        _mint(to, licenseCount);
        setLicenseDetails(licenseCount, "");
        owners[to].push(licenseCount);
        licenseCount += 1;
    }
    
    function setLicenseDetails(uint256 licenseId, string memory _uri) public onlyOwner {
        require(_exists(licenseId), "DEFLIX: URI update for nonexistent license");
        idToUri[licenseId] = _uri;
    }
    
    function destoryLicense(uint256 licenseId) public onlyOwner {
        if (bytes(idToUri[licenseId]).length != 0)
        {
            delete idToUri[licenseId];
        }
        // TODO: remove an item from owners list if the license is destoryed.
        _burn(licenseId);
    }
    
    
    //Public Functions
    function getLicenseDetails(uint256 licenseId) public view returns (string memory) {
        require(_exists(licenseId), "DEFLIX: URI query for nonexistent license");
        return idToUri[licenseId]; //returns link pointing to json then use front end to query it further.
    }
    
    function myLicenses() public view returns (uint256[] memory) {
        return owners[msg.sender];
    }
    
    // TODO: Add a function for transfering license (keep in mind about idToUri and owners)
}
