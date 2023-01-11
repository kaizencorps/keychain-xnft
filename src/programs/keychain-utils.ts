import * as anchor from '@project-serum/anchor';
import {Connection, PublicKey} from '@solana/web3.js';
import {AnchorProvider, Program, Provider, Wallet} from '@project-serum/anchor';
// import { Keychain } from './types/keychain';
import { KeychainIdl, KeychainProgramId } from '../types/utils/config';

// const { SystemProgram } = anchor.web3;

export const DOMAIN = 'domination';
export const KEYCHAIN = 'keychain';

export const KEYCHAIN_SPACE = 'keychains';
export const KEY_SPACE = 'keys';

// finds the keychain pda for the given playername (for the domination domain)
export const findKeychainPda = (playername: string): PublicKey => {
    // const [keychainPda, keychainPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    const [keychainPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(anchor.utils.bytes.utf8.encode(playername)),
            Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN_SPACE)),
            Buffer.from(anchor.utils.bytes.utf8.encode(DOMAIN)),
            Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN)),
        ],
        KeychainProgramId,
    );
    return keychainPda;
};

// find the keychain KEY pda for the given wallet address (for the domination domain)
export const findKeychainKeyPda = (walletAddress: PublicKey): PublicKey => {
    // const [keychainPda, keychainPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    const [keychainPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            walletAddress.toBuffer(),
            Buffer.from(anchor.utils.bytes.utf8.encode(KEY_SPACE)),
            Buffer.from(anchor.utils.bytes.utf8.encode(DOMAIN)),
            Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN)),
        ],
        KeychainProgramId,
    );
    return keychainPda;
};

export const getKeychainProgram = (walletProvider: Wallet, connection: Connection): Program => {
    const provider: Provider = new AnchorProvider(connection, walletProvider, {
        commitment: 'processed',
        preflightCommitment: 'processed',
    });
    return new Program(KeychainIdl, KeychainProgramId, provider);
};

// the domain pda for domination
export const [KeychainDomainPda, KeychainDomainPdaBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(anchor.utils.bytes.utf8.encode(DOMAIN)), Buffer.from(anchor.utils.bytes.utf8.encode(KEYCHAIN))],
    KeychainProgramId,
);
