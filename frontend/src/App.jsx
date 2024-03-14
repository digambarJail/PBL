import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, BrowserRouter, Routes } from 'react-router-dom';
import Signup from "./pages/Signup";
import {Auth0Provider} from "@auth0/auth0-react";
import Logout from "./pages/Logout";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";


import React from 'react'
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from "./components/ThemeProvider";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import NoPrivateRoute from "./components/NoPrivateRoute";

function App() {
  return (
    <PersistGate persistor ={persistor}>
    <Provider store={store}>
      <ThemeProvider>
            <Auth0Provider
    domain="dev-4zxyc845vquu0dla.us.auth0.com"
    clientId="XDoZfhZC63FBynTMU6Uutah2dWkrsL8f"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <BrowserRouter>
    
    <Header/>
    <Routes>
    <Route element={<><NoPrivateRoute /></>} >
    <Route path="login" element={<><Login /></>} />
      <Route path="reg" element={<><Signup /></>} />
      </Route>
      <Route element={<><PrivateRoute /></>} >
        <Route path="/" element={<Home/>} />
        <Route path="dashboard" element={<><Dashboard/></>} />
        <Route path="blog" element={<><Blog /></>} />
        </Route>
        <Route path="logout" element={<><Logout/></>} />
        
        
      
    </Routes>
    <FooterCom/>
    </BrowserRouter>
    </Auth0Provider>
    </ThemeProvider>
    </Provider>
    </PersistGate>
  )
}

export default App
// const router = createBrowserRouter(
//   createRoutesFromElements(
//       <>
//       <Route path="login" element={<><Login /></>} />
//       <Route path="/" element={<Home/>} />
//       <Route path="reg" element={<><Signup /></>} />
//       <Route path="logout" element={<><Logout/></>} />
//       </>     
  
//   )
// )

// function App({routes}) {

//   return (
//     <>
//     <AuthProvider>
    //   <Auth0Provider
    // domain="dev-4zxyc845vquu0dla.us.auth0.com"
    // clientId="XDoZfhZC63FBynTMU6Uutah2dWkrsL8f"
    // authorizationParams={{
    //   redirect_uri: window.location.origin
    // }}
    // >
//       <NavBar />
//       <RouterProvider router={router}/>
//       </Auth0Provider>
//       </AuthProvider>
//     </>
//   );
// }

// export default App;
