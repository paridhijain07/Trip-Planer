import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
    <NavBar></NavBar>
    <main className='min-h-[78vh]'>
    <Outlet></Outlet>
    </main>
    <Footer></Footer>
    <Toaster></Toaster>
    </> 
  )
}

export default App;
