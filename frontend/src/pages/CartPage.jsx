
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hotels } from '../data'; 
import { rooms } from '../rooms'; 

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const filteredCartItems = cartItems.filter(item => item.quantity > 0);

  
  const hotelId = JSON.parse(localStorage.getItem('cart')).length > 0
    ? JSON.parse(localStorage.getItem('cart'))[0].hotelId
    : null;

  const filteredItemsByHotel = filteredCartItems.filter(item => item.hotelId === hotelId);

  const getRoomDetails = (roomId) => {
    for (const hotel of hotels) {
      const room = rooms.find(r => r.hotelId === hotel.id)?.rooms.find(r => r.id === roomId);
      if (room) return { room, hotel };
    }
    return { room: null, hotel: null };
  };

  const handleRemoveFromCart = (roomId) => {
    const updatedItems = cartItems
      .map(item => {
        if (item.roomId === roomId) {
          return { ...item, quantity: 0 }; 
        }
        return item;
      })
      .filter(item => item.quantity > 0);

    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleCheckout = () => {

    const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
    

    const orderDetails = {
      orderId,
      items: filteredCartItems,
      totalCost
    };
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));
  

    localStorage.setItem('orderConfirmation', JSON.stringify(orderDetails));
  
    localStorage.removeItem('cart');
  
    
    navigate('/order-confirmation');
  };


  const checkInDate = new Date(localStorage.getItem('checkInDate'));
  const checkOutDate = new Date(localStorage.getItem('checkOutDate'));

 
  const numberOfDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));


  const totalCost = filteredItemsByHotel.reduce((total, item) => {
    const { room } = getRoomDetails(item.roomId);
    return total + (room ? room.price * item.quantity * numberOfDays : 0);
  }, 0);

  return (
    <div className="relative p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {filteredItemsByHotel.length === 0 ? (
        <p>Your cart is empty or contains rooms from multiple hotels.</p>
      ) : (
        <ul className="space-y-4">
          {filteredItemsByHotel.map(item => {
            const { room, hotel } = getRoomDetails(item.roomId);
            return room && hotel ? (
              <li key={room.id} className="border p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold">Room: {room.type}</h2>
                <p className="text-gray-700">Hotel: {hotel.name}</p>
                <p className="text-gray-700">City: {hotel.city}</p>
                <p className="text-gray-900 font-bold">${room.price} per night</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Number of Days: {numberOfDays}</p>
                <button
                  onClick={() => handleRemoveFromCart(item.roomId)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Remove from Cart
                </button>
              </li>
            ) : null;
          })}
        </ul>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-bold">Total Payment: ${totalCost.toFixed(2)}</h2>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Make Payment
        </button>
      </div>
    </div>
  );
}
