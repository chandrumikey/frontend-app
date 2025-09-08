import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Email validation regex (basic format check)
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate fields
    if (!name || !email || !hashedPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    try {
      const newUser = { name, email, hashed_password: hashedPassword };

      // Send user data to the backend
      const response = await axios.post("http://127.0.0.1:8000/users/create/", newUser);
      
      setSuccessMessage("User created successfully!");
      console.log(response.data); // Optionally log response

      // Clear form fields
      setName("");
      setEmail("");
      setHashedPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("Error creating user. Please try again.");
    }
  };

  return (
    <div className="user-form">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="hashedPassword">Hashed Password:</label>
          <input
            type="password"
            id="hashedPassword"
            value={hashedPassword}
            onChange={(e) => setHashedPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;
