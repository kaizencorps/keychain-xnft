import React from 'react';

//Components
import { NFT } from '../types/NFT';
import { View, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import NFTFocused from '../components/galleryNFT/focused/focused-nft';
import { FatButton, FatDownloadButton } from '../components/ui/buttons/buttons';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/galleryStack';

//Data
import { useRecoilValue } from 'recoil';
import { walletNftsSelector } from '../_state/keychain';

//SVGs
import Chevron from '../assets/svgs/Icons/chevron';
import Star from '../assets/svgs/Icons/star';
import StarCrossed from '../assets/svgs/Icons/star-crossed';
import Download from '../assets/svgs/Icons/download';
import AccountCircle from '../assets/svgs/Icons/account-circle';
import Close from '../assets/svgs/Icons/close';

//Styles
import * as Theme from '../constants/theme';
import { PublicKey } from '@solana/web3.js';
import ScreenWrapper from '../components/screenWrapper/screenWrapper';

interface Props extends BottomTabScreenProps<RootStackParamList, 'NFTData'> {}


const NFTData : React.FC<any> = (props: Props) : React.ReactElement => {

  const { nft, walletAddress } = props.route.params;

  const dims = useWindowDimensions();

  const scrollRef: any = React.useRef();

  const data: NFT[] = useRecoilValue(walletNftsSelector(new PublicKey(walletAddress)))

  const [scrollIndex, setScrollIndex] = React.useState<number>(data.findIndex((element: NFT) => element.mint === nft.mint))

  const scrollCallback = React.useCallback(({ viewableItems }) => {
    if(viewableItems?.length){
      setScrollIndex(viewableItems[0].index)
    }
  }, [setScrollIndex]);

  const getItemWidth = React.useMemo(() => {
    return Math.round(dims.width >= Theme.MAX_WIDTH_CON ? Theme.MAX_WIDTH_CON : dims.width)
  }, [dims.width])

  const toggleFavorite = () => {
    // TODO
  }

  const setProfilePic = () => {
    // TODO
  }

  const goBack = () => props.navigation.goBack();

  const renderItem = ({ item }) => <NFTFocused nft={item} wallet={walletAddress} widthOfCon={getItemWidth} /> 

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