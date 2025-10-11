import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosInstance.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TicketView = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const ticketRef = useRef();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await API.get(`/booking/${id}`);
        setTicket(res.data);
      } catch (err) {
        console.error("Failed to load ticket:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  // 🖨️ Print ticket
  const handlePrint = () => {
    window.print();
  };

  // 💾 Download ticket as PDF
  const handleDownload = async () => {
    const element = ticketRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Ticket_${ticket?.bus?.name || "Bus"}.pdf`);
  };

  if (loading) return <p className="text-center mt-5">Loading ticket...</p>;
  if (!ticket) return <p className="text-center text-danger mt-5">Ticket not found.</p>;

  return (
    <div
      className="container mt-5 pt-4 d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", backgroundColor: "#D0EFFF" }}
    >
      <div
        ref={ticketRef}
        className="ticket-card shadow-lg p-4"
        style={{
          maxWidth: "600px",
          background: "#FFFFFF",
          borderRadius: "15px",
          border: "3px solid #0A3D62",
          color: "#0A3D62",
        }}
      >
        <div
          className="ticket-header d-flex justify-content-between align-items-center mb-3"
          style={{ borderBottom: "2px dashed #0A3D62", paddingBottom: "10px" }}
        >
          <h4 className="fw-bold">🎫 Ticket Details</h4>
          <h5 className="text-primary">🚌 {ticket.bus?.name}</h5>
        </div>

        <div className="ticket-details" style={{ lineHeight: "1.8" }}>
          <p><strong>From:</strong> <span>{ticket.bus?.source}</span></p>
          <p><strong>To:</strong> <span>{ticket.bus?.destination}</span></p>
          <p><strong>Date:</strong> <span>📅 {ticket.date}</span></p>
          <p><strong>Seat No:</strong> <span>💺 {ticket.seats}</span></p>
          <p><strong>Fare:</strong> <span>💰 ₹{ticket.bus?.price}</span></p>
          <p><strong>Booking ID:</strong> <span>{ticket._id}</span></p>
        </div>
      </div>
      <div className="text-center mt-4">
          <button
            className="btn btn-primary me-3"
            onClick={handlePrint}
            style={{ borderRadius: "10px" }}
          >
            🖨️ Print
          </button>
          <button
            className="btn btn-success"
            onClick={handleDownload}
            style={{ borderRadius: "10px" }}
          >
            💾 Download PDF
          </button>
        </div>
    </div>
  );
};

export default TicketView;