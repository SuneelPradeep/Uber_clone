import { View, Text } from 'react-native'
import React, { useEffect, useRef,useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { datas, origins, setDestination, setOrigin } from '../features/DataSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavOptions from '../Components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_API} from '@env'
import {Cities} from '../cities'
import NavFavs from '../Components/NavFavs'

const Home = () => {
    const searchRef = useRef(null)
    const data = useSelector(datas)
    const dispatch = useDispatch()
    const origin = useSelector(origins)
    const [search,setSearch] = useState('')
    ////console.log('data is',search,origin);
 
    const handleChange=(text)=>{
      //console.log('the entered text is',text);
        setSearch(text)
    }
    const handleOrigin = ()=>{
    let newValue = Cities.filter((item)=> item.city_ascii.toLowerCase() === search.toLowerCase())
      //console.log('data2 is',newValue);
       if(search && newValue && newValue.length>0){
        dispatch(setOrigin({...newValue[0], location : {lat : newValue[0]?.lat,long : newValue[0]?.lng} ,description :`${newValue[0]?.country}'s beautiful city` }))
        // location : data.geometry.location,
        // description : data.description
       }  
     }


   useEffect(()=>{
  handleOrigin()
   },[search])
    

  //  useEffect(()=>{
  //   //console.log('entered here');
  //  //console.log('The search info is', searchRef.current?.getAddressText((v)=> setSearch(v)));
  //  },[searchRef])

  return (
    <SafeAreaView className='bg-white flex-1'>
     <View className='p-5'>  
     <Text className='text-4xl font-bold mb-2'> Uber </Text>
       <GooglePlacesAutocomplete  placeholder='Where From ?' ref={searchRef}
       styles={{container: {flex:0},textInput:{fontSize : 18}}}
       query={{ key : GOOGLE_API, language : 'en'}}  textInputProps={{
        onChangeText: handleChange
      }}
       nearbyPlacesAPI='GooglePlacesSearch' debounce={400}
       enablePoweredByContainer={false} minLength={2} 
       onPress={(data,details=null)=> {
        setSearch()
        dispatch(setOrigin({
          location : data.geometry.location,
        description : details.description }))

        dispatch(setDestination(null))
      }}
       fetchDetails={true} returnKeyType={"search"}
       />
       <NavOptions />
       <NavFavs forwhat='origin'  />
       </View>
    </SafeAreaView>
  )
}

export default Home