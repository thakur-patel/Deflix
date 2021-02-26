import { Web3Provider } from '@ethersproject/providers';
import Web3 from "web3";
import dethABI from './contracts/deth';
// import Portis from '@portis/web3';
import { web3Modal, logoutOfWeb3Modal } from "./utils/web3Modal";
import React, { useCallback, useEffect, useState, Component} from "react";
import './Header.css'

const TruffleContract = require("@truffle/contract");
const { wad4human } = require("@decentral.ee/web3-helpers");
const SuperfluidSDK = require("@superfluid-finance/js-sdk");

let contractAddress = "0x67EfD9E42e2002c46235c447911f0179c9d8b0f8";
let sf;
let dai;
let daix;
let dethContract; 
let newProvider;
const ZERO_ADDRESS = "0x"+"0".repeat(40);

function Header() {
  const [daiBalance, setDaiBalance] = useState(0);
  const [daixBalance, setDaixBalance] = useState(0);
  const [userAddress, setUserAddress] = useState(ZERO_ADDRESS);
  const [provider, setProvider] = useState();
  const [daiApproved, setDAIapproved] = useState(0);

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();

    newProvider.on("accountsChanged", accounts => {
      console.log("accountsChanged", accounts);
      setUserAddress(accounts[0]);
      // checkWinner();
    });

    sf = new SuperfluidSDK.Framework({
      web3: new Web3(newProvider),
      tokens: ["fDAI"]
    });
    await sf.initialize();

    dai = await sf.contracts.TestToken.at(sf.tokens.fDAI.address);
    daix = sf.tokens.fDAIx;

    global.web3 = sf.web3;

    const accounts = await sf.web3.eth.getAccounts();
    setUserAddress(accounts[0]);

    setProvider(new Web3Provider(newProvider));

    setInterval(function() {
      // return checkWinner();
    }, 10000);
    // checkWinner();
  }, []);
// 
    /* If user has loaded a wallet before, load it automatically. */
    useEffect(() => {
      if (web3Modal.cachedProvider) {
        loadWeb3Modal();
      }
      // here you do all the data retrieval: please pull all the current players in the lottery and push them using addPlayer({address, netFlow})
    }, [loadWeb3Modal]);

    async function mintDAI(amount = 100) {
        // mint some dai here!  100 default amount
        await dai.mint(
          userAddress,
          sf.web3.utils.toWei(amount.toString(), "ether"),
          { from: userAddress }
        );
        setDaiBalance(wad4human(await dai.balanceOf.call(userAddress)));
      }
    
      async function convertDAIx(amount = 100) {
        dai.approve(userAddress, (100*1e18).toString());
        daix.upgrade((100*1e18).toString());
        setDaixBalance(wad4human(await daix.balanceOf.call(userAddress)));
      }
    
      async function approveDAI() {
        //approve unlimited please
        await dai
          .approve(
            daix.address,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935",
            { from: userAddress }
          )
          .then(async i =>
            setDAIapproved(
              wad4human(await dai.allowance.call(userAddress, daix.address))
            )
          );
      }
    
      async function daiBal(){
        setDaiBalance(wad4human(await dai.balanceOf.call(userAddress)));
        setDaixBalance(wad4human(await daix.balanceOf.call(userAddress)));
      }
      function loadContract(){
        dethContract = dethContract || new sf.web3.eth.Contract(dethABI.abi, contractAddress);
        return dethContract
      }
      async function testContract() {
        const productCount2 = await loadContract().methods.speak().call();
        console.log(productCount2);
      }

  return(
    <header>
      <br></br><br></br>
      <div className = "banner__buttons">
      <button className = "banner__button" onClick={() => daiBal()}>
                1. Check Balance{" "}
                {/* {showTick(
                  (daiBalance >= 2 && daiBalance !== "0") || daixBalance > 2
                )} */}
      </button>

      <button className = "banner__button" onClick={() => mintDAI()}>
                2. Mint some DAI{" "}
                {/* {showTick(
                  (daiBalance >= 2 && daiBalance !== "0") || daixBalance > 2
                )} */}
      </button>
        
      <button className = "banner__button" onClick={() => convertDAIx()}>
                2. Convert to DAIx{" "}
                {/* {showTick(
                  (daiBalance >= 2 && daiBalance !== "0") || daixBalance > 2
                )} */}
      </button>

      <button className = "banner__button" onClick={() => approveDAI()}>
                4. Approve auto transaction DAI{" "}
                {/* {showTick(Number(daiApproved) > 0 && daiApproved !== "0")} */}
      </button>

      <button className = "banner__button" onClick={() => testContract()}>
                5. Check Matic contract{" "}
                {/* {showTick(
                  (daiBalance >= 2 && daiBalance !== "0") || daixBalance > 2
                )} */}
      </button>
      </div>
      <p> Your DAI balance: {daiBalance}</p>
      <p> Your DAIx balance: {daixBalance}</p>
      <div className = "banner__fadeBottom" ></div>
    </header>
  );
}

export default Header;