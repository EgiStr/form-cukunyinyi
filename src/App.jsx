import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from './pages/Home'; 
import OrderDetail from './pages/TiketOrder/[id]'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/TiketOrder/:id" element={<OrderDetail />} />  
      </Routes>
    </Router>
  );
}

export default App;
