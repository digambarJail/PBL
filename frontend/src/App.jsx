import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import GetBlogs from "./pages/GetBlogs"; // Correct import statement
import AddEvent from './pages/addEvent';
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import Logout from "./pages/Logout";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from "./components/ThemeProvider";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import NoPrivateRoute from "./components/NoPrivateRoute";
import ShowBlogs from './pages/ShowBlogs';
import GetQuestion from './pages/GetQuestion';
import GetUserDetails from './pages/GetUserDetails';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import ContactUs from './pages/Contacts';

function App() {
  return (
    <PersistGate persistor={persistor}>
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
              <Header />
              <Routes>
                <Route element={<NoPrivateRoute />} >
                  <Route path="login" element={<Login />} />
                  <Route path="reg" element={<Signup />} />
                  <Route path="forgot-password" element={<ForgotPassword/>}/>
                  <Route path="resetPassword/:tokenId" element={<ResetPassword/>} />
                  
                </Route>
                <Route element={<PrivateRoute />} >
                  <Route path="/" element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="showblogs" element={<ShowBlogs />} />
                  <Route path="addEvent" element={<AddEvent />} />
                  <Route path="getBlogs/:blogId" element={<GetBlogs />} /> {/* Use element prop */}
                  <Route path="getQuestion/:quesId" element={<GetQuestion />} /> {/* Use element prop */}
                  <Route path="getUserDetails/:userId" element={<GetUserDetails />} />
                  <Route path="contact" element={<ContactUs/>} />
                </Route>
                <Route path="logout" element={<Logout />} />
              </Routes>
              <FooterCom />
            </BrowserRouter>
          </Auth0Provider>
        </ThemeProvider>
      </Provider>
    </PersistGate>

  )
}

export default App;



