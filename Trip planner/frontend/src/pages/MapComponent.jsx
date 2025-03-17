import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [route, setRoute] = useState([]);
    const [markers, setMarkers] = useState([]);

    // Function to get geocode (latitude & longitude) for an address
    const getGeoCode = async (address) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/trip/geocode?address=${encodeURIComponent(address)}`);
    
            console.log("Geocode API Response:", response.data); // Debugging step
    
            // Ensure 'point' exists in response
            if (!response.data || !response.data.point) {
                console.error("Error: Invalid geocode response format", response.data);
                return null;
            }
    
            return {
                lat: response.data.point.lat,
                lng: response.data.point.lng
            };
        } catch (error) {
            console.error("Geocode API Error:", error);
            return null;
        }
    };
    

    // Function to fetch route from GraphHopper API via your backend
    const getRoute = async () => {
        if (!start || !end) {
            alert("Please enter both start and end locations.");
            return;
        }

        const startCoords = await getGeoCode(start);
        const endCoords = await getGeoCode(end);

        console.log("Start Coords:", startCoords);
        console.log("End Coords:", endCoords);

        if (!startCoords || !endCoords) {
            alert("Could not find locations. Try again.");
            return;
        }

        setMarkers([startCoords, endCoords]); // Set markers for valid locations

        try {
            const response = await axios.post(`http://localhost:3000/api/trip/route`, {
                locations: [startCoords, endCoords] // Sending an array of { lat, lng }
            });

            if (response.data.paths && response.data.paths.length > 0) {
                const routePoints = response.data.paths[0].points.coordinates.map(coord => [coord[1], coord[0]]);
                setRoute(routePoints);
            } else {
                alert("Route not found.");
            }
        } catch (error) {
            console.error("Route error:", error);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <input type="text" placeholder="Start Location" value={start} onChange={(e) => setStart(e.target.value)} />
                <input type="text" placeholder="End Location" value={end} onChange={(e) => setEnd(e.target.value)} />
                <button onClick={getRoute}>Find Route</button>
            </div>

            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {markers
                    .filter(position => position && position.lat !== undefined && position.lng !== undefined)
                    .map((position, idx) => (
                        <Marker key={idx} position={[position.lat, position.lng]} />
                    ))
                }

                {route.length > 0 && <Polyline positions={route} color="blue" />}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
