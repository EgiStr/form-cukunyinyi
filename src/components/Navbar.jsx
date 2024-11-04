import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="/path-to-logo.png" alt="" className="h-6" />
          <span className="text-gray-700 font-semibold text-lg">Ekowisata Cuka Nyinyi</span>
        </div>

        <div className="flex space-x-6 text-gray-600">
          <a href="#knowMangrove" className="hover:text-gray-800">knowMangrove</a>
          <a href="#daftarWisata" className="hover:text-gray-800">Daftar Wisata</a>
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
      </nav>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </>
  );
};

export default Navbar;
