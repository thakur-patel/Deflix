import React, {  useCallback, useState, useEffect, Component } from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Web3 from "web3";
import { web3Modal} from "./utils/web3Modal";
import Portis from '@portis/web3';
import deth from './contracts/deth';
import './License.css';
import dai_logo from './assets/dai.png';

let dethContract; 
const ZERO_ADDRESS = "0x"+"0".repeat(40);
let web3;

function Dashboard(){
  const portis = new Portis('870c1f6f-e839-4787-a56e-7ae968868e5e', 'maticMumbai');
  const [streamingRate, setStreamingRate] = useState(0);
  const [licenseOwner, setLicenseOwner] = useState("");
  const [licenses, setLicenses] = useState("");
  const [userAddress, setUserAddress] = useState(ZERO_ADDRESS);

  const loadWeb3Modal = useCallback(async () => {

    web3 = new Web3(portis.provider);

    const accounts = await web3.eth.getAccounts();
    setUserAddress(accounts[0]);

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

  async function streamingR() {
    const rate = await loadContract().methods.getStreamingRate().call();
    console.log(rate);
    setStreamingRate(rate);
  }

  async function getLicenseOwner(licenseid){
    const owner = await loadContract().methods.getLicenseOwnerAddress(licenseid).call();
    setLicenseOwner(owner);
  }

  async function getLicenses(){
    let licenseList = await loadContract().methods.myLicenses().call();
    console.log(licenseList);
    setLicenses(licenseList);
  }

  async function setRate(rate){
    const setrate = await loadContract().methods.setStreamingRate(rate).send({from:userAddress});
    console.log(setrate);
  }

  async function mintLicense(to){
    const mintL = await loadContract().methods.mintLicense(to).send({from:userAddress});
    console.log(mintL);
  }

  async function transLicense(licenseId, to){
    const transL = await loadContract().methods.transferLicense(licenseId, to).send({from:userAddress});
  }

  const nameEl = React.useRef(null);
  const rateEl = React.useRef(null);
  const toEl = React.useRef(null);
  const idEl = React.useRef(null);

  const ownerSubmit = e => {
    e.preventDefault();
    getLicenseOwner(nameEl.current.value);
  };

  const rateSubmit = e => {
    e.preventDefault();
    setRate(rateEl.current.value);
  };

  const mintLic = e => {
    e.preventDefault();
    mintLicense(toEl.current.value);
  };

  const transLic = e => {
    e.preventDefault();
    transLicense(idEl.current.value, toEl.current.value);
  };

  return(
    <div className="container">
    <h1>General Commands</h1>

    <button
          className= 'balButton'
          onClick = {() => streamingR()}>
          {
                  <>
                      <span><img src={dai_logo} style={{width:20, height:20}}></img>Streaming Rate: {streamingRate}/mo</span>                     <br />
                      <span className= 'balButton__text'>Click to update rate.</span>
                  </>
          }
      </button>

      <button
          className= 'balButton'
          onClick = {() => getLicenses()}>
          {
                  <>
                      <span>Your Licenses: {licenses} </span>                     <br />
                      <span className= 'balButton__text'>Click to fetch your licenses.</span>
                  </>
          }
      </button>

    <br></br>
    <br></br>

    <form className="LicenseForm" onSubmit={ownerSubmit}>
       <label>License Owner: {licenseOwner}&nbsp;&nbsp;
         <input type="number" ref={nameEl} placeholder="License Id (eg: 0)"/>
       </label>
       <input type="submit" name="Submit" />
     </form>

     <form className="LicenseForm" onSubmit={transLic}>
       <label>Transfer your License: {licenseOwner}&nbsp;&nbsp;
         <input type="number" ref={idEl} placeholder="License Id (eg: 0)"/>
         <input type="text" ref={toEl} placeholder="Address (eg: 0x467ASd...)"/>
       </label>
       <input type="submit" name="Submit" />
     </form>

    <hr></hr>
    <h1>Admin only commands</h1>
    <form className="LicenseForm" onSubmit={rateSubmit}>
       <label>Set Rate: {licenseOwner}&nbsp;&nbsp;
         <input type="number" ref={rateEl} placeholder="Streaming rate (eg: 10/mo)"/>
       </label>
       <input type="submit" name="Submit" />
     </form>

     <form className="LicenseForm" onSubmit={mintLic}>
       <label>Mint License: {}&nbsp;&nbsp;
         <input type="text" ref={toEl} placeholder="Streaming rate (eg: 10/mo)"/>
       </label>
       <input type="submit" name="Submit" />
     </form>
    
    </div>
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