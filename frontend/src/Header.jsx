
import { Link } from "react-router-dom";

export default function Header({ searchQuery, setSearchQuery }) {
    
    const handleSearchChange = (e) => {
        if (typeof setSearchQuery === 'function') {
            setSearchQuery(e.target.value);
        }
    };

    return (
        <div>
            <header className='flex justify-between items-center p-4'>
                <Link to="/" className='flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>
                    <span className='font-bold text-xl'>ARROW</span>
                </Link>
                <div className='flex border px-4 py-2 border-gray-400 rounded-full gap-2 shadow-md shadow-gray-300 flex-1 max-w-md'>
                    <input
                        type="text"
                        placeholder="Search by hotel name..."
                        className="border-none outline-none px-2 py-1 w-full"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className='bg-blue-400 p-1 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <Link to="/my-orders" className="text-blue-500 hover:underline mt-4 inline-block px-2"> 
                    My Orders
                </Link>
                <Link to={'/login'} className='flex border items-center px-4 py-2 border-gray-400 rounded-full gap-2 shadow-md shadow-gray-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div className="bg-gray-400 rounded-full border overflow-hidden border-gray-400 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 relative ">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </Link>
            </header>
        </div>
    );
}
