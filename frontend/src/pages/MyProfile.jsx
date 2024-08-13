import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MyProfile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem('loggedIn');

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
    }, [loggedIn, navigate]);

    if (!user) return null;

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div>
                <h1 className="text-3xl text-center mb-4">My Profile</h1>
                <p><strong>Full Name:</strong> {user.fullName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {/* */}
            </div>
        </div>
    );
}
