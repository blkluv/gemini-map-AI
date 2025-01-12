import React, { createContext, useContext, useState } from "react";

const CityContext = createContext();

export function CityProvider({ children }) {
    const [city, setCity] = useState('');
    const [position, setPosition] = useState(null); // Koordinat posisi
    const [details, setDetails] = useState({});

    return (
        <CityContext.Provider value={{ city, setCity, position, setPosition, details, setDetails }}>
            {children}
        </CityContext.Provider>
    );
}

export const useCity = () => useContext(CityContext);
