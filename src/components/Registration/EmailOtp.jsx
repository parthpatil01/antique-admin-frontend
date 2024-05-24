import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { hash } from 'bcryptjs';


function EmailOtp() {

  const location = useLocation();
  const { firstName, lastName, email, password } = location.state;
    // Define state for OTP and verification status
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();  

  //final register 
   async function  registerTheData()  {

    try {
     
        // Hash the password before sending it to the server
        const hashedPassword = await hash(password, 10); // Hash the password with a salt of 10 rounds
  
        // Send the hashed password to the server along with other user details
        const response = await axios.post('http://localhost:5000/api/users/register', {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
        if(response.status===200){
          navigate('/log-in',{ replace: true });
        }
        
      } catch (error) {
        console.error(error);
        alert('Registration failed. Please try again.');
      }
  
  }
  
  const handleVerifyOTP = async () => {
    try {
      // Send request to backend to verify OTP
      const res = await axios.post('http://localhost:5000/api/users/verify-otp', { email, otp });
      
      if(res.status===200){
        alert('OTP verified successfully');
        registerTheData();
      }
      
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      alert('Invalid OTP');
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto my-5">
      <Card.Header>
        <Card.Title className="text-2xl text-center mb-3">Email Verification</Card.Title>
        <Card.Text className="text-center">Please enter the verification code we sent to your email address.</Card.Text>
      </Card.Header>
      <Card.Body>
        <Form>
          <div className="mb-3">
            <Form.Label htmlFor="code" className="mb-1">Verification Code</Form.Label>
            <Form.Control id="code" type="text" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)}/>
          </div>
          <div className="text-center">
            <Button className="w-full " onClick={handleVerifyOTP}>Verify Email</Button>
            <Button className="w-full" variant="outline">Resend Code</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EmailOtp;