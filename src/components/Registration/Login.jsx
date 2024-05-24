import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send the plaintext password to the server
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      console.log(response.data);
      alert('Login successful!');
      // Reset form fields after successful login
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow className='justify-content-center'>
        <MDBCol lg='4' md='6' sm='6' className="mb-5" style={{ borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', background: '#f9f5eb' }}>
          <div className="d-flex flex-column px-3">

            <div className="text-center">
              <img src={logo}
                style={{height: '100px'}} className='mt-3' alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">We are The Antique Team</h4>
            </div>

            <p>Please login to your account</p>

            <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

            <div className="text-center pt-1 mb-3 pb-1">
            <button className="btn" onClick={handleSubmit} style={{ width: '70%', fontWeight: 'bold', height: '40px',color:'brown',backgroundColor:'burlywood' }} >Log In</button>
            <div className="text-center pt-1 mb-5 pb-1">

            <Link className="text-muted" to="#">Forgot password?</Link>
            </div>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className='pt-3'>Don't have an account?</p>
              
              <Link to="/sign-up" className=" btn ms-3" style={{width: '30%',fontWeight:'bold',fontSize:'0.8rem',color:'brown' }}>Sign Up</Link>
              
            </div>

          </div>
        </MDBCol>

        <MDBCol lg='4' md='6' sm='6' className="mb-5" style={{ borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem',  background: 'url("https://wallpapers.com/images/high/gautam-buddha-vintage-statue-fze8afr11o6ttj43.webp")', backgroundSize: 'cover',backgroundPosition: 'center' }}>
          <div className="d-flex flex-column justify-content-center h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">Welcome to Antique Treasures, where history meets elegance! Our e-commerce platform offers a curated collection of rare and exquisite antiques, each with its own story to tell. From vintage furniture to ancient artifacts, Antique Treasures is your gateway to the past.
              </p>
            </div>
          </div>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}

export default Login;