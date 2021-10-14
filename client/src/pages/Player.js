import Web3 from 'web3';
import Portis from '@portis/web3';
import { web3Modal } from '../utils/web3Modal';
import React, {
  useCallback,
  useEffect,
  useState,
  Component,
} from 'react';

import RootLayout from '../layouts/RootLayout';

const SuperfluidSDK = require('@superfluid-finance/js-sdk');

let sf;
let dai;
let daix;

const ZERO_ADDRESS = '0x' + '0'.repeat(40);

function Helper({ variable1 }) {
  const [userAddress, setUserAddress] = useState(ZERO_ADDRESS);

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const portis = new Portis(
      '870c1f6f-e839-4787-a56e-7ae968868e5e',
      'maticMumbai'
    );

    sf = new SuperfluidSDK.Framework({
      web3: new Web3(portis.provider),
      tokens: ['fDAI'],
    });
    await sf.initialize();

    dai = await sf.contracts.TestToken.at(sf.tokens.fDAI.address);
    daix = sf.tokens.fDAIx;

    global.web3 = sf.web3;

    const accounts = await sf.web3.eth.getAccounts();
    setUserAddress(accounts[0]);
  }, []);

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  async function createFlow() {
    const bob = sf.user({
      address: userAddress,
      token: sf.tokens.fDAIx.address,
    });
    const alice = sf.user({
      address: '0x476E38c14CAe3a8A688C26f0912F0273E7E8eA8B',
      token: sf.tokens.fDAIx.address,
    });

    var vid = document.getElementById('player_movie');
    try {
      bob
        .flow({
          recipient: alice,
          flowRate: '3858024691358', // 10 / mo
        })
        .then((receipt) => {
          console.log('transaction completed, receipt: ', receipt);
          vid.play();
        });
    } catch (e) {
      console.log('there was an error: ', e);
    }

    // console.log(await bob.details());

    // console.log(
    //   await sf.agreements.cfa.getFlow(
    //     sf.tokens.fDAIx.address,
    //     userAddress,
    //     '0x476E38c14CAe3a8A688C26f0912F0273E7E8eA8B'
    //   )
    // );
  }

  async function updateFlow() {
    const bob = sf.user({
      address: userAddress,
      token: sf.tokens.fDAIx.address,
    });
    const alice = sf.user({
      address: '0x476E38c14CAe3a8A688C26f0912F0273E7E8eA8B',
      token: sf.tokens.fDAIx.address,
    });

    bob.flow({
      recipient: alice,
      flowRate: '0', // 0 / mo
    });
  }

  const playPause = () => {
    var vid = document.getElementById('player_movie');
    if (vid.paused) {
      createFlow();
    } else {
      updateFlow();
      vid.pause();
    }
  };

  return (
    <div>
      <center>
        <p>Video Player</p>
        <hr></hr>
        <video id="player_movie">
          <source
            src={`https://dether.herokuapp.com/video/${variable1}`}
            type="video/mp4"
          ></source>
          <track
            label="English"
            kind="captions"
            srcLang="en"
            src={`https://dether.herokuapp.com/video/${variable1}/caption`}
            default
          ></track>
        </video>
        <br></br>
        <hr></hr>
        <button className="banner__button" onClick={playPause}>
          PLAY / PAUSE
        </button>
      </center>
    </div>
  );
}

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: this.props.match.params.id,
      videoData: {},
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(
        `https://dether.herokuapp.com/video/${this.state.videoId}/data`
      );
      const data = await res.json();
      this.setState({ videoData: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App-header">
        <RootLayout>
          <Helper variable1={this.state.videoId} />
          <h1>{this.state.videoData.name}</h1>
        </RootLayout>
      </div>
    );
  }
}
