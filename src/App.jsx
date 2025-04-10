import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomeContainer from './pages/home_container/HomeContainer';
import Footer from "./components/footer/Footer";
import Bus from "./pages/bus/Bus";
import Detail from "./pages/bus/Detail";
import Checkout from './pages/checkout/Checkout';
import Web3Provider from './Web3Context';
import About from './pages/about/About';
import Services from './pages/services/services';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col'>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className={`flex-grow ${isHomePage ? '' : 'container mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/bus/:id" element={<Detail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <Web3Provider>
      <Router>
        <AppContent />
      </Router>
    </Web3Provider>
  );
}

export default App;
