import Footer from "./components/Footer";
import Home from "./view//Home";
import Navbar from "./components/Navbar";
import Login from "./view//Login"
import Register from "./view//Register";
import Cart from "./view/Cart";
import Pizza from "./view/Pizza";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./view/Profile";
import NotFound from "./view/NotFound";

const App = () => {
return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ruta principal (Home) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/p001”" element={<Pizza />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
        <Footer />
    </Router>
);
};

export default App;



  