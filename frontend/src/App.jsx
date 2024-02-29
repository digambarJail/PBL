import Blog from "./components/Blog";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import "./index.css";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Signup from "./components/Signup";


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
      <NavBar />
      <RouterProvider router={router}/>
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
