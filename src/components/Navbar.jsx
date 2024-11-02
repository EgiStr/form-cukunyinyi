const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="/path-to-logo.png" alt="Logo" className="h-6" />
        <span className="text-gray-700 font-semibold text-lg">Ekowisata Cuka Nyinyi</span>
      </div>

      <div className="flex space-x-6 text-gray-600">
        <a href="#knowMangrove" className="hover:text-gray-800">knowMangrove</a>
        <a href="#daftarWisata" className="hover:text-gray-800">Daftar Wisata</a>
      </div>
    </nav>
  );
};

export default Navbar;
