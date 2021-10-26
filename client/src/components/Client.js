import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import validator from "validator";
import axios from 'axios';
import webinarImage from '../images/webinar.jpg'

function Client() {
  const param = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reqGone, setReqGone] = useState(false);
  const [webinarDate,setwebinarDate]=useState("26th October 2021");
  const [webinarTime,setwebinarTime]=useState("18:00");
  const [batchDetails,setBatchDetails]=useState("FJP");
  const [link, setLink] = useState(null);
  console.log(param);

    const getWebinarDetails=async()=>{
        try{
            const res=await axios.get('http://192.168.1.160/getWebinarDetails');
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
              <h1>{webinarDate}</h1>
              <h2>{webinarTime}</h2>
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
              src={webinarImage}
              alt=" description"
            />
          </figure>
          <h1>{batchDetails}</h1>
        </div>
      </li>
    </div>
  );
}

export default Client;
