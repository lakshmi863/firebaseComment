import './App.css';
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./firebase"; // Ensure this imports your Firestore instance correctly
import emailjs from 'emailjs-com';

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(""); // For error handling
  const [success, setSuccess] = useState(""); // For success messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new comment object
    const newComment = {
      name,
      email,
      address,
      comment,
    };

    try {
      // Add the new comment to the "comments" collection
      await addDoc(collection(firestore, "comments"), newComment);
      setSuccess("Comment submitted successfully!");
      setError(""); // Clear any previous errors

      // Send email using EmailJS
      const templateParams = {
        name: name,
        email: email,
        address: address,
        comment: comment,
      };

      // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_USER_ID' with your actual IDs
      await emailjs.send('service_yepqakh', 'template_lo3b4l3', templateParams, 'KbZT1l1ni_ImyzFhz');

      // Clear the form fields
      setName("");
      setEmail("");
      setAddress("");
      setComment("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000);
      
    } catch (err) {
      console.error("Error adding document or sending email: ", err);
      setError("Failed to submit comment. Please try again.");
      setSuccess(""); // Clear any previous success messages
    }
  };

  return (
    <div className="commentPage">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Production Comment</legend>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default App;
