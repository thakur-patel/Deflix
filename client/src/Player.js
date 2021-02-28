import Header from './Header';
import Footer from './Footer';
import { Web3Provider } from '@ethersproject/providers';
import Web3 from "web3";
import dethABI from './contracts/deth';
// import Portis from '@portis/web3';
import { web3Modal, logoutOfWeb3Modal } from "./utils/web3Modal";
import React, { useCallback, useEffect, useState, Component} from "react";
import Nav from './Nav';

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

function Helper({ variable1 }) {
  const [userAddress, setUserAddress] = useState(ZERO_ADDRESS);
  const [provider, setProvider] = useState();

   /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();

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

  }, []);

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
    // here you do all the data retrieval: please pull all the current players in the lottery and push them using addPlayer({address, netFlow})
  }, [loadWeb3Modal]);


  async function createFlow() {

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

  async function updateFlow() {

    const bob = sf.user({ address: userAddress, token: sf.tokens.fDAIx.address });
    const alice = sf.user({ address: "0x5d29D15F5993B6563Bef1D13C5A45c636323AE2e", token: sf.tokens.fDAIx.address });

    bob.flow({
      recipient: alice,
      flowRate: "0", // 0 / mo
    });
  }

  const playPause = () => {
    var vid = document.getElementById('player_movie');
    if (vid.paused) {
      createFlow();
    }
    else {
      updateFlow();
      vid.pause();
    }
  };


  return(
      <div>
          <center>
          <p>Video Player</p>
          <hr></hr>
          <video id="player_movie">
            <source src={`http://localhost:4000/video/${variable1}`} type="video/mp4"></source>
            <track label="English" kind="captions" srcLang="en" src={`http://localhost:4000/video/${variable1}/caption`} default></track>
          </video>
          <br></br>
          <hr></hr>
          <button className="banner__button" onClick={playPause}>PLAY / PAUSE</button>
          </center>
      </div>
  );
}

export default class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videoId: this.props.match.params.id,
      videoData: {}
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(`http://localhost:4000/video/${this.state.videoId}/data`);
      const data = await res.json();
      this.setState({ videoData: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App-header">
        <Header />
        <Nav />
        <Helper 
          variable1={this.state.videoId}
        />
        <h1>{ this.state.videoData.name }</h1>
        <Footer />
      </div>
    )
  }
}
