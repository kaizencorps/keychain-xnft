import React, {useEffect} from 'react';

//Components
import { NFT } from '../types/NFT';
import { View, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import NFTFocused from '../components/galleryNFT/focused/focused-nft';
import ScreenWrapper from '../components/screenWrapper/screenWrapper';
import { FatButton, FatDownloadButton } from '../components/ui/buttons/buttons';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/galleryStack';
import { favoriteNfts, NOTI_STATUS, userProfileAtom } from '../_state';

//Data
import { useRecoilState, useRecoilValue } from 'recoil';
import { keychainAtom, walletNftsSelector } from '../_state/keychain';

//SVGs
import Chevron from '../assets/svgs/Icons/chevron';
import Star from '../assets/svgs/Icons/star';
import StarCrossed from '../assets/svgs/Icons/star-crossed';
import Download from '../assets/svgs/Icons/download';
import AccountCircle from '../assets/svgs/Icons/account-circle';
import Close from '../assets/svgs/Icons/close';

//Constants
import { EVENTS } from '../constants/analytics';

//Hooks
import useToasts from '../hooks/useToasts';
import useKeychainServer from '../hooks/apis/keychainServer/useKeychainServer';
import { useAnalyticsActions } from '../_actions/analytics.actions';

//Web3
import { PublicKey } from '@solana/web3.js';

//Styles
import * as Theme from '../constants/theme';

interface Props extends BottomTabScreenProps<RootStackParamList, 'NFTData'> {}


const NFTData : React.FC<any> = (props: Props) : React.ReactElement => {

  const { nft, walletAddress } = props.route.params;

  const dims = useWindowDimensions();
  const keychainServer = useKeychainServer();
  const { createToast } = useToasts();

  const scrollRef: any = React.useRef();
  
  const data: NFT[] = useRecoilValue(walletAddress === "MY FAVORITES" ?
      favoriteNfts
    :
      walletNftsSelector(new PublicKey(walletAddress)))
  const [scrollIndex, setScrollIndex] = React.useState<number>(data.findIndex((element: NFT) => element.mint === nft.mint))
  const [userProfileState, setUserProfileState] = useRecoilState(userProfileAtom);
  const [keychain, setKeychain] = useRecoilState(keychainAtom);

  const analyticsActions = useAnalyticsActions();

  useEffect(() => {
    const pageProps = {
      mint: nft.mint,
      wallet: walletAddress,
      favorite: nft.isFavorited
    };
    if (nft.collection) {
      pageProps['collection'] = nft.collection;
    }
    analyticsActions.trackPage('NFT View', pageProps);
  });

  const scrollCallback = React.useCallback(({ viewableItems }) => {
    if(viewableItems?.length){
      setScrollIndex(viewableItems[0].index)
    }
  }, [setScrollIndex]);

  const getItemWidth = React.useMemo(() => {
    return Math.round(dims.width >= Theme.MAX_WIDTH_CON ? Theme.MAX_WIDTH_CON : dims.width)
  }, [dims.width])

  const toggleFavorite = () => {
    const turnOn = !data[scrollIndex].isFavorited
    const newFavMint = { mint: data[scrollIndex].mint };
    analyticsActions.trackEvent(EVENTS.toggleFavorite, {
      mint: data[scrollIndex].mint,
      wallet: walletAddress,
      favorite: data[scrollIndex].isFavorited,
    });
    keychainServer.toggleFavorite(data[scrollIndex].mint, !data[scrollIndex].isFavorited);
    const newFavoriteArray = turnOn ?
        [...userProfileState.profile.favorites, newFavMint]
      :
        userProfileState.profile.favorites.filter(element => element.mint.toBase58() !== newFavMint.mint.toBase58());

    // Update local favorites list
    setUserProfileState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        favorites: newFavoriteArray
      }
    }))

    // Update nft isFavorited value in keychainAtom
    setKeychain(prev => ({
      ...prev,
      nfts: prev.nfts.map(nft => (
        nft.mint.toBase58() === data[scrollIndex].mint.toBase58() ? 
          { ...nft, isFavorited: turnOn } 
        : 
          nft
        )
      )
    }))
    
    createToast(`${turnOn ? 'Added to' : 'Removed from'} favorites`, turnOn ? NOTI_STATUS.SUCCESS : NOTI_STATUS.DEFAULT);
  }

  const getWalletIndex = React.useMemo(() => {
    return keychain.keys.findIndex(key => key.wallet.toBase58() === walletAddress);
  }, [walletAddress])

  const setProfilePic = async () => {
    const payload = {
      mint: data[scrollIndex].mint,
      wallet: walletAddress,
      favorite: data[scrollIndex].isFavorited,
    }
    analyticsActions.trackEvent(EVENTS.setProfilePic, payload);
    keychainServer.setProfilePic(payload.mint);
    setUserProfileState(prev => ({
      jwt: prev.jwt,
      profile: {
        profileNft: {
          mint: data[scrollIndex].mint,
          pic: data[scrollIndex].imageUrl
        },
        favorites: prev.profile.favorites
      }
    }))
    createToast('Profile picture updated', NOTI_STATUS.SUCCESS);
  }

  const goBack = () => props.navigation.goBack();

  const renderItem = ({ item }) => 
    <NFTFocused nft={item} wallet={{ name: walletAddress, index: getWalletIndex}} widthOfCon={getItemWidth} />

  const scroll = (direction: number) => {
    if(scrollRef?.current){
      scrollRef.current.scrollToIndex({ animated: true, index: scrollIndex + direction })
      setScrollIndex(prev => (prev + direction));
    }
  }


  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={data}
            renderItem={renderItem}
            getItemLayout={(_, index) => (
              {
                length: getItemWidth,
                offset: getItemWidth * index,
                index
              }
            )}
            initialScrollIndex={scrollIndex}
            contentContainerStyle={{ flex: 1 }}
            onViewableItemsChanged={scrollCallback}
          />
        </View>
        <View style={styles.botCon}>
          <View style={styles.botCon}>
            {data[scrollIndex].isFavorited ?
              <FatButton
                text="Unpin from favorites"
                borderColor={Theme.COLORS.BUTTON_BACKGROUND_GRAY}
                color={Theme.COLORS.BUTTON_BACKGROUND_GRAY}
                func={toggleFavorite}
                icon={<StarCrossed color={"#373A47"} height={30} width={30} />}
              />
            :
              <FatButton
                text="Pin to favorites"
                color={Theme.COLORS.FAV_GOLD}
                backgroundColor={Theme.COLORS.BUTTON_BACKGROUND_GRAY}
                func={toggleFavorite}
                icon={<Star color={Theme.COLORS.FAV_GOLD} height={30} width={30} />}
              />
            }
            <FatButton
              text="Make profile picture"
              backgroundColor={Theme.COLORS.BUTTON_BACKGROUND_GRAY}
              func={setProfilePic}
              icon={<AccountCircle color={Theme.COLORS.USER_GREEN} height={30} width={30} />}
              color={Theme.COLORS.USER_GREEN}
            />
            <FatDownloadButton
              text="Download picture"
              backgroundColor={Theme.COLORS.BUTTON_BACKGROUND_GRAY}
              downloadUrl={data[scrollIndex].imageUrl}
              icon={<Download color={Theme.COLORS.ACTIVE_PINK} height={30} width={30} />}
              color={Theme.COLORS.ACTIVE_PINK}
            />
          </View>
          <View style={styles.swipeCon}>
            <TouchableOpacity disabled={scrollIndex === 0} onPress={() => scroll(-1)}>
              <Chevron height={40} width={40} color={(scrollIndex === 0) ? Theme.COLORS.INACTIVE_GRAY : "#D5DDF9"} rotation={180} />
            </TouchableOpacity>
              <TouchableOpacity onPress={goBack}>
                <Close color={Theme.COLORS.INACTIVE_GRAY }/>
              </TouchableOpacity>
              <TouchableOpacity disabled={scrollIndex === data.length - 1} onPress={() => scroll(1)}>
                <Chevron height={40} width={40} color={(scrollIndex === data.length - 1) ? Theme.COLORS.INACTIVE_GRAY : "#D5DDF9"} rotation={0} />
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  maxCon: {
    width: '100%',
    maxWidth: Theme.MAX_WIDTH_CON,
    minHeight: Theme.MIN_HEIGHT_CON,
  },
  nftCon: {
    padding: Theme.SPACING.SM,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  botCon: {
    flex: 1,
    flexDirection: 'column',
    padding: Theme.SPACING.MD
  },
  swipeCon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})


export default NFTData;
