//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";


contract Deflix is ERC721, Ownable{
    /**
    * @dev Mapping from NFT ID to metadata uri => ideally a link pointing to json stored on IPFS (locally for now).
    */
    mapping (uint256 => string) internal idToUri; //storing metadata
    uint256 internal licenseCount = 0; 
    
    mapping (address => uint256[]) internal owners; //Track of licenses by address
    uint256 internal streamingRate = 10;
  
    constructor (
    )
    
    ERC721 ( "Deflix_License", "DX")
    {
    }
    
    function _deleteLicenseOwner(uint256 licenseId) internal {
        address ownedBy = ownerOf(licenseId);
        uint i = 0;
        //find index
        while (owners[ownedBy][i] != licenseId) {
            i++;
        }
        //delete element
        while (i<owners[ownedBy].length-1) {
            owners[ownedBy][i] = owners[ownedBy][i+1];
            i++;
        }
        delete owners[ownedBy][owners[ownedBy].length-1]; //not sure will work or not | Do some tests
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
        require(_exists(licenseId), "DEFLIX: Destroying nonexistent license");
        if (bytes(idToUri[licenseId]).length != 0)
        {
            delete idToUri[licenseId];
        }
        _deleteLicenseOwner(licenseId);
        _burn(licenseId);
    }
    
    function setStreamingRate(uint256 rate) public onlyOwner {
        streamingRate = rate;
    }
    
    function getStreamingRate() public view returns (uint256 ){
        return streamingRate;
    }
    
    //Public Functions
    function getLicenseDetails(uint256 licenseId) public view returns (string memory) {
        require(_exists(licenseId), "DEFLIX: URI query for nonexistent license");
        return idToUri[licenseId]; //returns link pointing to json then use front end to query it further.
    }
    
    function myLicenses() public view returns (uint256[] memory) {
        return owners[msg.sender];
    }
    
    function getLicenseOwnerAddress(uint256 licenseId) public view returns (address){
        require(_exists(licenseId), "DEFLIX: nonexistent license");
        return ownerOf(licenseId);
    }
    
    function transferLicense(uint256 licenseId, address to) public returns (bool){
        require(_exists(licenseId), "DEFLIX: nonexistent license");
        
        _deleteLicenseOwner(licenseId); //delete old owner
        owners[to].push(licenseId); //add new owner
        transferFrom(msg.sender, to, licenseId); //finally transfer owner
        return true;
    } 
}
