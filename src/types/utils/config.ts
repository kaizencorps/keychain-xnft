import { Idl } from '@project-serum/anchor';
import keychainIdl from '../../programs/idl/keychain.json';

/* stupid babel type error: TypeError: [BABEL] /Users/si/projects/crypto/sol/kaizen/keychain-xnft/node_modules/webpack/hot/dev-server.js: api.addExternalDependency is not a function (While processing: "/Users/si/projects/crypto/sol/kaizen/keychain-xnft/node_modules/react-native-dotenv/index.js")

// import {REACT_APP_RPC_ENDPOINT, REACT_APP_SOLANA_NETWORK} from '@env';

 */

import { Metaplex } from "@metaplex-foundation/js";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const anchor = require('@project-serum/anchor');

// network config
// export const SOLANA_NETWORK = process.env.REACT_APP_SOLANA_NETWORK;
// export const RPC_URL: string = REACT_APP_RPC_ENDPOINT;

// for now these are just hard-coded cause env variables are tricky


//----------->>>>>>>>>>>> devnet settings
// export const SOLANA_NETWORK = 'devnet';
// export const RPC_URL: string = 'https://api.devnet.solana.com';
// export const KEYCHAIN_TREASURY = new anchor.web3.PublicKey('EQmj1DE52peMbjvuHGaALG75cxuXtLPjKbufaKrhDpD6');


//----------->>>>>>>>>>>> testnet settings
// export const SOLANA_NETWORK = 'testnet';
// export const RPC_URL: string = 'https://api.testnet.solana.com';
// export const KEYCHAIN_TREASURY = new anchor.web3.PublicKey('EQmj1DE52peMbjvuHGaALG75cxuXtLPjKbufaKrhDpD6');


//----------->>>>>>>>>>>> mainnet/prod settings
export const SOLANA_NETWORK = 'mainnet-beta';
export const KEYCHAIN_TREASURY = new anchor.web3.PublicKey('kcTmTZrP4gGmk3s4Q6Hu6UMmyN4mAuSUfGNvwNuXk6p');
export const RPC_URL: string = 'https://white-late-diagram.solana-mainnet.discover.quiknode.pro/841f2637070526fd43f742034e9070f1a69702a2';
export const HELIUS_RPC_URL: string = 'https://rpc.helius.xyz/?api-key=df2f8e0d-099d-4110-b63e-7b5f6a53673e';
export const HELIUS_API_KEY: string = 'df2f8e0d-099d-4110-b63e-7b5f6a53673e';

// prod
// export const MIXPANEL_API_KEY: string = 'c841c45811a097a8730142dbe699433e';
// dev
export const MIXPANEL_API_KEY: string = '2dd32ae4ea557933505be3e8754c04d0';
export const ENABLE_ANALYTICS = true;
export const ENABLE_LOGGING = true;


const CONFIRM_TIMEOUT_MILLIS = 1000 * 30; // 30 sec
export const connection = new anchor.web3.Connection(RPC_URL, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: CONFIRM_TIMEOUT_MILLIS,
});


// keychain stuff
export const KeychainIdl = keychainIdl as Idl;
export const KeychainProgramId = new anchor.web3.PublicKey(keychainIdl.metadata.address);


export const metaplex = new Metaplex(connection);


/*
export const getApiUrl = (path: string) => {
    let url = process.env.REACT_APP_BASE_API_URL;
    if (path) {
        url += path;
    }
    return url;
};
 */

