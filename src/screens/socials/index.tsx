import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import { SocialMedia } from '../../components/ui/socialMedia/index';
import * as Theme from "../../constants/theme";
import  Chevron from '../../assets/svgs/Icons/chevron';
import Wallet from '../../assets/svgs/Icons/wallet'
import { NormalText } from '../../components/ui/text';

const Landing : React.FC<any> = () : React.ReactElement => {
   
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
                <View>
                    <SocialMedia></SocialMedia>
                    <SocialMedia></SocialMedia>
                    <SocialMedia></SocialMedia>
                </View>

                <View>
                    <NormalText style={styles.text2}>Don't miss our updates!</NormalText>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                    />
                    
                    <TouchableOpacity style={styles.text2}>
                        <NormalText >SUBSCRIBE</NormalText>
                    </TouchableOpacity>
                </View>

            </View>
        
      </View>      

    </View>
  )
}

const styles = StyleSheet.create({
  con: {
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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
  logo:{
    width:16,
    height: 16, 
  },
  text: {
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    lineHeight: 6,
    maxWidth: 500,
    textAlign: "center",
    fontFamily: 'BlenderPro-Bold',
    paddingVertical: 16,
  },
  text2: {
    fontFamily: 'BlenderPro-Bold',
    color: Theme.COLORS.ACTIVE_PINK,
    paddingBottom: 16 
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

export default Landing;