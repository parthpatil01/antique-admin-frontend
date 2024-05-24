import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './forgotPassword.css';
import axios from 'axios';
export default function ForgotPassword() {

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send request to backend to initiate password reset using Axios
      const response = await axios.post('http://localhost:5000/api/users/reset-password', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        // Display success message to the user
        alert('Password reset link sent to your email!');
      } else {
        // Handle error response
        alert(response.data.message || 'Something went wrong!');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    }
  };


  return (
    <Card className="w-full max-w-md mx-auto my-5 p-6 bg-white">
      <form onSubmit={handleSubmit}>
      <Card.Body className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <KeyIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
        </div>
        <Card.Title className="text-3xl font-bold">Forgot Password</Card.Title>
        <Card.Text>Enter your email below to reset your password securely.</Card.Text>
      </Card.Body>
      <Card.Body className="space-y-4">
        <div className="space-y-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:ring-gray-300"
            id="email"
            placeholder="your.email@example.com"
            required
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <button
          className="w-full mt-3 bg-burlywood font-semibold py-2 rounded-md transition duration-300"
          type="submit"
        >Reset Password
        </button>
      </Card.Body>
      </form>
      <Card.Footer className="flex justify-center">
        <Link className="text-sm text-brown hover:underline" to="#">
          Back to Login
        </Link>
      </Card.Footer>
    </Card>
  );
}

function KeyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}
