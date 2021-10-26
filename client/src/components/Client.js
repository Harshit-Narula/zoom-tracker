import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import validator from "validator";
import axios from 'axios';

function Client() {
  const param = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reqGone, setReqGone] = useState(false);
  const [webinarDate,setwebinarDate]=useState();
  const [webinarTime,setwebinarTime]=useState();
  const [batchDetails,setBatchDetails]=useState();
  const [link, setLink] = useState(null);
  console.log(param);

    const getWebinarDetails=async()=>{
        try{
            const res=await axios.get('/getWebinarDetails');
            console.log(res);
            setwebinarDate(res.date);
            setwebinarTime(res.time);
            setBatchDetails(res.batchDetails);
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getWebinarDetails();
    },[]);




  const handleClick = () => {
    //request for count ++
    //set link
    let isPhone = validatePhoneNumber(phone);
    let isEmail = validateEmail(email);
    
    if (isPhone && isEmail) {
    //get the salesperson from db using uuid from params
    //count++ kro
    
    setReqGone(true);
    setLink("ononoivn");
    }
    else{
        alert("Please enter valid email or/and phone")
    }
  };

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };

  const validateEmail = (email) => {
    const isValidEmail = validator.isEmail(email);
    return isValidEmail;
  };

  return (
    <div>
      <li class="card" id="card_1">
        <div class="card__content">
          <div>
              <h1>26th October 2021</h1>
              <h2>18:00</h2>
            <h3>Enter your Details</h3>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              value={phone}
              placeholder="Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              disabled={name === "" || email === "" || phone === ""}
              onClick={handleClick}
            >
              Submit
            </button>
            {link && (
        <a href="https://www.google.com" target="_blank">
          <button type="button" class="btn btn-primary">
            Join Zoom Meeting
          </button>
        </a>
      )}
          </div>
          <figure>
            <img
              src="https://codyhouse.co/demo-tutorials/stacking-cards/assets/img/img-1.jpg"
              alt=" description"
            />
          </figure>
        </div>
      </li>
    </div>
  );
}

export default Client;
