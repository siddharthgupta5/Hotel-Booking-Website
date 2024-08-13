import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hotels } from '../data'; 
import { rooms } from '../rooms'; 

export default function OrderConfirmationPage() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem('orderConfirmation'));
    if (details) {
      setOrderDetails(details);
      

      localStorage.removeItem('orderConfirmation');
    }
  }, []);

  const getRoomDetails = (roomId) => {
    
    for (const hotel of hotels) {
      const room = rooms.find(r => r.hotelId === hotel.id)?.rooms.find(r => r.id === roomId);
      if (room) return { room, hotel };
    }
    return { room: null, hotel: null };
  };

  return (
    <div className="p-4">
      {orderDetails ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-lg mb-4">Your bookings have been confirmed.</p>
          <p className="text-xl mb-4">Order ID: <strong>{orderDetails.orderId}</strong></p>
          
          <h2 className="text-2xl font-semibold mb-2">Booked Rooms</h2>
          <ul className="space-y-4">
            {orderDetails.items.map(item => {
              const { room, hotel } = getRoomDetails(item.roomId);
              return room && hotel ? (
                <li key={room.id} className="border p-4 rounded shadow-md">
                  <h3 className="text-xl font-semibold">Room: {room.type}</h3>
                  <p className="text-gray-700">Hotel: {hotel.name}</p>
                  <p className="text-gray-700">City: {hotel.city}</p>
                  <p className="text-gray-900 font-bold">${room.price} per night</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </li>
              ) : null;
            })}
          </ul>
          
          <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
            Back to Home
          </Link>
          {/*<Link to="/my-orders" className="text-blue-500 hover:underline mt-4 inline-block px-4"> 
            My Orders
          </Link>*/}

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
