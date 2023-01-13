import React from 'react';

//Components
import { View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import { SocialMedia } from '../../components/ui/socialMedia/index';
import { NormalText } from '../../components/ui/text';
import { FatPinkButton } from '../../components/ui/buttons';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../nav/aboutStack';

//Styles
import * as Theme from "../../constants/theme";

interface Props extends BottomTabScreenProps<RootStackParamList, 'Socials'> {
  // other props ...
}

const Socials: React.FC<any> = (props: Props) : React.ReactElement => {

  

  const handleSubscribe = () => {}
   
  return (
    <View style={styles.con}>
      <View style={styles.subCon}>
            <View style={styles.card1}>
                <Image source={require("../../assets/pngs/Keychain-Logo.png")} style={styles.logo}/>
                <Image/>
            
            </View>
            <View style={styles.card2}>
                <NormalText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Donec sit amet porta ipsum. Praesent vitae sem sit amet arcu hendrerit imperdiet at at tellus. 
                    Curabitur turpis neque, hendrerit a nulla quis, mattis dapibus diam. Vivamus auctor accumsan orci, 
                    vitae scelerisque quam dapibus eget. Quisque magna tellus, congue ut rhoncus posuere, condimentum at tortor.
                </NormalText>
                <View style={styles.card2_1}>
                    <SocialMedia backgroundColor={Theme.COLORS.DISCORD}></SocialMedia>
                    <SocialMedia backgroundColor={Theme.COLORS.TWITTER}></SocialMedia>
                    <SocialMedia backgroundColor={Theme.COLORS.EMAIL}></SocialMedia>
                </View>

                <View style={styles.card2_2}>
                    <NormalText style={styles.text2}>Don't miss our updates!</NormalText>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
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
    alignItems: "center"
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
    
  },
  card2_2:{
    display: "flex", 
    flexDirection: 'column',
    gap : 50

  },
  logo:{
    width:100,
    height: 100, 
  },
  text: {
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    lineHeight: 16,
    maxWidth: 500,
    textAlign: "center",
    fontFamily: 'BlenderPro-Bold',
    paddingVertical: 16,
  },
  text2: {
    fontFamily: 'BlenderPro-Bold',
    color: Theme.COLORS.ACTIVE_PINK,
    paddingBottom: 16,
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

   }
});

export default Socials;