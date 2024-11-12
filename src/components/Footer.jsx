const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold">Ekowisata Cuku Nyi Nyi</h3>
          <a className="text-white" href="https://www.ecowisatacukunyinyi.com/">Website Utama<br></br>https://www.ecowisatacukunyinyi.com/</a>
        </div>
        <div>
          <h1 className="text-lg font-bold">Menu</h1>
          <div className="flex flex-col">
            <a href="/">Daftar Wisata</a>
            <a href="/scan">Kenali Mangrove</a>
          </div>
        </div>
        <div className="w-4/12">
          <h3 className="text-lg font-bold">Kontak Kami</h3>
          <p className="mt-2">G6C9V+2XV, Jl. Sidodadi, Sidodadi, Kabupaten Pesawaran, Lampung 35451</p>
          <p className="mt-2">+62 857-0965-0254</p>
          <p className="mt-2">
            <a href="mailto:mangrovecukunyiny@gmail.com" className="hover:text-green-500">mangrovecukunyiny@gmail.com</a>
          </p>
          <p className="mt-2">
            <a href="https://instagram.com/cukunyinyi" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">@cukunyinyi</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
