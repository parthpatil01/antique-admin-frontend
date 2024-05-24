import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PhoneVerify.css';

export default function Component() {
  return (
    <div className="mt-5">
      <div className="card" >
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-start">Add Phone Number</h5>
          <p className="card-text text-start text-muted">Add your phone number </p>
          <input type="text" className="input-style" placeholder="+91 784XXXX454 "></input>
          <button className="mt-2 btn btn-primary">Send OTP</button>
        </div>
      </div>
      <div className="card" >

        <div className="card-body">
          <h5 className="card-title text-start ">Verify Phone Number</h5>
          <p className="card-text text-start text-muted">Enter the code you received via SMS </p>

          <div className="row-12 p-2 otp-field">

            <input type="text" placeholder="-" className=" col-2 text-center" maxLength={1}></input>
            <input type="text" placeholder="-" className=" col-2 text-center" maxLength={1}></input>
            <input type="text" placeholder="-" className=" col-2 text-center" maxLength={1}></input>
            <input type="text" placeholder="-" className=" col-2 text-center" maxLength={1}></input>
            <button className="col-4 btn btn-primary">Verify</button>

          </div>

          <p className="card-text text-start text-muted otp" >Resend otp </p>

        </div>
      </div>
    </div>
  );
}
