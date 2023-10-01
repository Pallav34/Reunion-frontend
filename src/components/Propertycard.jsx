// src/PropertyCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRuler, faHouse } from '@fortawesome/free-solid-svg-icons';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white border-4 rounded-lg shadow-md overflow-hidden max-w-xs mx-auto">
      <div className="relative">
        <img
          src={property.imgurl}
          alt={property.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full">
        ₹{property.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-2">{property.title}</h3>
        <p className="text-gray-500">{property.location}</p>
        <div className="flex justify-between mt-4">
          <div>
            <FontAwesomeIcon icon={faBed} className="text-blue-500" /> {property.bed} beds
          </div>
          <div>
            <FontAwesomeIcon icon={faBath} className="text-blue-500" /> {property.bathroom} bathrooms
          </div>
          <div>
            <FontAwesomeIcon icon={faHouse} className="text-blue-500" /> {property.height}X{property.width}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
