import React, {  useCallback, useState, useEffect, Component } from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Web3 from "web3";
import { web3Modal} from "./utils/web3Modal";
import Portis from '@portis/web3';
import deth from './contracts/deth';

let dethContract; 
const ZERO_ADDRESS = "0x"+"0".repeat(40);
let web3;

function Dashboard(){
  const portis = new Portis('ebb6737d-bd16-492e-8e9d-3f5b6b4237f1', 'maticMumbai');
  const [streamingRate, setStreamingRate] = useState(0);

  const loadWeb3Modal = useCallback(async () => {
    // const newProvider = await web3Modal.connect();
    // newProvider.on("accountsChanged", accounts => {
    //   console.log("accountsChanged", accounts);
    //   setUserAddress(accounts[0]);
    //   // checkWinner();
    // });

    web3 = new Web3(portis.provider);
  }, []);
  // 
      /* If user has loaded a wallet before, load it automatically. */
    useEffect(() => {
        if (web3Modal.cachedProvider) {
          loadWeb3Modal();
        }
        // here you do all the data retrieval: please pull all the current players in the lottery and push them using addPlayer({address, netFlow})
      }, [loadWeb3Modal]);

  function loadContract(){
    dethContract = dethContract || new web3.eth.Contract(deth.abi, deth.address);
    return dethContract
  }

  async function testContract() {
    const productCount2 = await loadContract().methods.getStreamingRate().call();
    console.log('yolo__ss');
    console.log(productCount2);
    // check = productCount2;
    setStreamingRate(productCount2);
  }
  // testContract();
  return(
    <p>
    Current straming rate: {streamingRate}
    <button onClick={() => testContract()}>
          Refresh
  </button>
  </p>
  );
}

export default class License extends Component {
  render(){
    return (
      <div>
      <Header />
      <Nav />
      <Dashboard />
      <Footer />
      </div>
    );
  }
}