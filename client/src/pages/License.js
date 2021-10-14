import React, {
  useCallback,
  useState,
  useEffect,
  Component,
} from 'react';
import Web3 from 'web3';
import { web3Modal } from '../utils/web3Modal';
import Portis from '@portis/web3';
import deth from '../contracts/deth';
import RootLayout from '../layouts/RootLayout';

import dai_logo from '../assets/dai.png';

let dethContract;
const ZERO_ADDRESS = '0x' + '0'.repeat(40);
let web3;

function Dashboard() {
  const portis = new Portis(
    '870c1f6f-e839-4787-a56e-7ae968868e5e',
    'maticMumbai'
  );
  const [streamingRate, setStreamingRate] = useState(0);
  const [licenseOwner, setLicenseOwner] = useState('');
  const [licenses, setLicenses] = useState('');
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

  function loadContract() {
    dethContract =
      dethContract || new web3.eth.Contract(deth.abi, deth.address);
    return dethContract;
  }

  async function streamingR() {
    const rate = await loadContract()
      .methods.getStreamingRate()
      .call();
    console.log(rate);
    setStreamingRate(rate);
  }

  async function getLicenseOwner(licenseid) {
    const owner = await loadContract()
      .methods.getLicenseOwnerAddress(licenseid)
      .call();
    setLicenseOwner(owner);
  }

  async function getLicenses() {
    let licenseList = await loadContract()
      .methods.myLicenses()
      .call();
    console.log(licenseList);
    setLicenses(licenseList);
  }

  async function setRate(rate) {
    const setrate = await loadContract()
      .methods.setStreamingRate(rate)
      .send({ from: userAddress });
    console.log(setrate);
  }

  async function mintLicense(to) {
    const mintL = await loadContract()
      .methods.mintLicense(to)
      .send({ from: userAddress });
    console.log(mintL);
  }

  async function transLicense(licenseId, to) {
    const transL = await loadContract()
      .methods.transferLicense(licenseId, to)
      .send({ from: userAddress });
  }

  const nameEl = React.useRef(null);
  const rateEl = React.useRef(null);
  const toEl = React.useRef(null);
  const idEl = React.useRef(null);

  const ownerSubmit = (e) => {
    e.preventDefault();
    getLicenseOwner(nameEl.current.value);
  };

  const rateSubmit = (e) => {
    e.preventDefault();
    setRate(rateEl.current.value);
  };

  const mintLic = (e) => {
    e.preventDefault();
    mintLicense(toEl.current.value);
  };

  const transLic = (e) => {
    e.preventDefault();
    transLicense(idEl.current.value, toEl.current.value);
  };

  return (
    <div className="flex flex-col m-4">
      <div className="flex flex-col gap-3 justify-center my-3">
        <h1 className="text-3xl font-semibold underline">
          General Commands
        </h1>
        <div className="flex flex-col sm:flex-row">
          <button
            className="mx-auto balButton"
            onClick={() => streamingR()}
          >
            <span>
              <img
                src={dai_logo}
                style={{ width: 20, height: 20 }}
              ></img>
              Streaming Rate: {streamingRate}/mo
            </span>{' '}
            <br />
            <span className="balButton__text">
              Click to update rate.
            </span>
          </button>

          <button
            className="mx-auto balButton"
            onClick={() => getLicenses()}
          >
            <span>Your Licenses: {licenses} </span> <br />
            <span className="balButton__text">
              Click to fetch your licenses.
            </span>
          </button>
        </div>

        <form className="" onSubmit={ownerSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            License Owner: {licenseOwner}&nbsp;&nbsp;
          </label>
          <input
            type="number"
            className="mt-1 w-full md:w-3/5 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
            ref={nameEl}
            placeholder="License Id (eg: 0)"
          />

          <input
            type="submit"
            name="Submit"
            className="inline-flex justify-center py-2 px-4 md:mr-0 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          />
        </form>

        <form
          className="flex flex-col md:flex-row gap-4 p-4 rounded-md border-2 border-indigo-300 border-dashed"
          onSubmit={transLic}
        >
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Transfer your License: {licenseOwner}&nbsp;&nbsp;
            </label>
            <input
              type="number"
              className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
              ref={idEl}
              placeholder="License Id (eg: 0)"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Address to send
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
              ref={toEl}
              placeholder="Address (eg: 0x467ASd...)"
            />
          </div>
          <input
            type="submit"
            name="Submit"
            className="inline-flex justify-center self-end py-2 px-4 h-10 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          />
        </form>
      </div>

      <hr></hr>
      <div className="flex flex-col gap-3 justify-center my-3">
        <h1 className="text-3xl font-semibold underline">
          Admin only commands
        </h1>
        <form className="LicenseForm" onSubmit={rateSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Set Rate: {licenseOwner}&nbsp;&nbsp;
          </label>
          <input
            type="number"
            className="mt-1 w-full md:w-3/5 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
            ref={rateEl}
            placeholder="Streaming rate (eg: 10/mo)"
          />
          <input
            type="submit"
            name="Submit"
            className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          />
        </form>

        <form className="LicenseForm" onSubmit={mintLic}>
          <label className="block text-sm font-medium text-gray-700">
            Mint License: {}&nbsp;&nbsp;
          </label>
          <input
            type="text"
            className="mt-1 w-full md:w-3/5 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
            ref={toEl}
            placeholder="Streaming rate (eg: 10/mo)"
          />
          <input
            type="submit"
            name="Submit"
            className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
}

export default class License extends Component {
  render() {
    return (
      <>
        <RootLayout>
          <Dashboard />
        </RootLayout>
      </>
    );
  }
}
