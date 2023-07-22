import React, { useState } from "react";
import Header from "../Layout/Header";
import BrandName from "../Layout/BrandName";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isValidPhoneNumber = (input) => {
    return input.trim().length === 10 && !isNaN(input.trim());
  };
  
  const isValidEmail = (input) => {
    return input.indexOf("@") !== -1;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidPhoneNumber(phone)) {
        alert("Please enter a valid phone number with at least 10 digits.");
        return;
      }
    
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

    const data = {
      name: name,
      email: email,
      phone: phone,
    };

    try {
      const response = await fetch(
        "https://e-commerce-contact-us-auth-default-rtdb.firebaseio.com/contact.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Data successfully stored in Firebase:", responseData);
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error while storing data in Firebase:", error);
    }
  };

  return (
    <div>
      <Header />
      <BrandName />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="phone">Phone Number:</label>
          <input
            type="number"
            id="phone"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
