import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} required />
        <label>Message</label>
        <textarea name="message" onChange={handleChange} required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
