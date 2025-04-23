import React from "react";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet"; // Correct import
import { useCity } from "/src/Components/hook/useCity";
import L from 'leaflet'; // Import Leaflet library

export default function Leaflet() { // Export the component as default
    const { setCity, position, setPosition, setDetails } = useCity();
    const apiKey = 'pk.bb664c9dae193388a1b52145ccb969bf'; // Isi dengan LocationIQ API Key Anda

    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());

                // Fetch location details from LocationIQ API
                axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`)
                    .then(res => {
                        const data = res.data;
                        console.log(data);

                        // Extract city and details
                        const city = data.address.city || data.address.town || data.address.village || "Unknown Location";
                        const details = {
                            address: data.display_name,
                            country: data.address.country,
                            state: data.address.state,
                        };

                        setCity(city);
                        setDetails(details); // Save additional details in context
                    })
                    .catch(err => {
                        console.error("Error fetching location: ", err);
                    });
            },
        });

       // Create custom marker icon from image
       const customIcon = new Icon({
        iconUrl: '/assets/marker.png', // Path to the image file in the public folder
        iconSize: [32, 32],  // Size of the icon (adjust as needed)
        iconAnchor: [16, 32], // Anchor point of the icon (bottom center of the icon)
        popupAnchor: [0, -32], // Popup position relative to the icon
    });

    return position === null ? null : (
        <Marker position={position} icon={customIcon}></Marker>
    );
    }

    return (
        <div className="leaflet-container">
            <MapContainer center={[39.364283, -74.422927]} zoom={13} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
}