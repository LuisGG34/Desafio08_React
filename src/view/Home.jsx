import React, { useContext } from 'react';
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PizzaContext } from '../context/PizzaContext';

const Home = () => {
    const { listaPizzas } = useContext(PizzaContext);
    
    return (
        <>
            <Header/>
            <div className="container mt-4">
                <div className="row">
                    {listaPizzas.map((pizza, index) => (
                        <div className="col-md-4 mb-4" key={`pg-principal-${pizza.id}-${index}`}>
                            <CardPizza 
                                pizza={pizza}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;

