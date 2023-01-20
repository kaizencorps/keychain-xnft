import {PublicKey} from "@solana/web3.js";
import {Program} from "@project-serum/anchor";

export interface ProgramState {
  program: Program
}

export interface WalletState {
  address: PublicKey,
}

export interface KeyState {
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
  name: string,
  exists: boolean,
  // connected: boolean,
  walletAttached: boolean,    // true if the connected wallet is on the keychain
  walletVerified: boolean,    // true if the connected wallet is a verified key
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
