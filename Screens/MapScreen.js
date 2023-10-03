import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Map from '../Components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../Components/NavigateCard'
import RideOptions from '../Components/RideOptions'
import NavFavs from '../Components/NavFavs'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

const MapScreen = () => {
  const Stack = createNativeStackNavigator()
  const navigation = useNavigation()
  //console.log('the MapScreen platoform',Platform.OS);
  return (
    <View>
      <TouchableOpacity onPress={()=> navigation.navigate('Home')}
       className='bg-gray-100  absolute top-12 left-1 z-10 rounded-full p-3 shadow-lg '>
        <Icon name='chevron-left' size={30} />
      </TouchableOpacity>
      <View className='h-1/2' >
      <Map />
      </View>

      <View  className='h-1/2 bg-white'>
    <Stack.Navigator>
        <Stack.Screen name='NavigateCard' component={NavigateCard} options={{headerShown:false}}   />
        <Stack.Screen name='RideOptions' component={RideOptions}   options={{headerShown:false}} />
       </Stack.Navigator>    
   
      
      </View>
    </View>
  )
}

export default MapScreen