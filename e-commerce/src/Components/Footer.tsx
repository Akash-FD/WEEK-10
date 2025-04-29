const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Shop</h3>
              <p className="text-gray-400">© 2024 All rights reserved</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-400 transition">About</a>
              <a href="#" className="hover:text-gray-400 transition">Contact</a>
              <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;