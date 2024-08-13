import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyOrdersPage() {
    
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.orderId} className="border p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold">Order ID: {order.orderId}</h2>
              <h3 className="text-lg font-semibold mb-2">Total Cost: ${order.totalCost.toFixed(2)}</h3>
              <ul className="space-y-2">
                {order.items.map(item => (
                  <li key={item.roomId} className="border p-2 rounded">
                    <h4 className="text-md font-semibold">Room ID: {item.roomId}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Back to Home
      </Link>
    </div>
  );
}
