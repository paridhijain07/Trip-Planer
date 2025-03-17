// import { useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     logout();
//     navigate("/"); // Redirect after logout
//   }, []);

//   return <h2 className="text-center mt-10">Logging out...</h2>;
// };

// export default Logout;
import React from 'react'

const Logout = () => {
  return (
    <div>
      Log out
    </div>
  )
}

export default Logout

