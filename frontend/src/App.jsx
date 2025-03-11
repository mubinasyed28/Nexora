import './App.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements,Route} from "react-router"
import LandingPage2 from './pages/LandingPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* /Route> */}
      <Route path='/' element={<LandingPage2/>}/>
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
