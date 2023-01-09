import { Idl } from '@project-serum/anchor';
import keychainIdl from '../programs/idl/keychain.json';
import {consoleLog} from "../_helpers/debug";

import {REACT_APP_RPC_ENDPOINT, REACT_APP_SOLANA_NETWORK} from '@env';

// import { Metaplex } from "@metaplex-foundation/js";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const anchor = require('@project-serum/anchor');

// network config
export const SOLANA_NETWORK = REACT_APP_SOLANA_NETWORK;
export const RPC_URL: string = REACT_APP_RPC_ENDPOINT;

const CONFIRM_TIMEOUT_MILLIS = 1000 * 30; // 30 sec

consoleLog("RPC_URL: ", RPC_URL);
consoleLog("SOLANA_NETWORK: ", SOLANA_NETWORK);

export const connection = new anchor.web3.Connection(RPC_URL, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: CONFIRM_TIMEOUT_MILLIS,
});


// keychain stuff
export const KeychainIdl = keychainIdl as Idl;
export const KeychainProgramId = new anchor.web3.PublicKey(keychainIdl.metadata.address);
export const KEYCHAIN_TREASURY = new anchor.web3.PublicKey('EQmj1DE52peMbjvuHGaALG75cxuXtLPjKbufaKrhDpD6');


// export const metaplex = new Metaplex(connection);

/*
export const getApiUrl = (path: string) => {
    let url = process.env.REACT_APP_BASE_API_URL;
    if (path) {
        url += path;
    }
    return url;
};
 */

