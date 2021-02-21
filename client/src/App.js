import React, { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";
import { web3Modal, logoutOfWeb3Modal } from "./utils/web3Modal";
import Portis from '@portis/web3';

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import './App.css';

const TruffleContract = require("@truffle/contract");
const { wad4human } = require("@decentral.ee/web3-helpers");
const SuperfluidSDK = require("@superfluid-finance/js-sdk");

// import Portis from '@portis/web3';
// import Web3 from 'web3';

// const portis = new Portis('ebb6737d-bd16-492e-8e9d-3f5b6b4237f1', 'goerli');
// const web3 = new Web3(portis.provider);
// For our code change Web3(newProvider) -> Web3(portis.provider)

let sf;
let dai;
let daix;

const ZERO_ADDRESS = "0x"+"0".repeat(40);

function WalletButton({ provider, userAddress, loadWeb3Modal }) {
  return (
    <button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? (
        "Connect Wallet"
      ) : (
        <>
          <span>"Disconnect Wallet"</span>
          <br />
          <small>{userAddress.slice(0, 10) + "..."}</small>
        </>
      )}
    </button>
  );
}

function App() {
  const [provider, setProvider] = useState();
  const [daiApproved, setDAIapproved] = useState(0);
  const [userAddress, setUserAddress] = useState(ZERO_ADDRESS);
  const [daiBalance, setDaiBalance] = useState(0);
  const [daixBalance, setDaixBalance] = useState(0);
  const [daixBalanceFake, setDaixBalanceFake] = useState(0);
  const [userNetFlow, setUserNetFlow] = useState(0);

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();

    newProvider.on("accountsChanged", accounts => {
      console.log("accountsChanged", accounts);
      setUserAddress(accounts[0]);
      // checkWinner();
    });

  const portis = new Portis('ebb6737d-bd16-492e-8e9d-3f5b6b4237f1', 'goerli');

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



  async function createFlow() {

    setDaiBalance(wad4human(await dai.balanceOf.call(userAddress)));
    setDaixBalance(wad4human(await daix.balanceOf.call(userAddress)));

    const bob = sf.user({ address: userAddress, token: sf.tokens.fDAIx.address });
    const alice = sf.user({ address: "0x5d29D15F5993B6563Bef1D13C5A45c636323AE2e", token: sf.tokens.fDAIx.address });
    
    var vid = document.getElementById('123');
    try{
      bob.flow({
          recipient: alice,
          flowRate: "3858024691358", // 10 / mo
         }).then( receipt => {
            console.log("transaction completed, receipt: ", receipt);
            //this triggers when the transaction is completed, so you can play video here
            vid.play();
         });
    } catch (e) {
       console.log("there was an error: ", e);
    }

    console.log(await bob.details());

    // await sf.agreements.cfa.getFlow.call({superToken: sf.tokens.fDAIx.address, sender: bob, receiver: alice})).toString()
    console.log(await sf.agreements.cfa.getFlow(
      sf.tokens.fDAIx.address,
      userAddress,
      "0x5d29D15F5993B6563Bef1D13C5A45c636323AE2e"
    ));
  }

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
  async function updateFlow() {

    const bob = sf.user({ address: userAddress, token: sf.tokens.fDAIx.address });
    const alice = sf.user({ address: "0x5d29D15F5993B6563Bef1D13C5A45c636323AE2e", token: sf.tokens.fDAIx.address });

    bob.flow({
      recipient: alice,
      flowRate: "0", // 0 / mo
    });
  }
  
  const playPause = () => {
    console.log('yolo');
    var vid = document.getElementById('123');
    if (vid.paused) {
      createFlow();
      // vid.play(); 
    }
    else {
      const var2 = updateFlow();
      vid.pause();
    }
  };

  return (
    <div className="App-header">

    <header>
      <h1>DEFLIX</h1>
      <WalletButton
        userAddress={userAddress}
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
      />

    </header>
    <p> Your DAI balance: {daiBalance}</p>
    <p> Your DAIx balance: {daixBalance}</p>
    <button onClick={() => daiBal()}>
              1. Check Balance{" "}
              {/* {showTick(
                (daiBalance >= 2 && daiBalance !== "0") || daixBalance > 2
              )} */}
      </button>

    <button onClick={() => mintDAI()}>
              2. Mint some DAI{" "}
              {/* {showTick(
                (daiBalance >= 2 && daiBalance !== "0") || daixBalance > 2
              )} */}
      </button>
      
      <button onClick={() => convertDAIx()}>
              2. Convert to DAIx{" "}
              {/* {showTick(
                (daiBalance >= 2 && daiBalance !== "0") || daixBalance > 2
              )} */}
      </button>

      <button onClick={() => approveDAI()}>
              4. Approve auto transaction DAI{" "}
              {/* {showTick(Number(daiApproved) > 0 && daiApproved !== "0")} */}
            </button>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script>
    <script src='test.js'></script>
    <video id ="123" crossOrigin="anonymous">
      <source src={`http://localhost:4000/video/0`} type="video/mp4"></source>
      <track label="English" kind="captions" srcLang="en" src={`http://localhost:4000/video/0/caption`} default></track>
    </video>
    <button onClick={playPause}>PLAY / PAUSE</button>
    {/* <h1>{ this.state.videoData.name }</h1> */}
    <footer>
      &copy; Team Dether, EtherPunk 2021. All rights reserved.
    </footer>  </div>
  );
}

export default App;