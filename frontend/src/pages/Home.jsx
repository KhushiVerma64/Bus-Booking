import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page home-container text-center text-light d-flex flex-column justify-content-center align-items-center">
      <div className="container">
        <h1 className="display-4 fw-bold">Welcome to Yatra Setu</h1>
        <p className="lead">Book your bus tickets easily and quickly 🚍</p>

        {/* <div className="d-flex justify-content-center gap-3 mt-3">
          <a href="/search" className="btn btn-success btn-lg">Search Buses</a>
          <a href="/register" className="btn btn-danger btn-lg">Create Account</a>
        </div> */}

         <div className="d-flex justify-content-center gap-3 mt-3">
          <Link to="/search" className="btn btn-success btn-lg">Search Buses</Link>
          <Link to="/register" className="btn btn-danger btn-lg">Create Account</Link>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">✅ Easy Booking</h5>
                <p className="card-text">Search and book your bus tickets in just a few clicks.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">🕒 Real-Time Availability</h5>
                <p className="card-text">Check seat availability and timings instantly.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">💳 Secure Payments</h5>
                <p className="card-text">Pay online safely with multiple payment options.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Home;
