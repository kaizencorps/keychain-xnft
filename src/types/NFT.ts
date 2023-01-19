import {PublicKey} from "@solana/web3.js";

export interface WalletState {
  address: PublicKey | null,
}

export interface KeyState {
  keyAccount: PublicKey,
  wallet: PublicKey,
  verified: boolean
}

export interface CollectionsState {
  collections: Collection[]
}

enum RANK { BLUECHIP = "BLUECHIP" }
enum VERIFICATION { COLLECTION = "COLLECTION", CREATOR = "CREATOR" }
export interface Collection {
  name: string,
  rank: RANK,
  verification: VERIFICATION,
  verificationAddress: PublicKey
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
  // mdUrl: string,
  collection: string | null,
  isFavorited: boolean
}