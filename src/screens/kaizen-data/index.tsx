import React from 'react';

//Components
import { Kaizen } from '../../types/kaizen';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import KaizenFocused from '../../components/kaizen/focused';
import { FatButton } from '../../components/ui/buttons';

//Placeholder
// import dummyData from '../gallery/dummy-data';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../nav/galleryStack';

//SVGs
import Chevron from '../../assets/svgs/Icons/chevron';
import Star from '../../assets/svgs/Icons/star';
import StarCrossed from '../../assets/svgs/Icons/star-crossed';
import Download from '../../assets/svgs/Icons/download';
import AccountCircle from '../../assets/svgs/Icons/account-circle';
import Close from '../../assets/svgs/Icons/close';

//Styles
import * as Theme from '../../constants/theme';

interface Props extends BottomTabScreenProps<RootStackParamList, 'KaizenData'> {
  // other props ...
}


const KaizenData : React.FC<any> = (props: Props) : React.ReactElement => {

  const [focusedKaizen, setFocusedKaizen] = React.useState<Kaizen>()
  const [kaizenIndex, setKaizenIndex] = React.useState(props.route.params.initialKaizenIndex)
  const [wallet, setWallet] = React.useState(props.route.params.walletAddress) // TODO this will likely change

  // TODO recoil get full kaizen array

  // React.useEffect(() => {
  //   setFocusedKaizen(dummyData.find(data => data.name === wallet.name)?.kaizens[kaizenIndex]); // TODO change out dummyData for recoil data
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
      <View style={styles.kaizenCon}>
        {/* <KaizenFocused kaizen={focusedKaizen} wallet={{ name: dummyData.find(data => data.name === wallet.name), index: 1 }}/>  */}
      </View>
      <View style={styles.botCon}>
        <View style={styles.botCon}>
          {focusedKaizen?.isFavorited ?
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
  kaizenCon: {
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


export default KaizenData;