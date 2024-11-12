import { useState } from 'react';
import { Home, User, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: '/', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { path: '/admin', icon: <User className="w-6 h-6" />, label: 'Manajemen Order' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout berhasil!');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={`bg-gray-800 text-white h-screen p-4 ${
          isOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 relative`}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-between mb-8">
          {isOpen && (
            <h1 className="text-xl font-bold">Dashboard</h1>
          )}
        </div>
        
        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.path}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
                >
                  <span className="text-gray-300">{item.icon}</span>
                  {isOpen && (
                    <span className="text-gray-300">{item.label}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex text-red-500 items-center space-x-2 p-2 mt-4 rounded-lg hover:bg-gray-700"
        >
          <LogOut className="text-red-500 w-6 h-6 text-gray-300" />
          {isOpen && <span className="text-gray-300 text-red-500">Logout</span>}
        </button>
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600"
        >
          {isOpen ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        {children}
      </div>
    </div>
  );
};

// Prop validation for children
Sidebar.propTypes = {
  children: PropTypes.node.isRequired,  // Validate children as a required prop
};

export default Sidebar;
