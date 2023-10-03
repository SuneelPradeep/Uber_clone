import { View, Text ,FlatList,TouchableOpacity,Image, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {  origins, setDestination, setOrigin } from '../features/DataSlice'
import {BriefcaseIcon, HomeIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import {Cities} from '../cities'

const NavFavs = ({forwhat}) => {

     const Data = [{
      id : 1,
      name : 'Home',
      image : <HomeIcon  color='white' className='h-30 w-30' />,
      location : "Home",
      origin : "Vishakhapatnam"
     },
     { 
      id : 2,
      name : 'Work',
      image : <BriefcaseIcon color='white' className='h-30 w-30'  />,
      location : "Work",
      origin : "Anakapalle"
     },
   ]
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const origin = useSelector(origins)
  //console.log('origin in NavFavs',origin);
   
  const handleClick = (v)=>{
    let newFilteredValue = Cities.filter((item)=> item?.city_ascii?.toLowerCase() === v?.origin?.toLowerCase())
   // console.log('entered handleclick',v,newFilteredValue);
    if(forwhat==='origin'){
      if(newFilteredValue) {
        dispatch(setOrigin({...newFilteredValue[0], location : {lat : newFilteredValue[0]?.lat,long : newFilteredValue[0]?.lng} ,description :`${newFilteredValue[0]?.country}'s beautiful city` }))
        navigation.navigate('Map')
    }
    else{
      if(newFilteredValue) {
        dispatch(setDestination({...newFilteredValue[0], location : {lat : newFilteredValue[0]?.lat,long : newFilteredValue[0]?.lng} ,description :`${newFilteredValue[0]?.country}'s beautiful city` }))
        navigation.navigate('RideOptions')
    }
    }
    }
    
}

  return (
    <FlatList data={Data} keyExtractor={(item)=> item.id}
     ItemSeparatorComponent={() =>(
      <View style={{height: 0.5}} className='bg-white'  />
     )}
     renderItem={({item})=>(
      <TouchableOpacity key={item.id} className='bg-white flex-row items-center p-2' onPress={()=>handleClick(item)} >
       <Text className='bg-gray-300 rounded-full p-1 pl-1'>{item.image}
        </Text>
        <View className='pl-4'>
         <Text className='text-lg font-semibold'>{item.name} </Text> 
         <Text className='text-gray-500'>{item.origin} </Text>
        </View>
      </TouchableOpacity>
     )}
    
      />

  )
}

export default NavFavs