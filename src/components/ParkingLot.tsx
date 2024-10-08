// src/components/ParkingLot.tsx
import React, { useState } from 'react';
import { ParkedCarTable } from './ParkedCarTable';

export interface Vehicle {
    licensePlate: string;
    parkedAt: Date;
}

const ParkingLot: React.FC = () => {
    const totalSpots = 10; // Define total parking spots
    const [licensePlate, setLicensePlate] = useState<string>('');
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    // Add a vehicle if there's space available
    const parkVehicle = () => {
        if (licensePlate.trim() === '') return;
        if (vehicles.length < totalSpots) {
            setVehicles([...vehicles, { licensePlate, parkedAt: new Date() }]);
            setLicensePlate('');
        } else {
            alert('No parking spots available.');
        }
    };


    return (
        <div>
            <h1>Parking Lot Management</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter License Plate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' ? parkVehicle() : null}

                />
                <button onClick={parkVehicle}>Park Vehicle</button>
            </div>

            {vehicles.length === totalSpots && <p style={{ color: 'red' }}>No spots available!</p>}
            <ParkedCarTable vehicles={vehicles} setVehicles={setVehicles} />

        </div>
    );
};

export default ParkingLot;
