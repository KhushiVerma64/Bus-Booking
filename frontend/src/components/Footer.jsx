const Footer = () => {
  return (
    <footer className="footer bg-dark text-light text-center py-3 mt-5 ">
      <div className="container ">
        <p className="mb-1">© {new Date().getFullYear()} BusBooking. All rights reserved.</p>
        <div>
          <a href="#" className="text-light mx-2">Privacy Policy</a>
          <a href="#" className="text-light mx-2">Terms</a>
          <a href="#" className="text-light mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
