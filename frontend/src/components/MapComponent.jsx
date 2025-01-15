import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix for default marker icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Set default icon for markers
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const locationData = [
    {
        "name": "Kandy",
        "location": [7.2906, 80.6337],
        "description": "Kandy, situated in the central highlands of Sri Lanka, is a culturally significant city renowned as the last capital of the ancient Kandyan Kingdom, primarily famous for housing the Temple of the Sacred Tooth Relic (Sri Dalada Maligawa), considered one of the most sacred Buddhist sites in the world; it's characterized by its scenic setting around Kandy Lake, lush greenery, hilly terrain, and a rich tapestry of traditional architecture and vibrant cultural practices."
    },
    {
        "name": "Sigiriya",
        "location": [7.9570, 80.7603],
        "description": "Sigiriya, located in Sri Lanka, is an ancient rock fortress built on a towering, nearly vertical rock pillar, also known as Lion Rock, where the ruins of a 5th-century palace constructed by King Kassapa I remain, notable for its intricate gardens, frescoes depicting celestial dancers, a unique Lion's Gate entrance, and stunning views from its summit, making it a UNESCO World Heritage Site and one of Sri Lanka's most popular tourist attractions."
    },
    {
        "name": "Trincomalee",
        "location": [8.5874, 81.2152],
        "description": "Trincomalee, situated on Sri Lanka's northeast coast, is a port city renowned for its exceptional natural harbor, considered one of the best in the world, and is particularly known for its beautiful beaches, rich history with colonial forts like Fort Frederick, the prominent Koneswaram Temple, and opportunities for whale watching and diving."
    },
    {
        "name": "Anuradhapura",
        "location": [8.3114, 80.4037],
        "description": "Anuradhapura is an ancient city in Sri Lanka, considered the first capital of the island and a significant Buddhist pilgrimage site, renowned for its well-preserved ruins including massive stupas, palaces, and monasteries, all dating back to the 5th century BC; most notably, it is home to the Sri Maha Bodhi, a sacred fig tree considered one of the oldest living trees in the world, which is said to be a cutting from the tree under which Buddha attained enlightenment."
    }
];

function MapComponent({onLocationsChange}) {
  const [locations,setLocations] = useState([]);

  const onClickSelect = (name) => {
    // Ensure unique entries in the locations array
    if (!locations.includes(name)) {
      const updatedLocations = [...locations, name]; // Create a new updated array
      setLocations(updatedLocations); // Update the local state
      onLocationsChange(updatedLocations); // Pass the updated array to the parent
    }
  };
    return (
        <MapContainer center={[7.8731, 80.7718]} zoom={10} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {locationData.map((location, index) => (
                <Marker key={index} position={location.location}>
                    <Popup>
                        <strong>{location.name}</strong>
                        <p>{location.description}</p>
                        <button className='btn' onClick={onClickSelect(location.name)}>Select</button>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapComponent;
