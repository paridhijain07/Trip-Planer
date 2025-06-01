import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../store/authSlice"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };

  return (
    <nav className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">TripGuide</h1>

      <div className="flex gap-6 items-center">
        <Link to="/" className="text-white hover:text-blue-300 transition">Home</Link>
        <Link to="/about" className="text-white hover:text-blue-300 transition">About Us</Link>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">Hello, {user.username}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
