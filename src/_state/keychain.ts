import {atom, selector, selectorFamily} from 'recoil';
import {PublicKey} from "@solana/web3.js";
import {userAtom, UserState} from "./user";
import {getNFTsForOwner} from "../utils/chain-utils";
import {consoleLog} from "../_helpers/debug";

interface KeyState {
    keyAccount: PublicKey | null,
    wallet: PublicKey | null,
    verified: boolean
}
interface KeychainState {
    keychainAccount: PublicKey | null,
    exists: boolean,
    keys: KeyState[]
}
// set to wallet's PublicKey
export const keychainAtom = selector<KeychainState>({
    key: 'keychain',
    get: ({get}) => {

        const userState: UserState = get(userAtom);

        // todo: logic to check for keychain existence using the username in userState

        // for now, fake a keychain
        if (userState.username) {
            return {
                keychainAccount: new PublicKey('YfixBHW1YKJZHmZE9dksSZandNdz6XBvEs91w2b124T'),
                exists: true,
                keys: [
                    {
                        wallet: new PublicKey('r3cXGs7ku4Few6J1rmNwwUNQbvrSPoLAAU9C2TVKfow'),
                        keyAccount: new PublicKey('EfaoENNuu9qofNMVKnqRzxPNa4U33wkdPbEDjADZm3tX'),
                        verified: true
                    },
                    {
                        wallet: new PublicKey('6JUZSv2KZp5x4AurxWWWjNyADu8FPkKDp7hGnW7ckhQm'),
                        keyAccount: new PublicKey('8ND4gt665bfZQGb4tURH9ysik82eEcdEsCgw1ws571nJ'),
                        verified: true
                    },
                    {
                        wallet: new PublicKey('2f4JkzQ4jALmcX36u4H49xBGgDy86qQb9PqD6wH8WkdB'),
                        keyAccount: new PublicKey('3q2p5y1J9GGb5mVdrJm18ePkbxvJu2ifquWcWJpo7wdG'),
                        verified: true
                    },
                ]
            }
        } else {
            return {
                keychainAccount: null,
                exists: false,
                keys: []
            }
        }

    }
});

export interface NFT {
    imgUrl: string,
    mdUrl: string
    mint: PublicKey,
}

export interface WalletHoldings {
    nfts: NFT[]
}


export const walletHoldingsSelector = selectorFamily({
    key: 'walletHoldings',
    get: (walletAddress: PublicKey) => async ({get}) => {

        consoleLog(`fetching nfts for wallet: ${walletAddress.toBase58()}`);

        // fetch the contents of the given wallet
        const nfts: NFT[] = await getNFTsForOwner(walletAddress);
        return {
            nfts
        };
    }
});


