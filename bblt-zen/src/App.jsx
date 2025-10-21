import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import {CartProvider} from "./context/CartContext";
import {Navigation} from "./components/Navigation";
import {HomePage} from "./pages/HomePage";
import {MenuPage} from "./pages/MenuPage";
import {CustomPage} from "./pages/CustomPage";
import {DessertsPage} from "./pages/DessertsPage";
import {CartPage} from "./pages/CartPage";
import "./App.css";

function App() {
    return (
        <CartProvider>
            <Router>
                <div>
                    {/* Navbar con i Link */}
                    <Navigation>
                        <Link to="/">Home</Link>
                        <Link to="/menu">Menu</Link>
                        <Link to="/custom">Crea</Link>
                        <Link to="/desserts">Dolci</Link>
                        <Link to="/cart">Carrello</Link>
                    </Navigation>

                    {/* Qui invece vanno le Route */}
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/menu" element={<MenuPage/>}/>
                            <Route path="/custom" element={<CustomPage/>}/>
                            <Route path="/desserts" element={<DessertsPage/>}/>
                            <Route path="/cart" element={<CartPage/>}/>
                            {/* fallback se non trova la pagina */}
                            <Route path="*" element={<HomePage/>}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
