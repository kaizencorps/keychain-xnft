import * as anchor from '@project-serum/anchor';
import {Connection, PublicKey} from '@solana/web3.js';
import {AnchorProvider, Program, Provider, Wallet} from '@project-serum/anchor';
// import { Keychain } from './types/keychain';
import {connection, KeychainIdl, KeychainProgramId} from '../types/utils/config';

// const { SystemProgram } = anchor.web3;

// the keychain domain
export const DOMAIN = 'keychain';
// the keychain program name (used as seed for pda derivation)
export const KEYCHAIN = 'keychain';
// the keychain domain state name (used as seed for pda derivation) -> 1 per domain
export const DOMAIN_STATE = 'domain_state';
// the keychain state name (used as seed for pda derivation) -> all keychain states for a domain fall under this
export const KEYCHAIN_STATE_SPACE = 'keychain_states';

export const KEYCHAIN_SPACE = 'keychains';
export const KEY_SPACE = 'keys';


export const findDomainPda = (domain: string): [PublicKey, number] => {
  return anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from(anchor.utils.bytes.utf8.encode(domain)),
        Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN))],
      KeychainProgramId);
}

export const findDomainStatePda = (domain: string): [PublicKey, number] => {
  return anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode(DOMAIN_STATE)),
        Buffer.from(anchor.utils.bytes.utf8.encode(domain)),
        Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN))],
      KeychainProgramId
  );
}

// finds the keychain pda for the given playername (for the domination domain)
export const findKeychainPda = (name: string, domain: string = DOMAIN): [PublicKey, number] => {
    // const [keychainPda, keychainPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    return anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(anchor.utils.bytes.utf8.encode(name)),
            Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN_SPACE)),
            Buffer.from(anchor.utils.bytes.utf8.encode(domain)),
            Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN)),
        ],
        KeychainProgramId,
    );
};

export const findKeychainStatePda = (keychainPda: PublicKey, domain: string = DOMAIN): [PublicKey, number] => {
  return anchor.web3.PublicKey.findProgramAddressSync(
      [
        keychainPda.toBuffer(),
        Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN_STATE_SPACE)),
        Buffer.from(anchor.utils.bytes.utf8.encode(domain)),
            Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN)),
        ],
        KeychainProgramId,
    );
};

// find the keychain KEY pda for the given wallet address (for the domination domain)
export const findKeychainKeyPda = (walletAddress: PublicKey, domain: string = DOMAIN): [PublicKey, number] => {
    return anchor.web3.PublicKey.findProgramAddressSync(
        [
            walletAddress.toBuffer(),
            Buffer.from(anchor.utils.bytes.utf8.encode(KEY_SPACE)),
            Buffer.from(anchor.utils.bytes.utf8.encode(domain)),
            Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN)),
        ],
        KeychainProgramId,
    );
};

export const createProvider = (wallet: Wallet): Provider => {
  return new AnchorProvider(connection, wallet, {
    commitment: 'processed',
    preflightCommitment: 'processed',
  });
}

export const getKeychainProgram = (provider: Provider): Program => {
    return new Program(KeychainIdl, KeychainProgramId, provider);
};

// the domain pda for domination
export const [KeychainDomainPda, KeychainDomainPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(anchor.utils.bytes.utf8.encode(DOMAIN)), Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN))],
    KeychainProgramId,
);
