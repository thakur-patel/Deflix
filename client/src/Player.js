// import React, { Component } from 'react';
// import Header from './Header';
// import Footer from './Footer';
// import {
//   Body,
//   Button,
//   // Header,
//   BoxContainer,
//   Box,
//   ShrinkBox,
//   Center,
//   Span,
//   Div100,
// } from "./components";
// import { Web3Provider } from "@ethersproject/providers";
// import Web3 from "web3";
// import { web3Modal, logoutOfWeb3Modal } from "./utils/web3Modal";

// const TruffleContract = require("@truffle/contract");
// const { wad4human } = require("@decentral.ee/web3-helpers");
// const SuperfluidSDK = require("@superfluid-finance/js-sdk");

// function WalletButton({ provider, userAddress, loadWeb3Modal }) {
//   return (
//     <Button
//       onClick={() => {
//         if (!provider) {
//           loadWeb3Modal();
//         } else {
//           logoutOfWeb3Modal();
//         }
//       }}
//     >
//       {!provider ? (
//         "Connect Wallet"
//       ) : (
//         <>
//           <span>"Disconnect Wallet"</span>
//           <br />
//           <small>{userAddress.slice(0, 10) + "..."}</small>
//         </>
//       )}
//     </Button>
//   );
// }

// export default class Player extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       videoId: this.props.match.params.id,
//       videoData: {}
//     };
//   }
  
//   async componentDidMount() {
//     try {
//       console.log('mounted -> connect wallet');
//       const res = await fetch(`http://localhost:4000/video/${this.state.videoId}/data`);
//       const data = await res.json();
//       this.setState({ videoData: data });
//     } catch (error) {
//       console.log(error);
//     }
//   }

  

//     const = playVideo = () => {
//       console.log('yolo');
//       var vid = document.getEleamentById('123');
//       vid.play()
//     };

//     const = pauseVideo = () => {
//       console.log('3333');
//       var vid = document.getElementById('123');
//       vid.pause();
//     };

    
//   render() {
//     return (
//       <div className="App-header">

//         <Header />
//         <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script>
//         <script src='test.js'></script>
//         <video id ="123" controls muted crossOrigin="anonymous">
//           <source src={`http://localhost:4000/video/${this.state.videoId}`} type="video/mp4"></source>
//           <track label="English" kind="captions" srcLang="en" src={`http://localhost:4000/video/${this.state.videoId}/caption`} default></track>
//         </video>
//         <button onClick={playVideo}>click</button>
//         <button onClick={pauseVideo}>pause</button>
//         <h1>{ this.state.videoData.name }</h1>
//         <Footer />
//       </div>
//     )
//   }
// }
