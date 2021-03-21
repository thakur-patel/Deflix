import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import { constructBidShares,constructMediaData,sha256FromBuffer,
            generateMetadata,isMediaDataVerified } from '@zoralabs/zdk'
import {promises as fs} from 'fs'

const provider = new JsonRpcProvider() // defaults to http://localhost:8545, but accepts eth node rpc url
const wallet = Wallet.createRandom().connect(provider)
const zora = new Zora(wallet, 4)

const metadataJSON = generateMetadata('zora-200321', {
  description: 'car video for Deflix',
  mimeType: 'video/mp4',
  name: 'car',
  version: 'car-200321',
})

const buf = await fs.readFile('../assets/movies/0.mp4')
const contentHash = sha256FromBuffer(buf)
const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON))
const mediaData = constructMediaData(
  'https://ipfs.io/ipfs/QmNaoD4pyC3zAdcMyNh47NNZM3mqLpYK5a4r1szvfVs85p?filename=car.mp4',
  'https://ipfs.io/ipfs/QmURahtNc5gWENs4NRjMq26FLMfhRXXERgY5e14gFGxKmm?filename=metaDataJSON.json',
  contentHash,
  metadataHash
)

const verified = await isMediaDataVerified(mediaData)
if (!verified){
  throw new Error("MediaData not valid, do not mint")
}

const bidShares = constructBidShares(
  10, // creator share
  90, // owner share
  0 // prevOwner share
)
const tx = await zora.mint(mediaData, bidShares)
await tx.wait(3) // 8 confirmations to finalize