import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomeContainer from './pages/home_container/HomeContainer';
import Footer from "./components/footer/Footer";
import Bus from "./pages/bus/Bus";
import Detail from "./pages/bus/Detail";
import Checkout from './pages/checkout/Checkout';
import Web3Provider from './Web3Context';
import About from './pages/about/About';
import Services from './pages/services/services';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden'>
          {/* Navbar */}
          <Navbar />

          {/* Home Content */}
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/bus" element={<Bus />} />
            <Route path="/bus/:id" element={<Detail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
          </Routes>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
