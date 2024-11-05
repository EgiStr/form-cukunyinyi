import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from '@/pages/Home'; 
import OrderDetail from '@/pages/TiketOrder/[id]'; 
import KnowMangrove from '@/pages/KnowMangrove';
import HasilMangrove from '@/pages/KnowMangrove/hasil';
import { ImageProvider } from '@/pages/KnowMangrove/ImageContext';

function App() {
  return (
    <ImageProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/TiketOrder/:id" element={<OrderDetail />} />  
        <Route path="/admin/" element={<AdminPage />} />  
      </Routes>
    </Router>
    </ImageProvider>
  );
}

export default App;
