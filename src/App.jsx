import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Order from '@/pages/Home'; 
import OrderDetail from '@/pages/TiketOrder/[id]'; 
import KnowMangrove from '@/pages/KnowMangrove';
import HasilMangrove from '@/pages/KnowMangrove/hasil';
import { ImageProvider } from '@/pages/KnowMangrove/ImageContext';
import AdminPage from '@/pages/admin';
import LoginPage from '@/pages/Login';
import AdminOrders from './pages/admin/orders';

function App() {
  return (
    <ImageProvider>
    <Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/" element={<AdminPage />} />  
        <Route path="/tiket/:id" element={<OrderDetail />} />  
        <Route path="/scan" element={<KnowMangrove />} />  
        <Route path="/scan/hasil" element={<HasilMangrove />} />  
        <Route path="/admin/orders" element={<AdminOrders />} />  
      </Routes>
    </Router>
    </ImageProvider>
  );
}

export default App;
