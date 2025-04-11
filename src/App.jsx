import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './Web3Context';
import Navbar from './components/navbar/Navbar';
import HomeContainer from './pages/home_container/HomeContainer';
import Bus from './pages/bus/Bus';
import Detail from './pages/bus/Detail';
import Checkout from './pages/checkout/Checkout';
import Ticket from './pages/ticket/Ticket';
import About from './pages/about/About';
import Services from './pages/services/services';
import Footer from './components/footer/Footer';
import Chatbot from './components/Chatbot';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/bus" element={<Bus />} />
              <Route path="/bus/:id" element={<Detail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/ticket" element={<Ticket />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
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
      </Router>
    </Web3Provider>
  );
}

export default App;
