import React from 'react';

//Components
import { NFT } from '../types/NFT';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import NFTFocused from '../components/galleryNFT/focused/focused-nft';
import { FatButton } from '../components/ui/buttons/buttons';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/galleryStack';

//SVGs
import Chevron from '../assets/svgs/Icons/chevron';
import Star from '../assets/svgs/Icons/star';
import StarCrossed from '../assets/svgs/Icons/star-crossed';
import Download from '../assets/svgs/Icons/download';
import AccountCircle from '../assets/svgs/Icons/account-circle';
import Close from '../assets/svgs/Icons/close';

//Styles
import * as Theme from '../constants/theme';

interface Props extends BottomTabScreenProps<RootStackParamList, 'NFTData'> {}


const NFTData : React.FC<any> = (props: Props) : React.ReactElement => {

  const [focusedNFT, setFocusedNFT] = React.useState<NFT>()
  const [nftIndex, setNFTIndex] = React.useState(props.route.params.initialNFTIndex)
  const [wallet, setWallet] = React.useState(props.route.params.walletAddress) // TODO this will likely change

  // TODO recoil get full NFT array

  // React.useEffect(() => {
  //   setFocusedNFT(dummyData.find(data => data.name === wallet.name)?.nfts[nftIndex]); // TODO change out dummyData for recoil data
  // }, [])

  const toggleFavorite = () => {

  }

  const setProfilePic = () => {

  }

  const downloadPicture = () => {

  }

  const goBack = () => props.navigation.goBack();

  return (
    <View>
      {/* TODO index value is placeholder. Get from recoil */}
      {/* TODO make this section swipeable */}
      <View style={styles.nftCon}>
        {/* <NFTFocused nft={focusedNFT} wallet={{ name: dummyData.find(data => data.name === wallet.name), index: 1 }}/>  */}
      </View>
      <View style={styles.botCon}>
        <View style={styles.botCon}>
          {focusedNFT?.isFavorited ?
            <FatButton 
              text="Unpin from favorites" 
              borderColor="buttonBackgroundGray"
              color="buttonBackgroundGray"
              func={toggleFavorite}
              icon={<StarCrossed color={"#373A47"} height={30} width={30} />}
            />
          :
            <FatButton 
              text="Pin to favorites" 
              color="shinyGold" 
              backgroundColor="buttonBackgroundGray"
              func={toggleFavorite}
              icon={<Star color={"#F8B600"} height={30} width={30} />}
            />
          }
          <FatButton 
            text="Make profile picture" 
            backgroundColor="buttonBackgroundGray"
            func={setProfilePic}
            icon={<AccountCircle color={"#00FFBA"} height={30} width={30} />}

          />
          <FatButton 
            text="Download picture"
            backgroundColor="buttonBackgroundGray"
            func={downloadPicture}
            icon={<Download color={"#BE7DFF"} height={30} width={30} />}

          />
        </View>
        <View style={styles.swipeCon}>
          <Chevron height={40} width={40} color={"#D5DDF9"} rotation={270} />
            <TouchableOpacity onPress={goBack}>
              <Close color={Theme.COLORS.INACTIVE_GRAY }/>
            </TouchableOpacity>
          <Chevron height={40} width={40} color={"#D5DDF9"} rotation={90} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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