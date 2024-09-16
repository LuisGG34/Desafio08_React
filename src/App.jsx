import Footer from "./components/Footer";
import Home from "./view/Home";
import Navbar from "./components/Navbar";
import Login from "./view/Login";
import Register from "./view/Register";
import Cart from "./view/Cart";
import Pizza from "./view/Pizza";
import { Route, Routes, Navigate } from 'react-router-dom'; // No necesitas volver a importar Router aquí
import Profile from "./view/Profile";
import NotFound from "./view/NotFound";
import { UserContext } from "./context/UserContext"; 
import { useContext } from "react";
import Logout from "./view/Logout";

const App = () => {
  const { token } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta principal (Home) */}
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      <Footer />   
    </>
  );
};

export default App;






  