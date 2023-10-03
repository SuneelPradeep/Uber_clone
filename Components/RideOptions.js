import { View, Text, TouchableOpacity, FlatList ,Image} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { traveltimes } from '../features/DataSlice'

const RideOptions = () => {

   const navigation = useNavigation()
   const traveltimeinfo = useSelector(traveltimes)
   const Data = [
    {
      id: "Uber-X-123",
      title : "Uber-X",
      multiplier : 1,
      image : "https://links.papareact.com/3pn"
    },
    {
      id: "Uber-X-456",
      title : "Uber-XL",
      multiplier : 1.2,
      image : "https://links.papareact.com/5w8"
    },
    {
      id: "Uber-X-789",
      title : "Uber-LUX",
      multiplier : 1.75,
      image : "https://links.papareact.com/7pf"
    }
   ]

   const [select,setselect] = useState('')
console.log('select is ',select);

let SURGE_CHARGE_RATE = 1.5;
  return (
    <SafeAreaView className='bg-white flex-grow'>
      <View>
        <TouchableOpacity className='absolute -top-14  left-1 p-3 rounded-full' onPress={()=> navigation.navigate('NavigateCard')} >
          <Icon name='chevron-left' type='fontawesome' size={35} onPress={()=> navigation.navigate('NavigateCard')} 
       /><Text></Text></TouchableOpacity>
      
      <Text className='text-center text-2xl -top-10' >Select a Ride {traveltimeinfo?.distance?.text}</Text>
      </View>
  <FlatList  data={Data} keyExtractor={(item)=> item.id} className=' -mt-8'
  renderItem={({item : {id,title,multiplier,image},item})=>(
    <TouchableOpacity className={`flex-row items-center justify-between px-6 -py-3 ${id===select?.id && 'bg-gray-200'}`} onPress={()=>setselect(item)}>
      <Image style={{width:80,height:80,resizeMode:'contain'}} source={{uri:image}}  />
      <View className=''>
      <Text className='text-xl font-semibold'>{title} </Text>
      <Text>{traveltimeinfo?.duration?.text} Travel time</Text>
      </View>
      {/* <Text> x{multiplier} </Text> */}
      <Text className='text-xl'> {
      
      new Intl.NumberFormat('en-gb', {
        style:'currency', currency:'gbp'
      }).format((
        (traveltimeinfo?.duration?.value || 2000 * SURGE_CHARGE_RATE * multiplier)/100
  ))}</Text>
       
    </TouchableOpacity>
  )}  />
  <View>
    <TouchableOpacity disabled={!select} className={`bg-black m-3 py-3 ${!select && 'bg-gray-300'}`}>
      <Text className='text-center text-white text-xl'> Choose {select?.title} </Text>
    </TouchableOpacity>
  </View>
    </SafeAreaView>
  )
}

export default RideOptions