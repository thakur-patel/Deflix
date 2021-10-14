import Web3 from 'web3';
import Portis from '@portis/web3';
import { web3Modal } from 'utils/web3Modal';
import React, { useCallback, useEffect, useState } from 'react';
import 'styles/Header.css';
import dai_logo from 'assets/dai.png';
import daix_logo from 'assets/daix.png';

import PrimaryButton from 'components/UI/Button/PrimaryButton';

const { wad4human } = require('@decentral.ee/web3-helpers');
const SuperfluidSDK = require('@superfluid-finance/js-sdk');

let sf;
let dai;
let daix;

const ZERO_ADDRESS = '0x' + '0'.repeat(40);

function Header() {
  const [daiBalance, setDaiBalance] = useState(0);
  const [daixBalance, setDaixBalance] = useState(0);
  const [userAddress, setUserAddress] = useState(ZERO_ADDRESS);

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

  async function mintDAI(amount = 100) {
    // mint some dai here!  100 default amount
    await dai.mint(
      userAddress,
      sf.web3.utils.toWei(amount.toString(), 'ether'),
      { from: userAddress }
    );
    setDaiBalance(wad4human(await dai.balanceOf.call(userAddress)));
  }

  async function convertDAIx() {
    await daix.upgrade((100 * 1e18).toString());
    setDaixBalance(wad4human(await daix.balanceOf.call(userAddress)));
  }

  async function approveDAI() {
    await dai
      .approve(
        daix.address,
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        { from: userAddress }
      )
      .then(
        async () =>
          await dai.allowance.call(userAddress, daix.address)
      );
  }

  async function daiBal(e) {
    e.stopPropagation();
    alert('clicked');
    // setDaiBalance(wad4human(await dai.balanceOf.call(userAddress)));
    // setDaixBalance(wad4human(await daix.balanceOf.call(userAddress)));
  }

  return (
    <header>
      <a className="inline-block sm:absolute sm:left-0 px-3" href="/">
        <img
          className="object-contain w-32 h-16"
          src="https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png"
          alt="Deflix Logo"
        />
      </a>
      <div
        className="flex flex-col items-center mx-auto mt-3 balButton"
        onClick={daiBal}
      >
        <div className="flex gap-4 justify-center my-1 font-semibold cursor-pointer">
          <span className="flex object-contain gap-1 items-center">
            <img src={dai_logo} className="w-5 h-5" />
            DAI: {daiBalance}
          </span>
          <span className="flex object-contain gap-1 items-center">
            <img src={daix_logo} className="w-5 h-5" />
            DAIx: {daixBalance}
          </span>
        </div>
        <span className="balButton__text">
          Click for Updated Balance
        </span>
      </div>
      <br />

      <div className="banner__fadeBottom">
        <PrimaryButton
          tailwindClass="banner__button"
          onClick={() => mintDAI()}
        >
          Mint 100 DAI
        </PrimaryButton>

        <PrimaryButton
          tailwindClass="banner__button"
          onClick={() => approveDAI()}
        >
          Approve &infin; DAI
        </PrimaryButton>

        <PrimaryButton
          tailwindClass="banner__button"
          onClick={() => convertDAIx()}
        >
          Convert 100 DAI to DAIx
        </PrimaryButton>

        <a href="/license">
          <PrimaryButton tailwindClass="banner__button">
            License Dashboard
          </PrimaryButton>
        </a>
      </div>
    </header>
  );
}

export default Header;
