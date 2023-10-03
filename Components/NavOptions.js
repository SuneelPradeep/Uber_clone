import { View, Text ,FlatList,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import { datas, origins } from '../features/DataSlice'
import {ArrowRightCircleIcon, ArrowRightIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const NavOptions = () => {

     const Data = useSelector(datas)
     const navigation = useNavigation()
     const origin = useSelector(origins)
     //console.log('origin in navoptions is',origin);
  return (
   <FlatList horizontal data = {Data} keyExtractor={(item)=> item.id}
   renderItem={({ item })=>(
    <TouchableOpacity onPress={()=>navigation.navigate(item.screen)} disabled={!origin?.location}
     className='m-2 bg-gray-200 p-10 pb-8 pl-6 pt-4 w-40 h-40 items-center justify-center'>
        <View className={`${!origin?.location ? 'opacity-20' : null}`}>
        <Image source={{uri : item?.image}} className='w-20 h-20 ' />
        <Text className='text-lg mt-2 font-semibold '>{item.title}</Text>
        <ArrowRightCircleIcon color='black' className='bg-black h-20 rounded-full w-20 mt-4 p-2' />
        </View>
    </TouchableOpacity>
  
  )}
   />
  )
}

export default NavOptions