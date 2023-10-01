// src/Filter.js
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
import { server } from "../main";
 var queryString = ""
const Filter = ({setProperties}) => {
  const cities = ["Select Location","Kolkata", "Mumbai", "Delhi","Haldia"];
  const propertyTypes = ["Select Property Type","Public", "Private", "Shared"];
  const [selectedLocation, setSelectedLocation] = useState('');

  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  const[selectedDate,setSelectedDate] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  
  const handleDateChange = (date)=>{
    setSelectedDate(date);
    console.log(selectedDate);
  }
  const handlePriceRangeChange = (newPriceRange) => {
    setSelectedPriceRange([newPriceRange,newPriceRange+3000]);
  };

  
  
  const submitHandler = async ()=>{
    const formattedPriceRange = selectedPriceRange.join('-');
    const availdate = selectedDate ? selectedDate.toISOString() : selectedDate
    console.log(availdate)
    queryString = `?location=${selectedLocation}&propertytype=${selectedPropertyType.toLowerCase()}&pricerange=${formattedPriceRange}&availdate=${availdate}`
    console.log(queryString)

    try{
      await axios.get(`${server}/list-properties/${queryString}`,{
        withCredentials:true,
    })
    .then((res)=>{
        setProperties(res.data);
    })
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 lg:ml-5 sm:ml-0">
        Search Properties For Rent
      </h2>
      <div className="lg:flex lg:justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 " >
        <div className="mb-4 sm:ml-0 relative">
          <div className="absolute inset-y-0 right-2 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-md mb-1 mt-2 max-sm:hidden">
          </div>
            <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <select
            id="location"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-400 font-extrabold pr-8  "
            onChange={(e)=>e.target.value!="Select Location" ? setSelectedLocation(e.target.value) : setSelectedLocation('')}
            value={selectedLocation}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 pr-10 relative">
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-md mb-1 mt-2 max-sm:hidden"></div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Available from Date
          </label>
          <DatePicker
            placeholderText="Select Move In Date"
            id="date"
            selected={selectedDate}
            onChange={handleDateChange}
            className="mt-1 p- border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-400 font-extrabold"
          />
        </div>

        <div className="mb-4 relative pr-10">
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-md mb-1 mt-2 max-sm:hidden"></div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price Range: {selectedPriceRange[0]} - {selectedPriceRange[1]}
          </label>
          <Slider
            id="price"
            min={0}
            max={10000}
            defaultValue={selectedPriceRange}
            step={10}
            className="mt-4"
            onChange={handlePriceRangeChange}
          />
        </div>

        <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-60 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-md mb-1 mt-2 max-sm:hidden"></div>
          <label
            htmlFor="propertyType"
            className="block text-sm font-medium text-gray-700"
          >
            Property Type
          </label>
          <select
            id="propertyType"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-400 font-extrabold pr-9"
            onChange={(e)=>e.target.value!='Select Property Type'? setSelectedPropertyType(e.target.value): setSelectedPropertyType('')}
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center mt-6">
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full focus:outline-none" onClick={submitHandler}>
          Apply
        </button>
      </div>
      </div>
    </div>
  );
};

export default Filter;
