import React from 'react';

//Components
import { NFT } from '../types/NFT';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import NFTFocused from '../components/galleryNFT/focused/focused-nft';
import { FatButton } from '../components/ui/buttons/buttons';

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

interface Props extends BottomTabScreenProps<RootStackParamList, 'NFTData'> {}


const NFTData : React.FC<any> = (props: Props) : React.ReactElement => {

  const { nft, walletAddress } = props.route.params;

  const scrollRef: any = React.useRef();

  const data: NFT[] = useRecoilValue(walletNftsSelector(new PublicKey(walletAddress)))

  const [focusedNFT, setFocusedNFT] = React.useState<NFT>(nft);
  const [scrollIndex, setScrollIndex] = React.useState<number>(data.findIndex((element: NFT) => element.mint === nft.mint))
  const [widthOfCon, setWidthOfCon] = React.useState(1);

  const toggleFavorite = () => {
    // TODO
  }

  const setProfilePic = () => {
    // TODO
  }

  const downloadPicture = () => {
    // TODO
  }

  const goBack = () => props.navigation.goBack();

  const renderItem = ({ item }) => <NFTFocused nft={item} wallet={walletAddress} widthOfCon={widthOfCon} /> 

  const scroll = (direction: number) => {
    if(scrollRef?.current){
      scrollRef.current.scrollToIndex({ animated: true, index: scrollIndex + direction })
      setScrollIndex(prev => (prev + direction));
    }
  }

  return (
    <View style={styles.con}>
      <View style={styles.maxCon}>
        <View style={{ flex: 1 }}>
          <FlatList 
            ref={scrollRef}
            horizontal
            data={data}
            renderItem={renderItem}
            initialScrollIndex={scrollIndex}
            pagingEnabled
            contentContainerStyle={{ flex: 1 }}
            onLayout={e => setWidthOfCon(e.nativeEvent.layout.width)}
          /> 
        </View>
        <View style={styles.botCon}>
          <View style={styles.botCon}>
            {focusedNFT?.isFavorited ?
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
            <FatButton 
              text="Download picture"
              backgroundColor={Theme.COLORS.BUTTON_BACKGROUND_GRAY}
              func={downloadPicture}
              icon={<Download color={Theme.COLORS.ACTIVE_PINK} height={30} width={30} />}
              color={Theme.COLORS.ACTIVE_PINK}
            />
          </View>
          <View style={styles.swipeCon}>
            <TouchableOpacity disabled={data.length + (scrollIndex + -1) <= 0} onPress={() => scroll(-1)}>
              <Chevron height={40} width={40} color={data.length + (scrollIndex + -1) <= 0 ? Theme.COLORS.INACTIVE_GRAY : "#D5DDF9"} rotation={180} />
            </TouchableOpacity>
              <TouchableOpacity onPress={goBack}>
                <Close color={Theme.COLORS.INACTIVE_GRAY }/>
              </TouchableOpacity>
              <TouchableOpacity disabled={data.length <= (scrollIndex + 1)} onPress={() => scroll(1)}>
                <Chevron height={40} width={40} color={data.length <= (scrollIndex + 1) ? Theme.COLORS.INACTIVE_GRAY : "#D5DDF9"} rotation={0} />
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    paddingTop: Theme.SPACING.XXL,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    justifyContent: 'center', 
    alignItems: 'center',
  },
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