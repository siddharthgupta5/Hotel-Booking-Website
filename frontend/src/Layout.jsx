import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="flex flex-col p-4 min-h-screen">
            <Header />
            <Outlet />
        </div>
    );
}