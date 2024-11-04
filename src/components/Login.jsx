import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiLogin from '../service/useAuth';
import { AUTH_PATH } from '../constant/apiPath';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const now = Date.now() / 1000; 
    return payload.exp > now; 
  } catch (error) {
    console.error('Error decoding token:', error);
    return false; 
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isTokenValid(token)) {
      toast.info('Anda sudah login...');
      navigate('/');
    } else {
      console.log('Token tidak valid atau tidak ada, lanjutkan ke login.');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiLogin.post(AUTH_PATH.LOGIN, { email, password });
      const accessToken = response.data?.data?.access;

      if (!accessToken) {
        throw new Error('Access token tidak ditemukan dalam respons');
      }

      localStorage.setItem('token', accessToken);

      if (response.data?.data?.refresh) {
        localStorage.setItem('refreshToken', response.data.data.refresh);
      }

      toast.success("Login berhasil! Mengalihkan ke halaman utama...");
      navigate('/admin');
    } catch (err) {
      console.error("Login gagal:", {
        error: err,
        message: err.message,
        response: err.response?.data
      });

      let errorMessage;
      if (err.response && err.response.status === 400) {
        errorMessage = "Email atau password salah. Silakan coba lagi.";
      } else {
        errorMessage = "Terjadi kesalahan. Silakan coba lagi nanti.";
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="flex flex-col w-80 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <label className="mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email Anda"
          required
          className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan password Anda"
          required
          className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
          type="submit" 
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Login
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
}
