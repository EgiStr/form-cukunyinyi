const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Company</h3>
          <ul>
            <li className="mt-2"><a href="/about" className="hover:text-green-500">About Us</a></li>
            <li className="mt-2"><a href="/contact" className="hover:text-green-500">Contact Us</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="mt-2">G6C9V+2XV, Jl. Sidodadi, Sidodadi, Kabupaten Pesawaran, Lampung 35451</p>
          <p className="mt-2">+62 857-0965-0254</p>
          <p className="mt-2">
            <a href="mailto:mangrovecukunyiny@gmail.com" className="hover:text-green-500">mangrovecukunyiny@gmail.com</a>
          </p>
          <p className="mt-2">
            <a href="https://instagram.com/cukunyiny" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">@cukunyiny</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
