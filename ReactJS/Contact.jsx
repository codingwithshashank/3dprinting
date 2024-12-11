import React from "react";


const ContactPage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us at the following address or give us a call.</p>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>Contact Details:</h3>
        <p><strong>Address:</strong> Goverdhan Colony, Morar, Gwalior, Madhya Pradesh 474004</p>
        <p><strong>Phone:</strong> +91 4444546666</p>
        <p><strong>Email:</strong> shashank@gmail.com</p>
      </div>

      <div>
        <h3>Our Location:</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7157.212592453012!2d78.20770403922576!3d26.24197908131417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c136e8c94e13%3A0x501fb1b3cb14cdd9!2sGoverdhan%20Colony%2C%20Morar%2C%20Gwalior%2C%20Madhya%20Pradesh%20474004!5e0!3m2!1sen!2sin!4v1733895544403!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
