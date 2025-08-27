import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between">
            {/*LOGO*/}
            <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
                <img src="/fishPlaceholder.png" className = "w-8 h-8" alt = "Logo" />
                <span>fishy</span>
            </Link>
            {/*MOBILE MENU */}
            <div className="md:hidden">
                {/*MOBILE BUTTON*/}
                <div className ="cursor-pointer text-2xl" onClick={() =>setOpen(prev => !prev)}>{open ? "X" : "☰"}</div>
                {/*MOBILE LINK LIST*/}
                <div className = {`w-full h-screen flex flex-col items-center justify-center absolute top-16 gap-10 font-medium text-large transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"}`}>
                    <Link to="/">Home</Link>
                    <Link to="/myposts">Your Posts</Link>
                    <Link to="/">About</Link>
                    <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login</button>
                </div>
            </div>
            {/*DESKTOP MENU*/}
            <div className="hidden md:flex items-center gap-8 xl: gap-12 font-medium">
                <Link to="/">Home</Link>
                <Link to="/myposts">Your Posts</Link>
                <Link to="/">About</Link>
                <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login</button>
            </div>
        </div>
    )
}

export default Navbar