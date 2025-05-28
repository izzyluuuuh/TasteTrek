import { View, Text, Image, TouchableOpacity } from 'react-native'
import {useRef} from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp,} 
       from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native' 
import Animated from 'react-native-reanimated'

export default function WelcomeScreen() {
const animation = useRef(null)
const navigation = useNavigation();

  return (
    // <View className="bg-[#f64e32] flex-1 justify-center items-center space-y-10 relative">
    <View style={{
      backgroundColor: '#f3f3f3', //fcba04
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      gap: 10, // or use marginBottom/top for spacing
    }}>

    <Image 
      source={require("../../assets/images/tastetrek_logo2-preview.png")}
      style={{ width: 200, height: 200, resizeMode: 'contain' }} 
    />

    {/* Rusty Orange (#C05A2D approx.) – Used for the location pin and the fork.
        Dark Forest Green (#1C3B2A approx.) – Used for the compass ring and directional pointers. */}

    <StatusBar style="dark" />

     {/* Lottie Logo */}
     {/* <View>
      <LottieView 
       autoPlay
          ref={animation}
          style={{
            width: wp(40),
            height: hp(40),
          }}
          source={require("../../assets/lottie/food-logo.json")}
      />
     </View> */}

    {/* Title and Subtitle */}
      {/* <View className="flex items-center space-y-2"> */}
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{ fontWeight: '900', marginTop: 200, fontSize: 30 }}>
        TasteTrek
      </Text>

      <Text
        style={{
          fontWeight: '400', color: '#1C3B2A',
          fontSize: hp(2.2), marginTop: '20', marginBottom: '50'}}>
          Explore some delicious Food
      </Text>
    </View>

    <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#1C3B2A",
            paddingVertical: hp(1.5),
            paddingHorizontal: hp(5),
            borderRadius: hp(1.5),
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{
              color: "#C05A2D",
              fontSize: hp(2.0),
              fontWeight: "800",}}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}