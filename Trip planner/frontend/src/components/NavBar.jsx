import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, LogIn } from "lucide-react"; // Import icons for menu

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] shadow-md p-4 flex justify-between items-center relative border-b border-[#1e3a8a]/40 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-[#f1f5f9]">TripGuide</h1>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="text-[#f1f5f9] hover:text-[#93c5fd] transition">
          Home
        </Link>
        <Link to="/about" className="text-[#f1f5f9] hover:text-[#93c5fd] transition">
          About Us
        </Link>
        <Link
          to="/login"
          className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
        >
          <LogIn size={20} />
          <span>Sign In</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      {/* <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button> */}

      {/* Mobile Menu */}
      {/* {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0f172a] flex flex-col items-center p-4 gap-4 md:hidden border-b border-[#1e3a8a]/40">
          <Link to="/" className="text-[#f1f5f9] hover:text-[#93c5fd] transition" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="text-[#f1f5f9] hover:text-[#93c5fd] transition" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link
            to="/trip-planner"
            className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-4 py-2 rounded-md transition"
            onClick={() => setIsOpen(false)}
          >
            Plan Your Trip
          </Link>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
