
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { hotels } from '../data'; 
import { rooms } from '../rooms'; 

export default function HotelDetailsPage() {
  const { id } = useParams();
  const hotel = hotels.find(h => h.id === parseInt(id));
  const hotelRooms = rooms.find(r => r.hotelId === parseInt(id))?.rooms || [];


  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
      <p className="text-lg mb-4">{hotel.city}, {hotel.country}</p>
      
      <div className="mb-4">
        <label htmlFor="check-in-date" className="block text-lg font-medium mb-2">Check-In Date</label>
        <input
          type="date"
          id="check-in-date"
          className="border rounded px-2 py-1"
          value={checkInDate}
          onChange={handleCheckInDateChange}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="check-out-date" className="block text-lg font-medium mb-2">Check-Out Date</label>
        <input
          type="date"
          id="check-out-date"
          className="border rounded px-2 py-1"
          value={checkOutDate}
          onChange={handleCheckOutDateChange}
        />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">Available Rooms</h2>
      <ul className="space-y-4">
        {hotelRooms.map(room => (
          <li key={room.id} className="border p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">{room.type}</h3>
            <p className="text-gray-700">{room.description}</p>
            <p className="text-gray-900 font-bold">${room.price} per night</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
