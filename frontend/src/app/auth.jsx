// import { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   // Function to update isLoggedIn state based on the token
//   useEffect(() => {
//     const isLoggedIn = !!token;
//     setIsLoggedIn(isLoggedIn);
//   }, [token]);

//   // Function to store the token in local storage
//   const storeTokenInLS = (serverToken) => {
//     localStorage.setItem("token", serverToken);
//     setToken(serverToken); // Update token state
//   };

//   // Function to log out user
//   const LogoutUser = () => {
//     setToken(""); // Clear token
//     localStorage.removeItem("token"); // Remove token from local storage
//   };

//   const [isLoggedIn, setIsLoggedIn] = useState(!!token); // Initialize isLoggedIn state

//   return (
//     <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth used outside of the Provider");
//   }
//   return authContextValue;
// };
