import React from 'react';

//Components
import { View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import { SocialMedia } from '../components/ui/socialMedia/socialMedia';
import { NormalText } from '../components/ui/text/text';
import { FatPinkButton } from '../components/ui/buttons/buttons';
import { Input } from '../components/ui/inputs/inputs'

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/aboutStack';

//Styles
import * as Theme from "../constants/theme";

//SVGs
import Discord from '../assets/svgs/logos/discord';
import Twitter from '../assets/svgs/logos/twitter';
import Email from '../assets/svgs/Icons/email';
import { Colors } from 'react-native/Libraries/NewAppScreen';

//React


interface Props extends BottomTabScreenProps<RootStackParamList, 'Socials'> {}

const Socials: React.FC<any> = (props: Props) : React.ReactElement => {

  const [inputValue, setInputValue] = React.useState("");
  
  const handleSubscribe = () => {}
   
  return (
    <View style={styles.con}>
      <View style={styles.subCon}>
            <View style={styles.card1}>
                <Image source={require("../../assets/pngs/Keychain-Logo.png")} style={styles.logo}/>
                <View style={styles.ImageBox}>
                  <Image source={require("../../assets/pngs/KaizenCorpslogo3.png")} style={styles.logo2} />
                </View>
            </View>
            <View style={styles.card2}>
                <NormalText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Donec sit amet porta ipsum. Praesent vitae sem sit amet arcu hendrerit imperdiet at at tellus. 
                    Curabitur turpis neque, hendrerit a nulla quis, mattis dapibus diam. Vivamus auctor accumsan orci, 
                    vitae scelerisque quam dapibus eget. Quisque magna tellus, congue ut rhoncus posuere, condimentum at tortor.
                </NormalText>
                <View style={styles.card2_1}>
                    <SocialMedia bgColor={Theme.COLORS.DISCORD} icon = {<Discord  width={25} height={25}/>}/>
                    <SocialMedia bgColor={Theme.COLORS.TWITTER} icon = {<Twitter width={25} height={25}/>}/>
                    <SocialMedia bgColor={Theme.COLORS.EMAIL} icon= {<Email color= {Theme.COLORS.LABEL_TEXT_WHITE} width={20} height={20}/>}/>
                </View>
                <View style={styles.card2_2}>
                    <NormalText style={styles.text2}>Don't miss our updates!</NormalText>
                    <Input
                      style={styles.input}
                      placeholder="Enter your email"
                      val={inputValue}
                      onChangeText= {setInputValue}
                    />
                    <FatPinkButton text='SUBSCRIBE' func={handleSubscribe} />
                </View>
            </View>
      </View>      
    </View>
  )
}

const styles = StyleSheet.create({
  con: {
    display:"flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK
  }, 
  subCon:{
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: Theme.MAX_WIDTH_CON
  },
  card1: {
    width: "100%",
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  card2:{
    width: "100%",
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10
  },
  card2_1:{
    display: 'flex', 
    flexDirection: 'row',
    gap: Theme.SPACING.XXL,
    justifyContent : 'space-around',
    padding: Theme.SPACING.XXL
    
  },
  card2_2:{
    width: '60%',
    display: "flex", 
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Theme.COLORS.MEDIA_GREY,
    padding: Theme.SPACING.XXL,
    marginTop: Theme.SPACING.XXL, 
    borderRadius: Theme.BRADIUS.SM,
    gap:16
  },
  logo:{
    width: 150,
    height: 150, 
  },
  logo2:{
    width:'100%',
    height: '100%', 
    backgroundColor: 'transparent'
  },
  ImageBox:{
    height: 50, 
    width: 120, 
    padding : Theme.SPACING.LG
  },
  text: {
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    lineHeight: 16,
    maxWidth: 500,
    textAlign: "justify",
    fontFamily: 'BlenderPro-Bold',
    paddingBottom: 16,
    paddingHorizontal: 50
  },
  text2: {
    fontFamily: 'BlenderPro-Bold',
    fontSize : Theme.SPACING.XL,
    color: Theme.COLORS.ACTIVE_PINK,
    textAlign : "center"
  },
  tex3:{
    margin:32
  },
  button: { 
    width: "100%",
    borderRadius: Theme.BRADIUS.XL,
    margin: 16,
    backgroundColor: Theme.COLORS.ACTIVE_PINK, 
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    fontSize: 32,
    fontFamily: 'BlenderPro-Bold',
    display: "flex",
    justifyContent: "center",
    padding: 10, 
    marginHorizontal: 5
   },
   input: {
    backgroundColor: Theme.COLORS.USER_BACKGROUND_GRAY,
    borderRadius: Theme.BRADIUS.SM,
    padding: Theme.SPACING.XL,
    color: Theme.COLORS.BUTTON_BACKGROUND_GRAY
   }
});

export default Socials;