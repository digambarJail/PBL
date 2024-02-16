import Blog from "./components/Blog";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import "./index.css";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
      <>
      <div className="relative">
      <Route path="/" element={<><NavBar /><Login /></>} />
      {/* <Route path="instruction" element={<Instruction/>} /> */}
      {/* <Route path="question" element={<QuestionMcq/>} /> */}
      {/* <Route path="leaderboard" element={<Leaderboard/>} /> */}
      {/* <Route path="result" element={<Result/>} /> */}
      {/* <Route path="Ourteam" element={<OurTeam/>} /> */}
      </div>
      </>     
  
  )
)

function App({routes}) {

  return (
    <>
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
