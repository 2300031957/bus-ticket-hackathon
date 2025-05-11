import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import HomeContainer from './pages/home_container/HomeContainer';
import Bus from './pages/bus/Bus';
import Detail from './pages/bus/Detail';
import Checkout from './pages/checkout/Checkout';
import Ticket from './pages/ticket/Ticket';
import About from './pages/about/About';
import Services from './pages/services/services';
import Safety from './pages/safety/Safety';
import FAQ from './pages/faq/FAQ';
import Support from './pages/support/Support';
import Privacy from './pages/privacy/Privacy';
import Terms from './pages/terms/Terms';
import Cancellation from './pages/cancellation/Cancellation';
import Contact from './pages/contact/Contact';
import CustomerCare from './pages/customer-care/CustomerCare';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Footer from './components/footer/Footer';
import Chatbot from './components/Chatbot';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/landing/Landing';
import Profile from './pages/profile/Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
  };

  return (
    <Web3Provider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300">
            {isAuthenticated ? (
              <>
                <Navbar onLogout={handleLogout} />
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Routes>
                    <Route path="/" element={<HomeContainer />} />
                    <Route path="/home" element={<HomeContainer />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/safety" element={<Safety />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/cancellation" element={<Cancellation />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/customer-care" element={<CustomerCare />} />
                    <Route path="/bus" element={<Bus />} />
                    <Route path="/bus/:id" element={<Detail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/ticket" element={<Ticket />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
                <Chatbot />
              </>
            ) : (
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
            <Toaster position="top-right" />
          </div>
        </Router>
      </ThemeProvider>
    </Web3Provider>
  );
};

export default App;
