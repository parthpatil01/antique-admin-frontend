import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import GetProduct from '../GetProduct/GetProduct.jsx';
import DeleteProduct from '../DeleteProduct/DeleteProduct.jsx';
import UpdateProduct from '../UpdatePage/Updatepage.jsx';
import InsertProduct from '../InsertPage/Insertpage.jsx';
import SignUp from "../Registration/SignUp.jsx";
import Login from "../Registration/Login.jsx";
import ForgotPassword from "../Registration/ForgotPassword.jsx";
import ResetPassword from "../Registration/ResetPassword.jsx";
import EmailOtp from "../Registration/EmailOtp.jsx";
import ProfilePage from '../ProfilePage/ProfilePage.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Home() {

  return (
    <Router>
      <div className="d-flex flex-column align-items-center" style={{ minHeight: "100vh", }}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/get-product" element={<GetProduct/>}/>
          <Route path="/delete-product" element={<DeleteProduct/>}/>
          <Route path="/update-product" element={<UpdateProduct/>}/>
          <Route path="/add-product" element={<InsertProduct/>}/>
          <Route path="email-otp" element={<EmailOtp/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default Home;
