import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableOrder from '../../components/admin/TableOrders';

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Validate if the token exists
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
    } else {
      try {
        // Here you could add additional validation like checking expiration
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          throw new Error('Invalid token format');
        }

        const payload = JSON.parse(atob(tokenParts[1])); // Decode the payload
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000); // Current time in seconds

        if (expiry < now) {
          // If token has expired, remove it and redirect to login
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  return (
    <div>
      <h2 className="text-center mt-20 text-3xl mb-10 font-semibold">Admin Page</h2>
      <TableOrder />
    </div>
  );
};

export default AdminPage;
