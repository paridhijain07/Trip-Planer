import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </Provider>
  );
}

export default App;
