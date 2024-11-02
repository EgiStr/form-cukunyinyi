import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from '@/pages/Home'; 
import OrderDetail from '@/pages/TiketOrder/[id]'; 
import KnowMangrove from '@/pages/KnowMangrove';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/tiket/:id" element={<OrderDetail />} />  
        <Route path="/scan" element={<KnowMangrove />} />  
      </Routes>
    </Router>
  );
}

export default App;
