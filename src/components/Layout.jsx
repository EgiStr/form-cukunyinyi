import Navbar from './Navbar';
import Footer from './Footer';
import PropTypes from 'prop-types'; 

function Layout({ children }) {
  return (
    <>
    
      {/* Navbar */}
      <Navbar />
      
      {/* Konten Utama */}
      <main>
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired, // children harus ada dan harus berupa elemen React
  };
  
  export default Layout;
