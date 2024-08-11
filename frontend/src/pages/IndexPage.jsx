import { useState } from 'react';
import { Link } from 'react-router-dom';
import { hotels } from '../data'; 

export default function IndexPage() {
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredHotels = selectedCity === 'All' 
    ? hotels 
    : hotels.filter(hotel => hotel.city === selectedCity);

  return (
    <div>
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Find Your Perfect Hotel</h1>
        <div className="mb-4">
          <label htmlFor="city-filter" className="block text-lg font-medium mb-2">Filter by City</label>
          <select
            id="city-filter"
            className="border rounded px-2 py-1"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="All">All Cities</option>
            <option value="New York">New York</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
        <ul className="space-y-4">
          {filteredHotels.map(hotel => (
            <li key={hotel.id} className="border p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold">
                <Link to={`/hotel/${hotel.id}`} className="text-blue-600 hover:underline">
                  {hotel.name}
                </Link>
              </h2>
              <p className="text-gray-700">{hotel.city}, {hotel.country}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { hotels } from '../data'; // Adjust the path as needed

// export default function LandingPage({ searchQuery }) {
//   const [selectedCity, setSelectedCity] = useState('All');
//   const [filteredHotels, setFilteredHotels] = useState(hotels);

//   useEffect(() => {
//     // Filter hotels based on selectedCity and searchQuery
//     const result = hotels.filter(hotel => {
//       const cityMatches = selectedCity === 'All' || hotel.city === selectedCity;
//       const nameMatches = searchQuery === '' || hotel.name.toLowerCase().includes(searchQuery.toLowerCase());
//       return cityMatches && nameMatches;
//     });

//     setFilteredHotels(result);
//   }, [selectedCity, searchQuery]); // Re-run the effect when city or searchQuery changes

//   return (
//     <div>
//       <main className="p-4">
//         <h1 className="text-3xl font-bold mb-4">Find Your Perfect Hotel</h1>
//         <div className="mb-4">
//           <label htmlFor="city-filter" className="block text-lg font-medium mb-2">Filter by City</label>
//           <select
//             id="city-filter"
//             className="border rounded px-2 py-1"
//             value={selectedCity}
//             onChange={(e) => setSelectedCity(e.target.value)}
//           >
//             <option value="All">All Cities</option>
//             <option value="New York">New York</option>
//             <option value="Paris">Mumbai</option>
//             <option value="Tokyo">Delhi</option>
//             {/* Add more options as needed */}
//           </select>
//         </div>
//         <ul className="space-y-4">
//           {filteredHotels.map(hotel => (
//             <li key={hotel.id} className="border p-4 rounded shadow-md">
//               <h2 className="text-xl font-semibold">
//                 <Link to={`/hotel/${hotel.id}`} className="text-blue-600 hover:underline">
//                   {hotel.name}
//                 </Link>
//               </h2>
//               <p className="text-gray-700">{hotel.city}, {hotel.country}</p>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// }
