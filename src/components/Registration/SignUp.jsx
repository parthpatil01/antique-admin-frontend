
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios'; 
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import logo from '../../assets/logo.png';

function SignUp() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Send request to backend to send OTP
      await axios.post('http://localhost:5000/api/users/send-otp', { email });
      alert('OTP sent successfully');
      navigate('/email-otp', { state: { firstName, lastName, email, password } });
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert('Failed to send OTP');
    }
  


  };


  return (

    <MDBContainer className="mt-5 gradient-form">
      <MDBRow className='justify-content-center'>
        <MDBCol lg='4' md='6' sm='6' style={{ borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', background: '#f9f5eb' }}>
          <div className="d-flex flex-column px-3">

            <div className="text-center">
              <img src={logo} className='mt-3' style={{ width: '100px',height:'100px' }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">Join The Antique Team</h4>
            </div>

            <form onSubmit={handleSignUp}>
              <MDBInput wrapperClass='mb-4' placeholder='First Name' id='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Last Name' id='lastname' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Email Address or phone number' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Confirm Password' id='gender' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

              <div className="text-center mb-4">
                <button className="mb-4 btn" style={{ width: '70%', fontWeight: 'bold', height: '40px', paddingBottom: '6px',color:'brown',backgroundColor:'burlywood' }} >Sign Up</button>
              </div>
            </form>

          </div>
        </MDBCol>

        <MDBCol lg='4' md='6' sm='6'style={{ borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem', background: 'url("https://wallpapers.com/images/high/gautam-buddha-vintage-statue-fze8afr11o6ttj43.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="d-flex flex-column justify-content-center h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">Join our community and start exploring!</p>
            </div>
          </div>
        </MDBCol>

      </MDBRow>
    </MDBContainer>


  );
}

export default SignUp;