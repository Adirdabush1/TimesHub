// Payment.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // כאן תוכל לבצע קריאת API לתשלום או לחבר את מערכת התשלום שלך (כמו Stripe)
    // לדוגמה: תשלח את הנתונים לשרת שלך כדי לעבד את התשלום

    // לדוגמה כאן אנחנו רק מעבירים לדף אישור אם התשלום הצליח
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment successful!");
      navigate("/TankYou"); // לאחר תשלום מוצלח, מפנים לעמוד תודה
    }, 2000);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            placeholder="1234 5678 9876 5432"
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            placeholder="MM/YY"
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            placeholder="123"
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          style={{
            padding: "0.7rem 1.5rem",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: isProcessing ? "not-allowed" : "pointer",
          }}
        >
          {isProcessing ? "Processing..." : "Submit Payment"}
        </button>
      </form>
    </div>
  );
};

export default Payment;
