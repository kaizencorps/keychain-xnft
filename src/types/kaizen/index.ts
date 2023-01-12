import {PublicKey} from "@solana/web3.js";

export interface WalletState {
  address: PublicKey | null
}

export interface KeyState {
  keyAccount: PublicKey,
  wallet: PublicKey,
  verified: boolean
}
export interface KeychainState {
  keychainAccount: PublicKey | null,
  exists: boolean,
  keys: KeyState[]
}

export interface NFT {
  owner: PublicKey,
  name: string,
  mint: PublicKey,
  imageUrl: string,
  mdUrl: string,
  collection: string
}

export interface Kaizen {
  name: string,
  imageUrl: string,
  isCurrent: boolean,
  isFavorited: boolean,
  // TODO stats
}