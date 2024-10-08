import { useEffect, useState } from "react";
import { Vehicle } from "./ParkingLot";

export interface IParkedCarTable {
    vehicles: Vehicle[];
    setVehicles: (vehicle: Vehicle[]) => void
}
export const ParkedCarTable = ({ vehicles, setVehicles }: IParkedCarTable) => {
    const [filter, setFilter] = useState<string>('');
    const [searchFilter, setSearchFilter] = useState<string>(''); // Actual search term used after debounce


    // Debounce logic: apply the search after user stops typing
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setSearchFilter(filter);
        }, 500); // 500ms delay

        return () => clearTimeout(delayDebounce); // Cleanup the timer when filter changes
    }, [filter]); // Runs whenever filter input changes

    // Remove a vehicle from the parking lot
    const removeVehicle = (licensePlate: string) => {

        setVehicles(
            vehicles.filter((vehicle) => vehicle.licensePlate !== licensePlate)
        );
    };

    // Timer calculation for each vehicle
    const calculateParkTime = (parkedAt: Date) => {
        const now = new Date().getTime();
        const parkedTime = new Date(parkedAt).getTime();
        const duration = now - parkedTime;

        const minutes = Math.floor(duration / 1000 / 60);
        const seconds = Math.floor((duration / 1000) % 60);
        return `${minutes}m ${seconds}s`;
    };

    // Filtered vehicles based on search
    const filteredVehicles = vehicles.filter((vehicle) =>
        vehicle.licensePlate.toLowerCase().includes(searchFilter.toLowerCase())
    );

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search by License Plate"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                {/* <button style={{marginLeft:'8px'}} onClick={handleSearch}>Park Vehicle</button> */}

            </div>
            <h2>Parked Vehicles:</h2>

            <table className="" border={2} cellPadding={8} align="center">
                <tr>
                    <th>License Plate:</th>
                    <th>Spot</th>
                    <th>Time Parked</th>
                    <th>Action</th>
                </tr>
                {filteredVehicles.length === 0 ? (
                    <td colSpan={4}>No vehicles parked.</td>
                ) : null
                }
                {filteredVehicles.map((vehicle, index) => (
                    <tr key={index}>
                        <td>{vehicle.licensePlate} </td>
                        {index + 1}
                        <td> {calculateParkTime(vehicle.parkedAt)} </td>
                        <td>
                            <button onClick={() => removeVehicle(vehicle.licensePlate)}>
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
            </table>

        </>
    )
}