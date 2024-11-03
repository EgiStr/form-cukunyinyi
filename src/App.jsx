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
        <Route path="/" element={<Order />} />
        <Route path="/tiket/:id" element={<OrderDetail />} />  
        <Route path="/scan" element={<KnowMangrove />} />  
        <Route path="/scan/hasil" element={<HasilMangrove />} />  
      </Routes>
    </Router>
    </ImageProvider>
  );
}

export default App;
