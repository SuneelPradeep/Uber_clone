import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_API} from '@env'
import { useDispatch } from 'react-redux'
import { setDestination } from '../features/DataSlice'
import { useNavigation } from '@react-navigation/native'
import {Cities } from '../cities'
import { ArrowRightCircleIcon, BanknotesIcon, TruckIcon } from 'react-native-heroicons/solid'
import NavFavs from './NavFavs'
import { Icon } from '@rneui/base'
const NavigateCard = () => {

 const dispatch = useDispatch()
 const navigation = useNavigation()
  const [dest, setdest] = useState('')

 const onChangeDestination = (text)=>{
console.log('REACHED EHRE',text)
let newText = text ? text : ''
     setdest(text)
     let newDest = Cities.filter((item)=> item.city_ascii.toLowerCase() === text.toLowerCase())
     //console.log('REACHED EHRE newdest is',newDest )
     //console.log('THE OUTGOING DETAILS',{location : {lat :  newDest[0]?.lat, long : newDest[0]?.lng}, description :`${newDest[0]?.country}'s beautiful city`});
     
     if(newDest && newDest.length>0){
        dispatch(setDestination({location : {lat :  newDest[0]?.lat, long : newDest[0]?.lng}, description :`${newDest[0]?.country}'s beautiful city`} ))
    
     }
    
 }
 const handleDestination = ()=>{
    navigation.navigate('RideOptions')
 }
 
  return (
    <SafeAreaView className='relative bg-white flex-1'>
        <Text className='text-center text-xl -mt-4'> Good Morning, Suneel </Text>
        <View className='border-t border-gray-200 flex-shrink'>
            <GooglePlacesAutocomplete  placeholder='Where to ?' fetchDetails={true} nearbyPlacesAPI='GooglePlacesSearch'
            styles={googleStyles} returnKeyType={"search"} minLength={2} enablePoweredByContainer={false}
           query={{
            key : GOOGLE_API,language:'en'
           }} 
           renderRightButton={() => <ArrowRightCircleIcon size={40} color='black' className='mt-2' onPress={handleDestination} />
        }
           textInputProps={{onChangeText : onChangeDestination  }}
           
           onPress={(data,details=null)=>{
              dispatch(setDestination({location: details.geometry.location, description : data.description}))
              navigation.navigate('RideOptions')
            }}
           />
            <NavFavs forwhat='destination'   />
          </View>
         <View className='flex-row bg-white justify-evenly mt-auto mb-1 border-t oy-2 border-gray-100'>
            <TouchableOpacity className='bg-black justify-between flex-row px-4 py-3  rounded-full w-24 ' onPress={()=> navigation.navigate('RideOptions')}>
           {/* <TruckIcon size={20} color='white' />*/}
           <Icon name='car' type='font-awesome' color='white' size={20}   />
           <Text className='text-white text-center'> Rides</Text> 
            </TouchableOpacity>
            <TouchableOpacity className='flex-row px-4 py-3 rounded-full w-24 gap-2 '>
           {/* <BanknotesIcon size={20} color='white' />*/}
           <Icon name='fast-food-outline' type='ionicon' color='black' size={20} />
           <Text className='text-black text-center'> Eats</Text> 
            </TouchableOpacity>
         </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const googleStyles = StyleSheet.create({
    container :{
        backgroundColor:'white',
        paddingTop: 20,
        flex:0
    },
    textInput : {
        backgroundColor:'#DDDDDF',
        borderRadius:0,
        fontSize:15
    },
    textInputContainer :{
        paddingHorizontal:20,
        paddingBottom:0
    }

})