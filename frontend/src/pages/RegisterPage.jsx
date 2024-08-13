
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {

    const [fullName, setFullName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {

        e.preventDefault();
        
        localStorage.setItem('user', JSON.stringify({ fullName, email, password }));
        
        navigate('/login');
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className="primary">Register</button>
                    <div className="text-gray-400 text-center py-2">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
