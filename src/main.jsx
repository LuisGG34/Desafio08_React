import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CarritoProvider } from "./context/CarritoContext";
import { PizzaProvider } from "./context/PizzaContext";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from 'react-router-dom'; // Importa Router aquí

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Coloca el Router aquí para envolver todo */}
      <UserProvider>
        <PizzaProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </PizzaProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
)
