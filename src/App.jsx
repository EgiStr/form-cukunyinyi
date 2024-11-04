import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from './pages/Home'; 
import OrderDetail from './pages/TiketOrder/[id]'; 
import AdminPage from './pages/admin';
import LoginPage from './pages/Login';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/TiketOrder/:id" element={<OrderDetail />} />  
        <Route path="/admin/" element={<AdminPage />} />  
      </Routes>
    </Router>
  );
}

export default App;
