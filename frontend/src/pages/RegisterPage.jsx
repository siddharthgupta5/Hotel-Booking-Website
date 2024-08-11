import { Link } from "react-router-dom";

export default function RegisterPage () {
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4 ">Register</h1>
                <form className="max-w-md mx-auto">
                    <input type="text" placeholder="Full Name" />
                    
                    <input type="email" placeholder="your@email.com" />
                    <input type="password" placeholder="password" />
                    <button className="primary">Login</button>
                    <div className="text-gray-400 text-center py-2">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}