import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  data : [
    {
        id : 1,
        title : "Get a Ride",
        image : 'https://links.papareact.com/3pn',
        screen : 'Map'
    },
    {
        id : 2,
        title : "Order Food",
        image : 'https://links.papareact.com/28w',
        screen : 'Eats'
    },
 ],
 origin : [] ,
 destination : [],
 traveltimeinfo : ''

}

export const DataSlice = createSlice({
    name : 'data',
    initialState,
    reducers : {
     changedata : (state,action)=>{
        state.data = action.payload
     },
     setOrigin : (state,action)=>{
        state.origin = action.payload
     },
     setDestination : (state,action)=>{
        state.destination = action.payload
     },
     setTravelTimeInformation : (state,action)=>{
        state.traveltimeinfo = action.payload
     }
    }
})


export const {changedata,setDestination,setOrigin,setTravelTimeInformation} = DataSlice.actions;
export const datas = (state)=> state.data.data;
export const destinations = (state) => state.data.destination;
export const origins = (state) => state.data.origin;
export const traveltimes = (state) => state.data.traveltimeinfo;

export default DataSlice.reducer