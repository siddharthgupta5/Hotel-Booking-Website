
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { hotels } from '../data'; 
import { rooms } from '../rooms'; 

export default function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find(h => h.id === parseInt(id));
  const hotelRooms = rooms.find(r => r.hotelId === parseInt(id))?.rooms || [];

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedRooms, setSelectedRooms] = useState(
    hotelRooms.reduce((acc, room) => {
      acc[room.id] = 0; 
      return acc;
    }, {})
  );
  const [notification, setNotification] = useState(null);

  const handleAddRoom = (roomId) => {
    setSelectedRooms(prev => {
      const room = hotelRooms.find(r => r.id === roomId);
      if (!room) return prev;
      
      const currentQuantity = prev[roomId] || 0;
      const maxAvailable = room.numberAvailable;
      const quantityToAdd = currentQuantity + 1;

      if (quantityToAdd <= maxAvailable) {
        return { ...prev, [roomId]: quantityToAdd };
      } else {
        alert('Cannot exceed available rooms.');
        return prev;
      }
    });
  };

  const handleRemoveRoom = (roomId) => {
    setSelectedRooms(prev => {
      if ((prev[roomId] || 0) > 0) {
        return { ...prev, [roomId]: (prev[roomId] || 0) - 1 };
      } else {
        alert('Cannot have less than 0 rooms.');
        return prev;
      }
    });
  };

//   const handleAddToCart = () => {
//     if (!checkInDate || !checkOutDate) {
//       alert('Please select check-in and check-out dates.');
//       return;
//     }

//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

//     const cartMap = new Map(cartItems.map(item => [item.roomId, item]));

//     Object.keys(selectedRooms).forEach(roomId => {
//       const quantity = selectedRooms[roomId];
//       if (quantity > 0) {
//         const existingItem = cartMap.get(parseInt(roomId));
//         if (existingItem) {
//           existingItem.quantity = Math.min(existingItem.quantity + quantity, hotelRooms.find(r => r.id === parseInt(roomId)).numberAvailable);
//         } else {
//           cartMap.set(parseInt(roomId), { roomId: parseInt(roomId), quantity });
//         }
//       }
//     });

//     localStorage.setItem('cart', JSON.stringify(Array.from(cartMap.values())));
//     localStorage.setItem('checkInDate', checkInDate);
//     localStorage.setItem('checkOutDate', checkOutDate);
//     showNotification('Rooms added to cart!');
//   };

const handleAddToCart = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates.');
      return;
    }
  
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
    const cartMap = new Map(cartItems.map(item => [item.roomId, item]));
  
    Object.keys(selectedRooms).forEach(roomId => {
      const quantity = selectedRooms[roomId];
      if (quantity > 0) {
        const existingItem = cartMap.get(parseInt(roomId));
        if (existingItem) {
          existingItem.quantity = Math.min(existingItem.quantity + quantity, hotelRooms.find(r => r.id === parseInt(roomId)).numberAvailable);
        } else {
          cartMap.set(parseInt(roomId), { roomId: parseInt(roomId), quantity, hotelId: hotel.id });
        }
      }
    });
  
    localStorage.setItem('cart', JSON.stringify(Array.from(cartMap.values())));
    localStorage.setItem('checkInDate', checkInDate);
    localStorage.setItem('checkOutDate', checkOutDate);
    showNotification('Rooms added to cart!');
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="p-4 relative">
      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
      <p className="text-lg mb-4">{hotel.city}, {hotel.country}</p>
      
      <div className="mb-4">
        <label htmlFor="check-in-date" className="block text-lg font-medium mb-2">Check-In Date</label>
        <input
          type="date"
          id="check-in-date"
          className="border rounded px-2 py-1"
          value={checkInDate}
          onChange={e => setCheckInDate(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="check-out-date" className="block text-lg font-medium mb-2">Check-Out Date</label>
        <input
          type="date"
          id="check-out-date"
          className="border rounded px-2 py-1"
          value={checkOutDate}
          onChange={e => setCheckOutDate(e.target.value)}
        />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">Available Rooms</h2>
      <ul className="space-y-4">
        {hotelRooms.map(room => (
          <li key={room.id} className="border p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">{room.type}</h3>
            <p className="text-gray-700">{room.description}</p>
            <p className="text-gray-900 font-bold">${room.price} per night</p>
            <p className="text-gray-600">Available Rooms: {room.numberAvailable}</p>
            
            <div className="flex items-center mt-2">
              <button
                onClick={() => handleRemoveRoom(room.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                -
              </button>
              <span className="mx-4">{selectedRooms[room.id] || 0}</span>
              <button
                onClick={() => handleAddRoom(room.id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="flex justify-between mt-4">
        <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add to Cart
        </button>
        <button onClick={handleGoToCart} className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Cart
        </button>
      </div>

      {notification && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-red-300 text-white px-6 py-4 rounded-lg shadow-lg max-w-sm text-center relative">
            <span className="block text-xl font-semibold mb-2">{notification}</span>
            <div className="absolute top-1 right-1 cursor-pointer" onClick={() => setNotification(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
