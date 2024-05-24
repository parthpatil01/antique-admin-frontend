import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { hash } from 'bcryptjs';


export default function ResetPassword() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Add validation for password and confirm password match
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const hashedPassword = await hash(password, 10); 
            const response = await axios.post('http://localhost:5000/api/users/reset-password/confirm', {
                token,
                newPassword: hashedPassword
            });

            if (response.status === 200) {
                // Password reset successful, redirect or show success message
                alert("Password reset succesful");
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setErrorMessage('Something went wrong. Please try again later.');
        }
    };


    return(<div className="mt-4 grid gap-4 md:grid-cols-2">
    
    <Card>
    <Card.Header>
      <Card.Title>Change password</Card.Title>
      <Card.Text>Update your password</Card.Text>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleResetPassword}>
        <div className="grid gap-4">
          <div>
            <Form.Label htmlFor="current">Current password</Form.Label>
            <Form.Control id="current" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <Form.Label htmlFor="new">New password</Form.Label>
            <Form.Control id="new" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
        <Button type="submit" className="ml-auto mt-2">Confirm</Button>
      </Form>
    </Card.Body>
  </Card>
    </div>);


}