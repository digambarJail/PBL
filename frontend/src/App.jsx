import Blog from "./components/Blog";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import "./index.css";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Signup from "./components/Signup";
import {Auth0Provider} from "@auth0/auth0-react";


const router = createBrowserRouter(
  createRoutesFromElements(
      <>
      {/* <div className="relative"> */}
      <Route path="login" element={<><Login /></>} />
      <Route path="/" element={<Home/>} />
      <Route path="reg" element={<><Signup /></>} />
      {/* <Route path="question" element={<QuestionMcq/>} /> */}
      {/* <Route path="leaderboard" element={<Leaderboard/>} /> */}
      {/* <Route path="result" element={<Result/>} /> */}
      {/* <Route path="Ourteam" element={<OurTeam/>} /> */}
      {/* </div> */}
      </>     
  
  )
)

function App({routes}) {

  return (
    <>
      <Auth0Provider
    domain="dev-4zxyc845vquu0dla.us.auth0.com"
    clientId="XDoZfhZC63FBynTMU6Uutah2dWkrsL8f"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
      <NavBar />
      <RouterProvider router={router}/>
      </Auth0Provider>
    </>
  );
}

export default App;

// function App() {


//   return (
//     <>
//     <NavBar/>
//     <Login/>
//     </>

//   )
// }

// export default App
