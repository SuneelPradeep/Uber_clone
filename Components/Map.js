import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { destinations, origins, setTravelTimeInformation } from '../features/DataSlice'
import {GOOGLE_API} from '@env'
import MapViewDirections  from 'react-native-maps-directions'

const Map = () => {
    const Mapref= useRef(null)
     const origin = useSelector(origins)
     const dispatch = useDispatch()
     const destination = useSelector(destinations)
     //console.log('dest is',destination);

      // useEffect(()=>{
      //       if(!origin || !destination) return ;
      //     Mapref.current?.fitToSuppliedMarkers(["origin","destination"],{
      //       edgePadding : {top:50,bottom: 50,right : 50,left : 50}
      //     })
      // },[origin,destination])

       useEffect(()=>{
        //using DISTANCE MATRIX API HERE TO CALUCUATE DISTANCE 
        console.log('origin ',origin,'destination', destination);
        if(!origin || !destination) return ;
            const getTravelTime = async()=>{
              fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_API}`)
             .then(res=> res.json())
             .then(data => {dispatch(setTravelTimeInformation(data.rows[0].elements[0]))})
             .catch(err=> console.log('error is ',err))
            }     
          
            getTravelTime()
          
          },[origin,destination,GOOGLE_API])

  return (
    
    <MapView className='flex-1' mapType='mutedStandard'
    initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.long,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    
    >
      {/* {origin?.location && destination?.location &&
      <MapViewDirections    
      ref={Mapref}
       origin={origin.location}
       destination={destination.location}
       apikey={GOOGLE_API}
       strokeColor='blue'
      />
      } */}
      {origin?.location &&
      <Marker coordinate={{ latitude: origin.location.lat,
        longitude: origin.location.long    }} title={origin.city_ascii} description={origin?.description} identifier='origin'
        />}
        {destination?.description !==undefined && destination?.location.lat !==undefined &&
      <Marker coordinate={{ latitude: destination.location.lat,
        longitude: destination.location.long    }} title={destination.city_ascii} description={destination?.description} identifier='destination'
        />}

      </MapView>
  )
}

export default Map