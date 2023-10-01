import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Navbar'
import Filter from '../components/Filter'
import PropertyCard from '../components/Propertycard';
import { Context, server } from "../main";
import NavBar from '../components/Navbar';


const Home = () => {
    const [properties,setProperties] = useState([]);
    useEffect(()=>{
        axios.get(`${server}/list-properties/`,{
            withCredentials:true,
        })
        .then((res)=>{
            setProperties(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div>
        <NavBar/>
        <Filter properties={properties} setProperties={setProperties}></Filter>
        <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
    </div>
  )
}

export default Home