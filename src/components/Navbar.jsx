import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state for mobile menu
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('Logout berhasil!');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <>
      <nav className="bg-white shadow-md py-1 md:px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 md:h-14" />
          <span className="text-gray-700 font-semibold">Ekowisata Cuku Nyi Nyi</span>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-gray-600">
          <Link to='/scan' className="hover:text-gray-800">Kenali Mangrove</Link>
          <Link to="/" className="hover:text-gray-800">Daftar Wisata</Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <a href="/login" className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">Login</a>
          )}
        </div>

        {/* Hamburger Icon for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 bg-white shadow-lg flex flex-col items-center space-y-4 py-4 text-gray-600 z-50">
            <Link to="/scan" className="hover:text-gray-800">Kenali Mangrove</Link>
            <Link to="/" className="hover:text-gray-800">Daftar Wisata</Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <a href="/login" className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">Login</a>
            )}
          </div>
        )}
      </nav>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </>
  );
};

export default Navbar;
